import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IframeService } from '../../../../services/iframe.service';
import * as dayjs from 'dayjs';
import { rmLocale } from '../../../../shared/utils/day-js-locale';
import { EventFilterModalComponent } from '../../../events/event-filter-modal/event-filter-modal.component';
import { NoticesFilterService } from '../../../../shared/services/notices-filter.service';
import { NoticeBoardItemDto } from '../../../../shared/data/notices';

@Component({
    selector: 'app-notices-list-cards',
    templateUrl: './notices-list-cards.component.html',
    styleUrls: ['./notices-list-cards.component.scss']
})
export class NoticesListCardsComponent {
    @Output() toggleFilter: EventEmitter<void> = new EventEmitter<void>();

    notices: NoticeBoardItemDto[] = [];

    private datesSubscription?: Subscription;

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
        modalRef.componentInstance.type = 'notices';
    }

    openDesktopFilter(): void {
        this.toggleFilter.emit();
    }
}
