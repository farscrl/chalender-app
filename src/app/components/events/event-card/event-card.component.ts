import { Component, Input } from '@angular/core';
import { EventLookup } from "../../../data/event";

@Component({
    selector: 'app-event-card',
    templateUrl: './event-card.component.html',
    styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {

    @Input()
    public event?: EventLookup;

    @Input()
    public isFirst = false;

    get imgUrl() {
        return this.event!.imageUrl + '?width=400&aspect_ratio=1:1&crop_gravity=center&auto_optimize=medium';
    }
}
