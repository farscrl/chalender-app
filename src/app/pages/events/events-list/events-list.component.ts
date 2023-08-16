import {Component, OnInit} from '@angular/core';
import {EventsService} from "../../../services/events.service";
import {EventLookup} from "../../../data/event";
import * as dayjs from 'dayjs'
import {rmLocale} from "../../../utils/day-js-locale";

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

    public events: EventLookup[] = [];
    public categorizedEvents: { date: string, formattedDate: string, events: EventLookup[] }[] = [];
    private dates: string[] = [];

    constructor(private eventsService: EventsService) {
    }

    ngOnInit() {
        const customParseFormat = require('dayjs/plugin/customParseFormat');
        dayjs.extend(customParseFormat);
        dayjs.locale('rm', rmLocale);

        this.eventsService.getEvents().subscribe((events: any) => {
            this.events = events.content;
            this.groupEvents();
        });
    }

    private groupEvents(): void {
        this.dates = [...new Set(this.events.map(event => event.date))];
        const sortedDates = this.dates.sort((a, b) => {
            const dateA = dayjs(a, "DD-MM-YYYY");
            const dateB = dayjs(b, "DD-MM-YYYY");
            if (dateA.isBefore(dateB)) {
                return -1;
            }
            if (dateA.isAfter(dateB)) {
                return 1;
            }
            return 0;
        });
        this.categorizedEvents = sortedDates.map(date => {
            const dateObj = dayjs(date, "DD-MM-YYYY");
            let formattedDate = dateObj.format('dddd[, ils ]D[ da ]MMMM YYYY');
            if (dateObj.month() === 3 || dateObj.month() === 7) {
                formattedDate = dateObj.format('dddd[, ils ]D[ d’]MMMM YYYY');
            }

            return {
                date: date,
                formattedDate: formattedDate,
                events: this.events.filter(e => e.date === date),
            }
        });
    }
}
