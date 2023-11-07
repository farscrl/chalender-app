import {Component, Input} from '@angular/core';
import {EventStatusTypes} from "../../data/event";

@Component({
    selector: 'app-status-badge',
    templateUrl: './status-badge.component.html',
    styleUrls: ['./status-badge.component.scss']
})
export class StatusBadgeComponent {

    @Input()
    status: EventStatusTypes = 'INVALID';
}
