import {Component, Input} from '@angular/core';
import {EventVersion} from "../../../data/event";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

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
