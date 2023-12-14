import { Component, Input, ViewChild } from '@angular/core';
import { EventsService } from '../../../shared/services/events.service';
import { EventDto } from '../../../shared/data/event';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { PlatformService } from '../../../shared/services/platform.service';

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent {

    @Input()
    event?: EventDto;

    @ViewChild('copiedLinkTooltip') copiedLinkTooltip?: NgbTooltip;

    constructor(
        private eventsService: EventsService,
        private detectorService: DeviceDetectorService,
        private platformService: PlatformService
    ) {
    }

    getImgUrl(imageUrl: string) {
        return imageUrl + '?width=1200&auto_optimize=medium';
    }

    getAddressString(input: string): string {
        input = input.replace(/\n/g, ",");

        if (this.detectorService.isDesktop()) {
            return 'https://www.google.com/maps/search/?api=1&query=' + encodeURI(input);
        }

        if (this.platformService.isIos()) {
            return 'maps://?q=' + encodeURI(input);
        }
        return 'geo://?q=' + encodeURI(input);
    }

    downloadIcs(uid: string) {
        this.eventsService.getEventIcs(this.event?.id!, uid).subscribe((data: string) => {
            const element = document.createElement('a')
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data))
            element.setAttribute('download', 'termin.ics')
            element.setAttribute('target', '_blank')
            element.style.display = 'none'
            element.click()
        });
    }

    completeUrl(url: string) {
        if (!/^https?:\/\//i.test(url)) {
            url = 'http://' + url;
        }
        return url;
    }

    shareOnFacebook() {
        const url = this.completeUrl(window.location.href);
        const text = this.event!.title!;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${encodeURIComponent(text)}`, '_blank');
    }

    shareOnWhatsapp() {
        const url = this.completeUrl(window.location.href);
        const text = this.getEventDescriptionText(url);
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }

    shareViaEmail() {
        const url = this.completeUrl(window.location.href);
        const subject = `[chalender.ch] ${this.event!.title}`;
        const body = this.getEventDescriptionText(url);
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

    private getEventDescriptionText(url: string, includeLink = true): string {
        let returnValue = `${this.event!.title}
${this.event!.location}
${this.getOccurrencesText()}`;

        if (includeLink) {
            returnValue += `
Detagls datti qua: ${url}`;
        }

        return returnValue;
    }

    private getOccurrencesText(): string {
        let returnValue = "";
        this.event?.occurrences.forEach(o => {
            let date = "";
            date += o.date + ", ";
            if (o.isAllDay) {
                date += "tuttadi";
            } else {
                date += o.start;
                if (o.end) {
                    date += " - " + o.end;
                }
            }

            if (o.isCancelled) {
                date += " (annullà)"
            }

            returnValue += date + "\n";
        });

        console.log(returnValue)
        return returnValue;
    }
}
