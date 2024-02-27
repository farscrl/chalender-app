import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Meta } from '@angular/platform-browser';
import { EventDto } from '../../../shared/data/event';
import { EventsService } from '../../../shared/services/events.service';
import { UrlUtil } from '../../../shared/utils/url.util';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import * as dayjs from 'dayjs';

@Component({
    selector: 'app-events-details',
    templateUrl: './events-details.component.html',
    styleUrls: ['./events-details.component.scss']
})
export class EventsDetailsComponent implements OnInit {

    public event?: EventDto;

    public allOccurrencesCancelled = false;

    private eventId?: string;

    constructor(
        private eventsService: EventsService,
        private route: ActivatedRoute,
        private meta: Meta,
        private router: Router,
        private urlUtil: UrlUtil,
        private renderer2: Renderer2,
        @Inject(DOCUMENT) private _document: Document,
        @Inject(PLATFORM_ID) private platformId: any,
    ) {
        this.route.params.subscribe(params => {
            this.eventId = params['id'];
        });
    }

    ngOnInit() {
        if (!this.eventId) {
            return;
        }

        this.eventsService.getEvent(this.eventId).subscribe((event: EventDto) => {
            this.event = event;

            this.allOccurrencesCancelled = event.occurrences.filter(o => o.isCancelled).length === event.occurrences.length;
            if (this.event) {
                if (isPlatformServer(this.platformId)) {
                    this.setMetaTags();
                }
            }
        });

    }

    private setMetaTags() {
        this.meta.addTag({name: 'title', content: this.urlUtil.truncateString(this.event!.title!, 90)});
        this.meta.updateTag({name: 'description', content: this.urlUtil.truncateString(this.event!.description!, 300)});

        const t = this.meta.addTag({name: 'og:title', content: this.urlUtil.truncateString(this.event!.title!, 90)});
        //console.log(t);
        this.meta.addTag({name: 'og:description', content: this.urlUtil.truncateString(this.event!.description!, 300)});
        this.meta.addTag({name: 'og:type', content: 'website'});
        this.meta.addTag({name: 'og:url', content: this.router.url});
        this.meta.addTag({name: 'twitter:card', content: 'summary_large_image'});
        this.meta.addTag({name: 'twitter:title', content: this.urlUtil.truncateString(this.event!.title!, 70)});
        this.meta.addTag({
            name: 'twitter:description',
            content: this.urlUtil.truncateString(this.event!.description!, 200)
        });

        if (this.event!.images?.length > 0) {
            this.meta.addTag({
                name: 'og:image',
                content: this.event!.images[0]!.url + '?width=1200&height=630&crop_gravity=center&auto_optimize=medium'
            });
            this.meta.addTag({
                name: 'twitter:image',
                content: this.event!.images[0]!.url + '?width=1200&height=630&crop_gravity=center&auto_optimize=medium'
            });
        }

        this.addStructuredData();
    }

    private addStructuredData() {
        const onlineOffline = this.event?.onlineOnly ? 'https://schema.org/OnlineEventAttendanceMode' : 'https://schema.org/OfflineEventAttendanceMode';
        const cancelled = this.allOccurrencesCancelled ? 'https://schema.org/EventCancelled' : 'https://schema.org/EventScheduled';
        const images = this.event?.images.map(i => this.escapeJsonString(i.url));

        const firstOccurrence = this.event?.occurrences[0]!;

        const date = dayjs(firstOccurrence.date, 'DD-MM-YYYY');
        let startString = '';
        if (firstOccurrence.isAllDay) {
            startString = date.format('YYYY-MM-DD');
        } else {
            const startTime = dayjs(firstOccurrence.date + ' ' + firstOccurrence.start, 'DD-MM-YYYY HH:mm');
            startString = startTime.format('YYYY-MM-DDTHH:mm');
        }
        let endString = '';
        if (firstOccurrence.end) {
            endString = dayjs(firstOccurrence.date + ' ' + firstOccurrence.end, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DDTHH:mm');
        }

        let script = this.renderer2.createElement('script');
        script.type = `application/ld+json`;
        script.text = `
    {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "${this.escapeJsonString(this.event?.title)}",
      "startDate": "${startString}",
      "endDate": "${endString}",
      "eventAttendanceMode": "${onlineOffline}",
      "eventStatus": "${cancelled}",
      "location": {
        "@type": "Place",
        "name": "${this.escapeJsonString(this.event?.location)}",
        "address": {
          "@type": "PostalAddress",
          "name": "${this.escapeJsonString(this.event?.address)}"
        }
      },
      "image": ${JSON.stringify(images)},
      "description": "${this.escapeJsonString(this.event?.description)}",
      "organizer": {
        "@type": "Organization",
        "name": "${this.escapeJsonString(this.event?.organiser)}",
        "url": "${this.escapeJsonString(this.event?.link)}"
      }
    }
        `;

        this.renderer2.appendChild(this._document.head, script);
    }

    private escapeJsonString(value?: string): string {
        if (!value) {
            return "";
        }
        return value
            .replace(/\\/g, '\\\\') // Escape backslashes
            .replace(/"/g, '\\"') // Escape double quotes
            .replace(/\n/g, ', ') // Escape newlines
            .replace(/\r/g, '') // Escape carriage returns
            .replace(/\t/g, ''); // Escape tabs
    }
}
