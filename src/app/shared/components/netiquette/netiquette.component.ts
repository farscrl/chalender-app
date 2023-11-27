import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-netiquette',
    templateUrl: './netiquette.component.html',
    styleUrls: ['./netiquette.component.scss']
})
export class NetiquetteComponent {
    constructor(private modal: NgbActiveModal) {
    }

    close() {
        this.modal.close();
    }
}
