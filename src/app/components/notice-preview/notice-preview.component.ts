import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NoticeBoardItemDto } from '../../shared/data/notices';
import { NoticeCardComponent } from '../notices/notice-card/notice-card.component';
import { NoticeDetailsComponent } from '../notices/notice-details/notice-details.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-notice-preview',
    templateUrl: './notice-preview.component.html',
    styleUrls: ['./notice-preview.component.scss'],
    imports: [NoticeCardComponent, NoticeDetailsComponent, TranslatePipe]
})
export class NoticePreviewComponent {

    @Input()
    set noticeDto(dto: NoticeBoardItemDto) {
        this._noticeDto = dto;
    }

    get noticeDto(): NoticeBoardItemDto | undefined {
        return this._noticeDto;
    }

    private _noticeDto?: NoticeBoardItemDto;

    constructor(private modal: NgbActiveModal) {
    }

    ngOnInit(): void {

    }

    close() {
        this.modal.close();
    }
}
