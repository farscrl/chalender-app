import { Component, OnInit } from '@angular/core';
import { EventsService } from "../../../services/events.service";
import { ActivatedRoute, Router } from "@angular/router";
import { EventDto } from "../../../data/event";
import { Meta } from '@angular/platform-browser';

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
        this.meta.addTag({name: 'title', content: this.truncateString(this.event!.title!, 90)});
        this.meta.updateTag({name: 'description', content: this.truncateString(this.event!.description!, 300)});

        const t = this.meta.addTag({name: 'og:title', content: this.truncateString(this.event!.title!, 90)});
        //console.log(t);
        this.meta.addTag({name: 'og:description', content: this.truncateString(this.event!.description!, 300)});
        this.meta.addTag({name: 'og:type', content: 'website'});
        this.meta.addTag({name: 'og:url', content: this.router.url});
        this.meta.addTag({name: 'twitter:card', content: 'summary_large_image'});
        this.meta.addTag({name: 'twitter:title', content: this.truncateString(this.event!.title!, 70)});
        this.meta.addTag({name: 'twitter:description', content: this.truncateString(this.event!.description!, 200)});

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

    truncateString(str: string, length: number) {
        if (str.length <= length) {
            return str;
        }
        return str.slice(0, length - 1) + '…'; // Adjust for the length of the ellipsis
    }
}
