import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-pwa-install-instructions',
    templateUrl: './pwa-install-instructions.component.html',
    styleUrls: ['./pwa-install-instructions.component.scss']
})
export class PwaInstallInstructionsComponent implements OnInit {

    type?: 'instructions_ios' | 'instructions_android_firefox' | 'direct';

    constructor(
        private modal: NgbActiveModal,
    ) {
    }

    ngOnInit() {
        console.log('type', this.type)
    }

    close() {
        this.modal.close();
    }

    install() {
        this.modal.close('install');
    }
}
