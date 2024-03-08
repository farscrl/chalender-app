import { Component, QueryList, ViewChildren } from '@angular/core';
import { ModerationNoticeBoardFilter } from '../../../shared/data/filter';
import { SortableDirective, SortEvent } from '../../../shared/directives/sortable.directive';
import { ModeratorService } from '../../../shared/services/moderator.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DatesUtil } from '../../../shared/utils/dates.util';
import { ReasonForChangeComponent } from '../../../components/modals/reason-for-change/reason-for-change.component';
import { DeleteEventComponent } from '../../../components/modals/delete-event/delete-event.component';
import { NoticeBoardItem, NoticeBoardItemVersion } from '../../../shared/data/notices';
import { NoticePreviewComponent } from '../../../components/notice-preview/notice-preview.component';
import { NoticesService } from '../../../shared/services/notices.service';
import { NoticeDiffComponent } from '../../../components/notice-diff/notice-diff.component';
import * as dayjs from 'dayjs';

@Component({
    selector: 'app-moderator-notices',
    templateUrl: './moderator-notices.component.html',
    styleUrls: ['./moderator-notices.component.scss']
})
export class ModeratorNoticesComponent {

    notices: NoticeBoardItem[] = [];
    total: number = 0;
    current: number = 0;

    filter = new ModerationNoticeBoardFilter();

    private page: number = 0;

    @ViewChildren(SortableDirective) headers: QueryList<SortableDirective> | undefined;

    constructor(
        private moderatorService: ModeratorService,
        private modalService: NgbModal,
        private router: Router,
        private noticesService: NoticesService,
        public datesUtil: DatesUtil,
    ) {
    }

    ngOnInit(): void {
        this.filter.sortBy = 'MODIFIED_DATE';
        this.filter.sortOrder = 'DESC';
        
        this.search();
    }

    getEventVersion(notice: NoticeBoardItem): NoticeBoardItemVersion | undefined {
        switch (notice.publicationStatus) {
            case 'DRAFT':
                return notice.draft;
            case 'IN_REVIEW':
                return notice.waitingForReview;
            case 'PUBLISHED':
                return notice.currentlyPublished;
            case 'NEW_MODIFICATION':
                return notice.waitingForReview;
            case "REJECTED":
                return notice.rejected;
            default:
                return undefined;
        }
    }

    hasChanges(notice: NoticeBoardItem) {
        return notice.publicationStatus === 'NEW_MODIFICATION' || notice.publicationStatus === 'IN_REVIEW'
    }

    goToPage(page: number) {
        this.page = page;
        this.search();
    }

    showPreview(notice: NoticeBoardItem) {
        const modalRef = this.modalService.open(NoticePreviewComponent, {size: 'xl', centered: true});
        this.noticesService.getNotice(notice.id!).subscribe(notice => {
            modalRef.componentInstance.noticeDto = notice;
        });
    }

    showDiff(notice: NoticeBoardItem) {
        if (!this.canShowDiff(notice)) {
            return;
        }

        const modalRef = this.modalService.open(NoticeDiffComponent, {size: 'xl', centered: true});
        modalRef.componentInstance.oldVersion = notice.currentlyPublished!;
        modalRef.componentInstance.newVersion = notice.waitingForReview!;
    }

    canShowDiff(notice: NoticeBoardItem) {
        return notice.publicationStatus === 'NEW_MODIFICATION';
    }

    accept(notice: NoticeBoardItem): void {
        const modalRef = this.modalService.open(ReasonForChangeComponent, {size: 'lg', centered: true});
        modalRef.componentInstance.event = this.getEventVersion(notice);
        modalRef.componentInstance.type = 'accept';

        modalRef.closed.subscribe(reason => {
            console.debug("reason", reason);
            this.moderatorService.acceptNotice(notice.id!, reason).subscribe(notice => {
                this.search();
            });
        });
    }

    refuse(notice: NoticeBoardItem): void {
        const modalRef = this.modalService.open(ReasonForChangeComponent, {size: 'lg', centered: true});
        modalRef.componentInstance.event = this.getEventVersion(notice);
        modalRef.componentInstance.type = 'refuse';

        modalRef.closed.subscribe(reason => {
            console.debug("reason", reason);
            this.moderatorService.refuseNotice(notice.id!, reason).subscribe(notice => {
                this.search();
            });
        });
    }

    edit(notice: NoticeBoardItem) {
        this.router.navigateByUrl('/user/notice-form', {
            state: {
                notice,
                returnToModeratorView: true,
            },
        });
    }

    delete(notice: NoticeBoardItem) {
        const modalRef = this.modalService.open(DeleteEventComponent, {size: 'lg', centered: true});
        modalRef.componentInstance.event = this.getEventVersion(notice);

        modalRef.closed.subscribe(reason => {
            if (reason === 'delete') {
                this.moderatorService.deleteNotice(notice.id!).subscribe(event => {
                    this.search();
                });
            }
        });
    }

    updateSearchTerm(searchTerm: string) {
        this.filter.searchTerm = searchTerm;
        this.search();
    }


    onSort({column, direction}: SortEvent) {
        if (!this.headers) {
            return;
        }

        // resetting other headers
        this.headers.forEach((header) => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });

        this.filter.sortOrder = direction;
        this.filter.sortBy = column;
        this.search();
    }

    search() {
        this.moderatorService.getNotices(this.filter, this.page, 20).subscribe(notices => {
            this.notices = notices.content;
            this.total = notices.totalPages;
            this.current = notices.number;
        });
    }

    getDate(instant: number) {
        return dayjs(instant).format('DD-MM-YYYY')
    }
}
