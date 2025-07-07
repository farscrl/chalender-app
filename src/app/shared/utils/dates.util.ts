import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import { CategorizedEvents, EventLookup } from '../data/event';

@Injectable({
    providedIn: 'root',
})
export class DatesUtil {
    addGroupEvents(groups: CategorizedEvents[], events: EventLookup[]) {
        events.forEach(el => {
            const group = groups.find(g => g.date === el.date);

            if (group) {
                group.events.push(el);
            } else {
                const dateObj = dayjs(el.date, 'DD-MM-YYYY');

                groups.push({
                    date: el.date,
                    formattedDateShort: dateObj.format('DD-MM-YYYY'),
                    formattedWeekday: dateObj.format('dddd'),
                    events: [el],
                });
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
        const parts = input.split('-');
        if (parts.length === 3 && (+parts[0] > 9999)) {
            return 'too_far_future';
        }

        const dateObj = dayjs(input, 'YYYY-MM-DD');
        const now = dayjs();
        const lastMidnight = now.startOf('day');
        if (dateObj.isBefore(lastMidnight)) {
            return 'past';
        }

        if (dateObj.isAfter(dayjs('2039-12-31'))) {
            return 'too_far_future';
        }

        return null;
    }
}
