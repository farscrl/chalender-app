import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IframeService } from '../../../../services/iframe.service';
import dayjs from 'dayjs';
import { rmLocale } from '../../../../shared/utils/day-js-locale';
import { EventFilterModalComponent } from '../../../events/event-filter-modal/event-filter-modal.component';
import { NoticesFilterService } from '../../../../shared/services/notices-filter.service';
import { NoticeBoardItemDto } from '../../../../shared/data/notices';

@Component({
    selector: 'app-notices-list-table',
    templateUrl: './notices-list-table.component.html',
    styleUrls: ['./notices-list-table.component.scss'],
})
export class NoticesListTableComponent {

    @Output() toggleFilter: EventEmitter<void> = new EventEmitter<void>();

    public notices: NoticeBoardItemDto[] = [];

    private datesSubscription?: Subscription;
    private moreDatesSubscription?: Subscription;

    constructor(
        private modalService: NgbModal,
        public noticesFilterService: NoticesFilterService,
        public iframeService: IframeService,
    ) {
    }

    ngOnInit() {
        const customParseFormat = require('dayjs/plugin/customParseFormat');
        dayjs.extend(customParseFormat);
        dayjs.locale('rm', rmLocale);

        this.datesSubscription = this.noticesFilterService.getSearchResultsObservable().subscribe(notices => {
            this.notices = [];
            this.notices = notices;
        });
        this.moreDatesSubscription = this.noticesFilterService.getSearchMoreResultsObservable().subscribe(notices => {
            this.notices = notices;
        });
        this.noticesFilterService.search();
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
        modalRef.componentInstance.type = 'notices';
    }

    openDesktopFilter(): void {
        this.toggleFilter.emit();
    }
}
