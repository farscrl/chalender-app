import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-not-logged-in',
    templateUrl: './not-logged-in.component.html',
    styleUrls: ['./not-logged-in.component.scss'],
    standalone: false
})
export class NotLoggedInComponent {
    constructor(public activeModal: NgbActiveModal) {
    }
}
