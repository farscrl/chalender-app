import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-event-filter-modal',
    templateUrl: './event-filter-modal.component.html',
    styleUrls: ['./event-filter-modal.component.scss']
})
export class EventFilterModalComponent {

    @Input()
    public type: 'events' | 'notices' = 'events';

    constructor(public activeModal: NgbActiveModal) {
    }
}
