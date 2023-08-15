import {Component, OnInit} from '@angular/core';
import {EventsService} from "../../../services/events.service";
import {Event, EventDto} from "../../../data/event";

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

    public events: EventDto[] = [];

    constructor(private eventsService: EventsService) {
    }

    ngOnInit() {
        this.eventsService.getEvents().subscribe((events: any) => {
            this.events = events;
        });
    }
}
