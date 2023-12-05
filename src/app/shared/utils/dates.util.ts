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

    getMonthYearString(month: number, year: number): string {
        const date = dayjs().month(month - 1).year(year);
        return date.format('MMMM YYYY');
    }

    getDateTimeString(date: number): string {
        const djs = dayjs.unix(date);
        return djs.format('DD-MM-YYYY H:mm:ss');
    }

    isValidEventDate(input: string): string | null {
        const parts = input.split("-");
        if (parts.length === 3 && (+parts[0] > 9999)) {
            return 'too_far_future';
        }

        const dateObj = dayjs(input, "YYYY-MM-DD");
        if (dateObj.isBefore(dayjs())) {
            return 'past';
        }

        if (dateObj.isAfter(dayjs('2039-12-31'))) {
            return 'too_far_future';
        }

        return null;
    }
}
