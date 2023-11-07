import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as dayjs from 'dayjs';
import { EventFilterModalComponent } from '../../event-filter-modal/event-filter-modal.component';
import { CategorizedEvents } from '../../../../shared/data/event';
import { EventsFilterService } from '../../../../shared/services/events-filter.service';
import { DatesUtil } from '../../../../shared/utils/dates.util';
import { rmLocale } from '../../../../shared/utils/day-js-locale';

@Component({
    selector: 'app-events-list-table',
    templateUrl: './events-list-table.component.html',
    styleUrls: ['./events-list-table.component.scss']
})
export class EventsListTableComponent {

    @Output() toggleFilter: EventEmitter<void> = new EventEmitter<void>();

    public categorizedEvents: CategorizedEvents[] = [];
    private datesSubscription?: Subscription;

    constructor(private modalService: NgbModal, public eventsFilterService: EventsFilterService, private datesUtil: DatesUtil) {
    }

    ngOnInit() {
        const customParseFormat = require('dayjs/plugin/customParseFormat');
        dayjs.extend(customParseFormat);
        dayjs.locale('rm', rmLocale);

        this.datesSubscription = this.eventsFilterService.getSearchResultsObservable().subscribe(dates => {
            this.categorizedEvents = this.datesUtil.groupEvents(dates);
        });
    }

    ngOnDestroy(): void {
        if (this.datesSubscription) {
            this.datesSubscription.unsubscribe();
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
