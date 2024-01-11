import { Genre } from './static-data';
import { Document, Image, PublicationTypes } from './event';

export class NoticeBoardItem {
    id?: string;

    draft?: NoticeBoardItemVersion;
    currentlyPublished?: NoticeBoardItemVersion;
    waitingForReview?: NoticeBoardItemVersion;
    rejected?: NoticeBoardItemVersion;

    versions: NoticeBoardItemVersion[] = [];

    publicationStatus?: PublicationTypes = 'INVALID';
    ownerEmail?: string;
    contactEmail?: string;

    createdDate?: number;
    lastModifiedDate?: number;
}

export class NoticeBoardItemVersion {
    title?: string;
    genres: Genre[] = [];
    description?: string;
    contactData?: string;
    images: Image[] = [];
    documents: Document[] = [];
    acceptTerms?: boolean;
}

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
