import {EventLanguage, Genre, Region} from "./static-data";

export class Event {
    id?: string;

    currentlyPublished?: EventVersion;
    draft?: EventVersion;
    inReview?: EventVersion;
    lastReviewed?: EventVersion;

    versions: EventVersion[] = [];
}

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
}

export class EventOccurrences {
    date?: Date;
    start?: Date;
    end?: Date;
    isAllDay?: boolean;
    isCancelled?: boolean;
}
