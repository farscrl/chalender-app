import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventFilterComponent } from '../event-filter/event-filter.component';
import { NoticesFilterComponent } from '../../notices/notices-filter/notices-filter.component';

@Component({
    selector: 'app-event-filter-modal',
    templateUrl: './event-filter-modal.component.html',
    styleUrls: ['./event-filter-modal.component.scss'],
    imports: [EventFilterComponent, NoticesFilterComponent]
})
export class EventFilterModalComponent {

    @Input()
    public type: 'events' | 'notices' = 'events';

    constructor(public activeModal: NgbActiveModal) {
    }
}
