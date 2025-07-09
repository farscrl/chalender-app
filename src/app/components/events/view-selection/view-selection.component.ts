import { Component, Input } from '@angular/core';
import { EventsFilterService } from '../../../shared/services/events-filter.service';
import { NoticesFilterService } from '../../../shared/services/notices-filter.service';

@Component({
    selector: 'app-view-selection',
    templateUrl: './view-selection.component.html',
    styleUrls: ['./view-selection.component.scss'],
    standalone: false
})
export class ViewSelectionComponent {

    @Input()
    public type: 'events' | 'notices' = 'events';

    constructor(
        public eventsFilterService: EventsFilterService,
        public noticesFilterService: NoticesFilterService,
    ) {
    }

    selectView(view: 'cards' | 'list') {
        if (this.type === 'notices') {
            this.noticesFilterService.setSelectedView(view);
        } else {
            this.eventsFilterService.setSelectedView(view);
        }
    }
}
