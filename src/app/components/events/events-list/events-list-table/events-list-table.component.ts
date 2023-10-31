import { Component, EventEmitter, Output } from '@angular/core';
import { EventsFilterService } from '../../../../services/events-filter.service';
import { CategorizedEvents } from '../../../../data/event';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatesUtil } from '../../../../utils/dates.util';
import * as dayjs from 'dayjs';
import { rmLocale } from '../../../../utils/day-js-locale';
import { EventFilterModalComponent } from '../../event-filter-modal/event-filter-modal.component';

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
