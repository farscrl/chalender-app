import { Component } from '@angular/core';
import { EventsFilterService } from '../../../shared/services/events-filter.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-no-events',
    templateUrl: './no-events.component.html',
    styleUrls: ['./no-events.component.scss'],
    imports: [TranslatePipe]
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
