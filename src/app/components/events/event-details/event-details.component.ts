import { Component, Input } from '@angular/core';
import { EventDto } from '../../../data/event';

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent {

    @Input()
    event?: EventDto;

}
