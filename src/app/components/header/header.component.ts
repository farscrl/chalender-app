import { Component, TemplateRef } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    public isMenuOpen = false;

    constructor(
        private offcanvasService: NgbOffcanvas,
        public authService: AuthenticationService,
    ) {
    }

    toggleMenu(content: TemplateRef<any>): void {
        this.isMenuOpen = !this.isMenuOpen;

        if (this.isMenuOpen) {
            const offCanvas = this.offcanvasService.open(content, {
                position: 'top',
                panelClass: 'menu-panel',
            });
            offCanvas.dismissed.subscribe(() => {
                this.isMenuOpen = false;
            });
        } else {
            this.offcanvasService.dismiss();
        }
    }
}
