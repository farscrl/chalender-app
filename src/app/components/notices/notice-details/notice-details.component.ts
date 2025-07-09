import { Component, Input, ViewChild } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NoticeBoardItemDto } from '../../../shared/data/notices';

@Component({
    selector: 'app-notice-details',
    templateUrl: './notice-details.component.html',
    styleUrls: ['./notice-details.component.scss'],
    standalone: false
})
export class NoticeDetailsComponent {

    @Input()
    notice?: NoticeBoardItemDto;

    @ViewChild('copiedLinkTooltip') copiedLinkTooltip?: NgbTooltip;

    constructor() {
    }

    getImgUrl(imageUrl: string) {
        return imageUrl + '?width=1200&auto_optimize=medium';
    }

    completeUrl(url: string) {
        if (!/^https?:\/\//i.test(url)) {
            url = 'http://' + url;
        }
        return url;
    }

    shareOnFacebook() {
        const url = this.completeUrl(window.location.href);
        const text = this.notice!.title!;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${encodeURIComponent(text)}`, '_blank');
    }

    shareOnWhatsapp() {
        const url = this.completeUrl(window.location.href);
        const text = this.getDescriptionText(url);
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }

    shareViaEmail() {
        const url = this.completeUrl(window.location.href);
        const subject = `[chalender.ch] ${this.notice!.title}`;
        const body = this.getDescriptionText(url);
        console.log(body)
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank");
    }

    copyLink() {
        const url = this.completeUrl(window.location.href);
        navigator.clipboard.writeText(url);
        if (this.copiedLinkTooltip) {
            this.copiedLinkTooltip.open();

            setTimeout(() => {
                this.copiedLinkTooltip?.close();
            }, 3000);
        }
    }

    private getDescriptionText(url: string, includeLink = true): string {
        let returnValue = `${this.notice!.title}`;

        if (includeLink) {
            returnValue += `
Detagls datti qua: ${url}`;
        }

        return returnValue;
    }
}
