import { Component, Input } from '@angular/core';
import { EventsService } from '../../../shared/services/events.service';
import { EventDto } from '../../../shared/data/event';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent {

    @Input()
    event?: EventDto;

    constructor(private eventsService: EventsService, private detectorService: DeviceDetectorService) {
    }

    getImgUrl(imageUrl: string) {
        return imageUrl + '?width=1200&auto_optimize=medium';
    }

    getAddressString(input: string): string {
        input = input.replace(/\n/g, ",");

        if (this.detectorService.isDesktop()) {
            return 'https://www.google.com/maps/search/?api=1&query=' + encodeURI(input);
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
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    }

    shareOnTwitter() {
        const url = this.completeUrl(window.location.href);
        window.open(`https://twitter.com/intent/tweet?url=${url}`, '_blank');
    }

    shareOnWhatsapp() {
        const url = this.completeUrl(window.location.href);
        window.open(`https://wa.me/?text=${url}`, '_blank');
    }

    shareViaEmail() {
        const url = this.completeUrl(window.location.href);
        window.open(`mailto:?body=${url}`, '_blank');
    }

    copyLink() {
        const url = this.completeUrl(window.location.href);
        navigator.clipboard.writeText(url);
    }
}
