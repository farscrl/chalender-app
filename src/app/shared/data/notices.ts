import { Genre } from './static-data';
import { Document, Image, PublicationTypes } from './event';

export class NoticeBoardItemDto {
    id?: string;
    status?: PublicationTypes;
    contactEmail?: string;

    title?: string;
    genres: Genre[] = [];
    description?: string;
    contactData?: string;
    images: Image[] = [];
    documents: Document[] = [];
    publicationDate?: string;
    acceptTerms?: boolean;
}

export class NoticeBoardFilter {
    genres: number[] = [];
    searchTerm?: string;
}
