import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-event-filter-modal',
    templateUrl: './event-filter-modal.component.html',
    styleUrls: ['./event-filter-modal.component.scss']
})
export class EventFilterModalComponent {
    constructor(public activeModal: NgbActiveModal) {
    }
}
