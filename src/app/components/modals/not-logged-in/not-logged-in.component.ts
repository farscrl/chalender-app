import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-not-logged-in',
    templateUrl: './not-logged-in.component.html',
    styleUrls: ['./not-logged-in.component.scss'],
    imports: [TranslatePipe]
})
export class NotLoggedInComponent {
    constructor(public activeModal: NgbActiveModal) {
    }
}
