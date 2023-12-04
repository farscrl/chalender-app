import { Component } from '@angular/core';
import { EventsFilterService } from '../../../shared/services/events-filter.service';

@Component({
    selector: 'app-no-events',
    templateUrl: './no-events.component.html',
    styleUrls: ['./no-events.component.scss']
})
export class NoEventsComponent {

    constructor(
        private eventsFilterService: EventsFilterService
    ) {
    }

    resetFilters() {
        console.log('reset')
        this.eventsFilterService.resetFilters();
    }
}
