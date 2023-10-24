import { Injectable } from '@angular/core';
import { EventDto, EventLookup } from '../data/event';

@Injectable({
    providedIn: 'root'
})
export class EventTransformerUtil {
    getEventLookup(event: EventDto): EventLookup {
        const lookup: EventLookup = new EventLookup();
        lookup.eventId = event.id;
        lookup.title = event.title;
        lookup.genres = event.genres;
        lookup.location = event.location;
        lookup.regions = event.regions;
        lookup.eventLanguages = event.eventLanguages;
        if (event.occurrences && event.occurrences.length > 0) {
            lookup.date = event.occurrences[0].date!;
            lookup.start = event.occurrences[0].start;
            lookup.end = event.occurrences[0].end;
            lookup.isAllDay = event.occurrences[0].isAllDay;
            lookup.isCancelled = event.occurrences[0].isCancelled;
        }

        if (event.images && event.images.length > 0) {
            lookup.imageUrl = event.images[0].url;
        }

        return lookup;
    }
}
