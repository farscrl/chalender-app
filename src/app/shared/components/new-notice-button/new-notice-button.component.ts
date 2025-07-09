import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IframeService } from '../../../services/iframe.service';
import { FabPositionDirective } from '../../directives/fab-position.directive';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-new-notice-button',
    templateUrl: './new-notice-button.component.html',
    styleUrls: ['./new-notice-button.component.scss'],
    imports: [FabPositionDirective, RouterLink, TranslatePipe]
})
export class NewNoticeButtonComponent {
    @ViewChild('fab') fab?: ElementRef;
    @ViewChild('button') button?: ElementRef;

    public isInIframe = false;
    public enforceAddButton = false;

    private isIframeSubscription?: Subscription;
    private showAddButtonSubscription?: Subscription;

    constructor(
        private iframeService: IframeService,
    ) {
    }

    ngOnInit() {
        this.isIframeSubscription = this.iframeService.getIsIframeObservable().subscribe((value) => {
            this.isInIframe = value;
        });
        this.showAddButtonSubscription = this.iframeService.getShowAddButtonObservable().subscribe((value) => {
            this.enforceAddButton = value;
        });
    }

    ngOnDestroy() {
        if (this.isIframeSubscription) {
            this.isIframeSubscription.unsubscribe();
        }
        if (this.showAddButtonSubscription) {
            this.showAddButtonSubscription.unsubscribe();
        }
    }

    ngAfterViewInit(): void {
        if (this.button) {
            this.button.nativeElement.addEventListener('click', (e: any) => {
                e.preventDefault();
                if (this.fab) {
                    this.fab.nativeElement.classList.toggle('open');
                }
            });
        }
    }
}
