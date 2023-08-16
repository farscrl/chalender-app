import {Component, Input} from '@angular/core';
import {Event, EventLookup} from "../../../data/event";

@Component({
    selector: 'app-event-card',
    templateUrl: './event-card.component.html',
    styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {

    @Input()
    public event?: EventLookup;

}
