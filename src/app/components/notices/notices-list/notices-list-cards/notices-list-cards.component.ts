import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IframeService } from '../../../../services/iframe.service';
import dayjs from 'dayjs';
import { rmLocale } from '../../../../shared/utils/day-js-locale';
import { EventFilterModalComponent } from '../../../events/event-filter-modal/event-filter-modal.component';
import { NoticesFilterService } from '../../../../shared/services/notices-filter.service';
import { NoticeBoardItemDto } from '../../../../shared/data/notices';
import { ViewSelectionComponent } from '../../../events/view-selection/view-selection.component';
import { NoticeCardComponent } from '../../notice-card/notice-card.component';
import { NoNoticesComponent } from '../../no-notices/no-notices.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-notices-list-cards',
    templateUrl: './notices-list-cards.component.html',
    styleUrls: ['./notices-list-cards.component.scss'],
    imports: [ViewSelectionComponent, NoticeCardComponent, NoNoticesComponent, TranslatePipe]
})
export class NoticesListCardsComponent {
    @Output() toggleFilter: EventEmitter<void> = new EventEmitter<void>();

    notices: NoticeBoardItemDto[] = [];

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
            this.notices = notices;
        });
        this.moreDatesSubscription = this.noticesFilterService.getSearchMoreResultsObservable().subscribe(notices => {
            this.notices.push(...notices);
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
