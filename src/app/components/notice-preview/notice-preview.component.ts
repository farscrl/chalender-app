import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NoticeBoardItemDto } from '../../shared/data/notices';

@Component({
    selector: 'app-notice-preview',
    templateUrl: './notice-preview.component.html',
    styleUrls: ['./notice-preview.component.scss'],
    standalone: false
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
