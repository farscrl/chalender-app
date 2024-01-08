import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Meta } from '@angular/platform-browser';
import { EventDto } from '../../../shared/data/event';
import { EventsService } from '../../../shared/services/events.service';
import { UrlUtil } from '../../../shared/utils/url.util';

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
                this.setMetaTags();
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
    }
}
