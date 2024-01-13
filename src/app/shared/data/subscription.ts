import { Genre, Region } from './static-data';
import { EventOccurrences } from './event';

export class EventsSubscription {
    id?: string;

    name?: string;
    type?: SubscriptionType;
    active: boolean = true;

    genres: Genre[] = [];
    occurrences: EventOccurrences[] = [];
    regions: Region[] = [];

    searchTerm: string = '';
}

export class NoticesSubscription {
    id?: string;

    name?: string;
    type?: SubscriptionType;
    active: boolean = true;

    genres: Genre[] = [];

    searchTerm: string = '';
}

export type SubscriptionType = 'INSTANT' | 'WEEKLY';
