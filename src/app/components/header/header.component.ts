import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { IframeService } from '../../services/iframe.service';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [RouterLink, TranslatePipe]
})
export class HeaderComponent implements OnInit, OnDestroy {
    public isMenuOpen = false;
    public isInIframe = false;
    public isTopNavigationVisible = false;

    private isIframeSubscription?: Subscription;
    private isShowTopNavigationSubscription?: Subscription;

    constructor(
        private offcanvasService: NgbOffcanvas,
        public authService: AuthenticationService,
        private iframeService: IframeService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.isIframeSubscription = this.iframeService.getIsIframeObservable().subscribe((value) => {
            this.isInIframe = value;
        });
        this.isShowTopNavigationSubscription = this.iframeService.getShowTopNavigationObservable().subscribe((value) => {
            this.isTopNavigationVisible = value;
        });
    }

    ngOnDestroy() {
        if (this.isIframeSubscription) {
            this.isIframeSubscription.unsubscribe();
        }
        if (this.isShowTopNavigationSubscription) {
            this.isShowTopNavigationSubscription.unsubscribe();
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

    isLinkActive(url: string): boolean {
        // hack needed, as native routerLinkActive
        const queryParamsIndex = this.router.url.indexOf('?');
        let baseUrl = queryParamsIndex === -1 ? this.router.url : this.router.url.slice(0, queryParamsIndex);
        if (baseUrl === url) {
            return true;
        }

        const lastIndex = baseUrl.lastIndexOf('/');
        const base = baseUrl.substring(0, lastIndex);
        const ending = baseUrl.substring(lastIndex + 1);

        // empty string is removed
        if (url === "/" && base === "" && ending.length === 24) {
            return true;
        }

        return (base === url && ending.length === 24);
    }
}
