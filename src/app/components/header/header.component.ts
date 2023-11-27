import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { IframeService } from '../../services/iframe.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    public isMenuOpen = false;
    public isInIframe = false;

    private isIframeSubscription?: Subscription;

    constructor(
        private offcanvasService: NgbOffcanvas,
        public authService: AuthenticationService,
        private iframeService: IframeService,
    ) {
    }

    ngOnInit() {
        this.isIframeSubscription = this.iframeService.getIsIframeObservable().subscribe((value) => {
            this.isInIframe = value;
        });
    }

    ngOnDestroy() {
        if (this.isIframeSubscription) {
            this.isIframeSubscription.unsubscribe();
        }
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
