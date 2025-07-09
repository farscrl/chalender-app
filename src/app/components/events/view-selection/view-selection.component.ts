import { Component, Input } from '@angular/core';
import { EventsFilterService } from '../../../shared/services/events-filter.service';
import { NoticesFilterService } from '../../../shared/services/notices-filter.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-view-selection',
    templateUrl: './view-selection.component.html',
    styleUrls: ['./view-selection.component.scss'],
    imports: [NgbTooltip, TranslatePipe]
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
