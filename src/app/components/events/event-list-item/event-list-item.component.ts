import { Component, Input } from '@angular/core';
import { EventLookup } from '../../../shared/data/event';

@Component({
    selector: 'app-event-list-item',
    templateUrl: './event-list-item.component.html',
    styleUrls: ['./event-list-item.component.scss']
})
export class EventListItemComponent {
    @Input()
    public event?: EventLookup;

    @Input()
    public isFirst = false;
}
