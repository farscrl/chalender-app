import { Component, Input } from '@angular/core';
import { NoticeBoardItemDto } from '../../../shared/data/notices';
import { UrlUtil } from '../../../shared/utils/url.util';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-notice-list-item',
    templateUrl: './notice-list-item.component.html',
    styleUrls: ['./notice-list-item.component.scss'],
    imports: [RouterLink]
})
export class NoticeListItemComponent {
    @Input()
    public notice?: NoticeBoardItemDto;

    @Input()
    public isFirst = false;

    constructor(
        public urlUtil: UrlUtil,
    ) {
    }
}
