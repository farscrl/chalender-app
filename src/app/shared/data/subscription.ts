import { Genre, Region } from './static-data';
import { EventOccurrences } from './event';

export class Subscription {
    id?: string;

    name?: string;
    type?: SubscriptionType;
    active: boolean = true;

    genres: Genre[] = [];
    occurrences: EventOccurrences[] = [];
    regions: Region[] = [];

    searchTerm: string = '';
}

export type SubscriptionType = 'INSTANT' | 'WEEKLY';
