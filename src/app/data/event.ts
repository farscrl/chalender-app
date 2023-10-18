import { EventLanguage, Genre, Region } from "./static-data";

export class Event {
    id?: string;

    draft?: EventVersion;
    currentlyPublished?: EventVersion;
    waitingForReview?: EventVersion;

    versions: EventVersion[] = [];

    eventStatus?: EventStatusTypes = 'INVALID';
    ownerEmail?: string;
}

export type EventStatusTypes = 'DRAFT' | 'IN_REVIEW' | 'PUBLISHED' | 'NEW_MODIFICATION' | 'REJECTED' | 'INVALID';

export class EventVersion {
    title?: string;
    genres: Genre[] = [];
    description?: string;
    location?: string;
    address?: string;
    occurrences: EventOccurrences[] = [];
    regions: Region[] = [];
    eventLanguages: EventLanguage[] = [];
    // images: Image[] = [];
    onlineOnly?: boolean;
    acceptTerms?: boolean;
    organiser?: string;
    pricing?: string;
    link?: string;
    contact?: string;
}

export class EventDto {
    id?: string;
    status?: string;

    title?: string;
    genres: Genre[] = [];
    description?: string;
    location?: string;
    address?: string;
    occurrences: EventOccurrences[] = [];
    regions: Region[] = [];
    eventLanguages: EventLanguage[] = [];
    // images: string[] = [];
    onlineOnly?: boolean;
    acceptTerms?: boolean;
    organiser?: string;
    pricing?: string;
    link?: string;
    contact?: string;
}

export class EventLookup {
    eventId?: string;
    title?: string;
    genres: Genre[] = [];
    location?: string;
    regions: Region[] = [];
    eventLanguages: EventLanguage[] = [];
    date: string = '';
    start?: string;
    end?: string;
    isAllDay?: boolean;
    isCancelled?: boolean;
    imageUrl?: string;
}

export class EventOccurrences {
    date?: string;
    start?: string;
    end?: string;
    isAllDay?: boolean;
    isCancelled?: boolean;
}

export class EventFilter {
    regions: number[] = [];
    genres: number[] = [];
    startDate?: string;
    searchTerm?: string;
}

export class CategorizedEvents {
    date: string = '';
    formattedDate?: string = '';
    formattedWeekday?: string = '';
    formattedDateShort?: string = '';
    events: EventLookup[] = [];
}
