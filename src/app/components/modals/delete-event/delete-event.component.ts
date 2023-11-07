import { Component, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EventVersion } from '../../../shared/data/event';

@Component({
    selector: 'app-delete-event',
    templateUrl: './delete-event.component.html',
    styleUrls: ['./delete-event.component.scss']
})
export class DeleteEventComponent {
    @Input() event: EventVersion | undefined;

    constructor(public activeModal: NgbActiveModal) {
    }
}
