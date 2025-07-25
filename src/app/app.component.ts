import { Component, Inject, OnInit, PLATFORM_ID, DOCUMENT } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute } from '@angular/router';
import { IframeService } from './services/iframe.service';
import { isPlatformBrowser } from '@angular/common';
import { EventsFilterService } from './shared/services/events-filter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Platform } from '@angular/cdk/platform';
import { DeviceDetectorService } from 'ngx-device-detector';
import {
    PwaInstallInstructionsComponent
} from './components/pwa-install-instructions/pwa-install-instructions.component';
import { NavigationService } from './services/navigation.service';
import { HeaderComponent } from './components/header/header.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AppRouterOutletDirective } from './routing/app-router-outlet.directive';
import { FooterComponent } from './components/footer/footer.component';
import { TrackingRtrComponent } from './components/tracking-rtr/tracking-rtr.component';

const LOCALSTORAGE_APP_OPEN_TIMES = 'chalender-app-open-times';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [HeaderComponent, MessagesComponent, AppRouterOutletDirective, FooterComponent, TrackingRtrComponent]
})
export class AppComponent implements OnInit {

    private promptEvent: any;

    constructor(
        private translate: TranslateService,
        private route: ActivatedRoute,
        private iframeService: IframeService,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: any,
        private eventsFilterService: EventsFilterService,
        private platform: Platform,
        private detectorService: DeviceDetectorService,
        private modalService: NgbModal,
        private navigationService: NavigationService,
    ) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('rm');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('rm');

        // instantiate navigation service
        navigationService.init();
    }

    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                if (params['iframe'] === 'true') {
                    this.iframeService.setIsIframe();
                    this.document.body.classList.add('iframe');

                    if (params['showSearch'] === 'false') {
                        this.iframeService.disableSearch();
                    }
                    if (params['showViewSelection'] === 'false') {
                        this.iframeService.disableViewSelection();
                    }
                    if (params['showAddButton'] === 'true') {
                        this.iframeService.enableAddButton();
                    }
                    if (params['showTopNavigation'] === 'true') {
                        this.iframeService.enableTopNavigation();
                    }
                }

                if (params['view'] === 'cards') {
                    this.eventsFilterService.setSelectedView('cards')
                } else if (params['view'] === 'list') {
                    this.eventsFilterService.setSelectedView('list')
                }
            });

        if (isPlatformBrowser(this.platformId)) {
            this.handlePwaNotificationStuff();
        }
    }


    private handlePwaNotificationStuff(): void {
        // do not show the notification on desktop
        if (this.detectorService.isDesktop()) {
            return;
        }

        // only show notification the third time the app is opened
        if (!this.checkIfThirdTimeAppOpened()) {
            return;
        }

        if (this.platform.ANDROID) {
            if (this.platform.FIREFOX) {
                const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
                if (!isInStandaloneMode) {
                    this.openPwaWindow('instructions_android_firefox');
                }
            } else {
                window.addEventListener('beforeinstallprompt', (event: any) => {
                    event.preventDefault();
                    this.promptEvent = event;
                    this.openPwaWindow('direct');
                });
            }
        }

        if (this.platform.IOS) {
            const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
            if (!isInStandaloneMode) {
                this.openPwaWindow('instructions_ios');
            }
        }
    }

    private openPwaWindow(type: 'instructions_ios' | 'instructions_android_firefox' | 'direct') {
        const that = this;

        window.setTimeout(function () {
            const modalRef = that.modalService.open(PwaInstallInstructionsComponent, {size: 'xl', centered: true});
            modalRef.componentInstance.type = type;
            modalRef.closed.subscribe((value) => {
                if (value === 'install') {
                    that.promptEvent.prompt();
                }
            });
        }, 10000);
    }

    private checkIfThirdTimeAppOpened(): boolean {
        try {
            if (window.localStorage) {
                let appOpenTimes = +(localStorage.getItem(LOCALSTORAGE_APP_OPEN_TIMES) || 0);
                appOpenTimes++;
                localStorage.setItem(LOCALSTORAGE_APP_OPEN_TIMES, appOpenTimes + '');
                return appOpenTimes == 3;
            }
        } catch (e) {
        }
        return false;
    }
}
