import { Genre, Region } from './static-data';
import { EventOccurrences } from './event';

export class Subscription {
    id?: string;

    genres: Genre[] = [];
    occurrences: EventOccurrences[] = [];
    regions: Region[] = [];

    searchTerm: string = '';
}
