import { Component } from '@angular/core';
import { EventsService } from "../../../services/events.service";
import { ActivatedRoute } from "@angular/router";
import { EventDto } from "../../../data/event";

@Component({
    selector: 'app-events-details',
    templateUrl: './events-details.component.html',
    styleUrls: ['./events-details.component.scss']
})
export class EventsDetailsComponent {

    public event?: EventDto;

    constructor(private eventsService: EventsService, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.eventsService.getEvent(params['id']).subscribe((event: EventDto) => {
                this.event = event;
            });
        });
    }
}
