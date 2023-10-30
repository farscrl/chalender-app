import { SortColumn, SortDirection } from '../utils/sortable.directive';

export class ModerationEventsFilter {
    searchTerm?: string;

    dates: 'ALL' | 'FUTURE' | 'PAST' = 'FUTURE';

    includeStateInReview = true;
    includeStateNewModification = true;
    includeStatePublished = false;
    includeStateRejected = false;
    includeStateInvalid = true;

    sortBy: SortColumn = 'DATE';
    sortOrder: SortDirection = 'ASC';
}
