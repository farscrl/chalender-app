import { Component } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NoticesService } from '../../../shared/services/notices.service';
import { NoticeBoardItem, NoticeBoardItemVersion } from '../../../shared/data/notices';
import { NoticePreviewComponent } from '../../../components/notice-preview/notice-preview.component';
import { ModerationNoticeBoardFilter } from '../../../shared/data/filter';
import dayjs from 'dayjs';
import { DeleteEventComponent } from '../../../components/modals/delete-event/delete-event.component';

@Component({
    selector: 'app-my-notices',
    templateUrl: './my-notices.component.html',
    styleUrls: ['./my-notices.component.scss'],
})
export class MyNoticesComponent {
    notices: NoticeBoardItem[] = [];
    total: number = 0;
    current: number = 0;

    isLoading: boolean = false;

    private page: number = 0;

    filter = new ModerationNoticeBoardFilter();

    constructor(
        private userService: UserService,
        private modalService: NgbModal,
        private router: Router,
        private noticesService: NoticesService,
    ) {
    }

    ngOnInit(): void {
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
            case 'REJECTED':
                return notice.rejected;
            default:
                return undefined;
        }
    }

    hasChanges(notice: NoticeBoardItem) {
        return notice.publicationStatus === 'NEW_MODIFICATION' || notice.publicationStatus === 'IN_REVIEW';
    }

    goToPage(page: number) {
        this.page = page;
        this.search();
    }

    showPreview(notice: NoticeBoardItem) {
        const modalRef = this.modalService.open(NoticePreviewComponent, { size: 'xl', centered: true });
        this.noticesService.getNotice(notice.id!).subscribe(notice => {
            modalRef.componentInstance.noticeDto = notice;
        });
    }

    edit(notice: NoticeBoardItem) {
        this.router.navigateByUrl('/user/notice-form', {
            state: { notice },
        });
    }

    delete(notice: NoticeBoardItem) {
        const modalRef = this.modalService.open(DeleteEventComponent, { size: 'lg', centered: true });
        modalRef.componentInstance.event = this.getNoticeVersion(notice);
        modalRef.componentInstance.type = 'notice';

        modalRef.closed.subscribe(reason => {
            if (reason === 'delete') {
                this.noticesService.deleteNotice(notice.id!).subscribe(d => {
                    this.search();
                });
            }
        });
    }

    updateSearchTerm(searchTerm: string) {
        this.filter.searchTerm = searchTerm;
        this.search();
    }

    search() {
        this.isLoading = true;
        this.userService.getNotices(this.filter, this.page, 20).subscribe(notices => {
            this.notices = notices.content;
            this.total = notices.totalPages;
            this.current = notices.number;
            this.isLoading = false;
        });
    }

    getDate(instant: number) {
        return dayjs(instant).format('DD-MM-YYYY');
    }

    private getNoticeVersion(notice: NoticeBoardItem): NoticeBoardItemVersion | undefined {
        switch (notice.publicationStatus) {
            case 'DRAFT':
                return notice.draft;
            case 'IN_REVIEW':
                return notice.waitingForReview;
            case 'PUBLISHED':
                return notice.currentlyPublished;
            case 'NEW_MODIFICATION':
                return notice.waitingForReview;
            case 'REJECTED':
                return notice.rejected;
            default:
                return undefined;
        }
    }
}
