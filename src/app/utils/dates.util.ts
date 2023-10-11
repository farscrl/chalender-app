import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { CategorizedEvents, EventLookup } from '../data/event';

@Injectable({
    providedIn: 'root'
})
export class DatesUtil {
    groupEvents(events: EventLookup[]): CategorizedEvents[] {
        const dates = [...new Set(events.map(event => event.date))];
        const sortedDates = dates.sort((a, b) => {
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
        return sortedDates.map(date => {
            const dateObj = dayjs(date, "DD-MM-YYYY");
            let formattedDate = dateObj.format('dddd[, ils ]D[ da ]MMMM YYYY');
            if (dateObj.month() === 3 || dateObj.month() === 7) {
                formattedDate = dateObj.format('dddd[, ils ]D[ d’]MMMM YYYY');
            }

            return {
                date: date,
                formattedDate: formattedDate,
                formattedDateShort: dateObj.format('DD-MM-YYYY'),
                formattedWeekday: dateObj.format('dddd'),
                events: events.filter(e => e.date === date),
            }
        });
    }
}
