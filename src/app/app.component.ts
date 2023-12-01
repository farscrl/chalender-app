import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute } from '@angular/router';
import { IframeService } from './services/iframe.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { EventsFilterService } from './shared/services/events-filter.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private translate: TranslateService,
        private route: ActivatedRoute,
        private iframeService: IframeService,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: any,
        private eventsFilterService: EventsFilterService
    ) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('rm');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('rm');
    }

    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                if (params['iframe'] === 'true') {
                    this.iframeService.setIsIframe();
                    this.document.body.classList.add('iframe');
                    this.setupIframeSizeHandling();

                    if (params['showSearch'] === 'false') {
                        this.iframeService.disableSearch();
                    }
                    if (params['showViewSelection'] === 'false') {
                        this.iframeService.disableViewSelection();
                    }
                }

                if (params['view'] === 'cards') {
                    this.eventsFilterService.setSelectedView('cards')
                } else if (params['view'] === 'list') {
                    this.eventsFilterService.setSelectedView('list')
                }
            });
    }

    private setupIframeSizeHandling() {
        if (isPlatformBrowser(this.platformId)) {
            const that = this;
            const observer = new MutationObserver(function (mutationsList, observer) {
                for (let mutation of mutationsList) {
                    if (mutation.type === "childList") {
                        that.resizeParentIframe();
                        break;
                    }
                }
            });
            observer.observe(document.body, {childList: true, subtree: true});
        }
    }

    private resizeParentIframe() {
        const body = document.body;
        const html = document.documentElement;
        const height = Math.max(body.scrollHeight, body.offsetHeight, html.offsetHeight);
        const message = {
            type: 'resizeIframe',
            value: height
        };
        window.parent.postMessage(message, "*");
    }
}
