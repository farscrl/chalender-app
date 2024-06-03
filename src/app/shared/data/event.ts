import { EventLanguage, Genre, Region } from "./static-data";

export class Event {
    id?: string;

    draft?: EventVersion;
    currentlyPublished?: EventVersion;
    waitingForReview?: EventVersion;
    rejected?: EventVersion;

    versions: EventVersion[] = [];

    publicationStatus?: PublicationTypes = 'INVALID';
    ownerEmail?: string;
    contactEmail?: string;

    createdDate?: number;
    lastModifiedDate?: number;
}

export type PublicationTypes = 'DRAFT' | 'IN_REVIEW' | 'PUBLISHED' | 'NEW_MODIFICATION' | 'REJECTED' | 'INVALID';

export class EventVersion {
    title?: string;
    genres: Genre[] = [];
    description?: string;
    location?: string;
    address?: string;
    occurrences: EventOccurrences[] = [];
    regions: Region[] = [];
    eventLanguages: EventLanguage[] = [];
    images: Image[] = [];
    documents: Document[] = [];
    onlineOnly?: boolean;
    acceptTerms?: boolean;
    organiser?: string;
    pricing?: string;
    link?: string;
    contact?: string;
}

export class EventDto {
    id?: string;
    status?: PublicationTypes;
    contactEmail?: string;

    title?: string;
    genres: Genre[] = [];
    description?: string;
    location?: string;
    address?: string;
    occurrences: EventOccurrences[] = [];
    regions: Region[] = [];
    eventLanguages: EventLanguage[] = [];
    images: Image[] = [];
    documents: Document[] = [];
    onlineOnly?: boolean;
    acceptTerms?: boolean;
    organiser?: string;
    pricing?: string;
    link?: string;
    contact?: string;
}

export class Image {
    id?: string;
    used: boolean = false;
    originalName?: string;
    url?: string;
}

export class Document {
    id?: string;
    used: boolean = false;
    originalName?: string;
    url?: string;
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
    onlineOnly?: boolean;
}

export class EventOccurrences {
    date?: string;
    start?: string;
    end?: string;
    isAllDay?: boolean;
    isCancelled?: boolean;
    occurrenceUid?: string;
}

export class EventFilter {
    regions: number[] = [];
    genres: number[] = [];
    startDate?: string;
    searchTerm?: string;
}

export class EventFilterUrlParams {
    regions?: string;
    genres?: string;
    startDate?: string;
    searchTerm?: string;
    iframe?: boolean;
    showAddButton?: boolean;
    showTopNavigation?: boolean;
    showSearch?: boolean;
    showViewSelection?: boolean;
    view?: string;
}

export class CategorizedEvents {
    date: string = '';
    formattedWeekday?: string = '';
    formattedDateShort?: string = '';
    events: EventLookup[] = [];
}
