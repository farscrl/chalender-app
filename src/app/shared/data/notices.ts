import { Genre } from './static-data';
import { Document, Image } from './event';

export class NoticeBoardItemDto {
    id?: string;
    title?: string;
    genres: Genre[] = [];
    description?: string;
    contactData?: string;
    images: Image[] = [];
    documents: Document[] = [];
    publicationDate?: string;
}

export class NoticeBoardFilter {
    genres: number[] = [];
    searchTerm?: string;
}
