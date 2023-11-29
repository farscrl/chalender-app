import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute } from '@angular/router';
import { IframeService } from './services/iframe.service';
import { DOCUMENT } from '@angular/common';

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
        @Inject(DOCUMENT) private document: Document
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
                }
                if (params['showSearch'] === 'false') {
                    this.iframeService.disableSearch();
                }
            });
    }
}
