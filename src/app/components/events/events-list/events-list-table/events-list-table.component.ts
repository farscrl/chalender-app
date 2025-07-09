import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import dayjs from 'dayjs';
import { EventFilterModalComponent } from '../../event-filter-modal/event-filter-modal.component';
import { CategorizedEvents } from '../../../../shared/data/event';
import { EventsFilterService } from '../../../../shared/services/events-filter.service';
import { DatesUtil } from '../../../../shared/utils/dates.util';
import { rmLocale } from '../../../../shared/utils/day-js-locale';
import { IframeService } from '../../../../services/iframe.service';
import { ViewSelectionComponent } from '../../view-selection/view-selection.component';
import { EventListItemComponent } from '../../event-list-item/event-list-item.component';
import { NoEventsComponent } from '../../no-events/no-events.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-events-list-table',
    templateUrl: './events-list-table.component.html',
    styleUrls: ['./events-list-table.component.scss'],
    imports: [ViewSelectionComponent, EventListItemComponent, NoEventsComponent, TranslatePipe]
})
export class EventsListTableComponent {

    @Output() toggleFilter: EventEmitter<void> = new EventEmitter<void>();

    public categorizedEvents: CategorizedEvents[] = [];
    private datesSubscription?: Subscription;
    private moreDatesSubscription?: Subscription;

    constructor(
        private modalService: NgbModal,
        public eventsFilterService: EventsFilterService,
        private datesUtil: DatesUtil,
        public iframeService: IframeService,
    ) {
    }

    ngOnInit() {
        const customParseFormat = require('dayjs/plugin/customParseFormat');
        dayjs.extend(customParseFormat);
        dayjs.locale('rm', rmLocale);

        this.datesSubscription = this.eventsFilterService.getSearchResultsObservable().subscribe(events => {
            this.categorizedEvents = [];
            this.datesUtil.addGroupEvents(this.categorizedEvents, events);
        });
        this.moreDatesSubscription = this.eventsFilterService.getSearchMoreResultsObservable().subscribe(events => {
            this.datesUtil.addGroupEvents(this.categorizedEvents, events);
        });
        this.eventsFilterService.search();
    }

    ngOnDestroy(): void {
        if (this.datesSubscription) {
            this.datesSubscription.unsubscribe();
        }
        if (this.moreDatesSubscription) {
            this.moreDatesSubscription.unsubscribe();
        }
    }

    openMobileFilter(): void {
        const modalRef = this.modalService.open(EventFilterModalComponent, {
            fullscreen: true,
        });
    }

    openDesktopFilter(): void {
        this.toggleFilter.emit();
    }
}
