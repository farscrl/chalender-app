import { Component } from '@angular/core';
import { EventsFilterService } from '../../../services/events-filter.service';

@Component({
    selector: 'app-view-selection',
    templateUrl: './view-selection.component.html',
    styleUrls: ['./view-selection.component.scss']
})
export class ViewSelectionComponent {

    constructor(public eventsFilterService: EventsFilterService) {
    }

    selectView(view: 'cards' | 'list') {
        this.eventsFilterService.selectedView = view;
    }
}
