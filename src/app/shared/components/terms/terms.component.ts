import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-terms',
    templateUrl: './terms.component.html',
    styleUrls: ['./terms.component.scss'],
    standalone: false
})
export class TermsComponent {
    constructor(private modal: NgbActiveModal) {
    }

    close() {
        this.modal.close();
    }
}
