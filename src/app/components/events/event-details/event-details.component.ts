import { Component, Input } from '@angular/core';
import { EventDto } from '../../../data/event';
import { EventsService } from '../../../services/events.service';

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent {

    @Input()
    event?: EventDto;

    constructor(private eventsService: EventsService) {
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
}
