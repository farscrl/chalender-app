import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IframeService } from '../../services/iframe.service';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    imports: [RouterLink, TranslatePipe]
})
export class FooterComponent implements OnInit, OnDestroy {

    public isInIframe = false;

    private isIframeSubscription?: Subscription;

    constructor(
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
}
