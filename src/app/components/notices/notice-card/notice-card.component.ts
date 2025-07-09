import { Component, Input } from '@angular/core';
import { NoticeBoardItemDto } from '../../../shared/data/notices';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-notice-card',
    templateUrl: './notice-card.component.html',
    styleUrls: ['./notice-card.component.scss'],
    imports: [RouterLink]
})
export class NoticeCardComponent {

    @Input()
    public notice?: NoticeBoardItemDto;

    @Input()
    public isFirst = false;

    get imgUrl() {
        if (!this.notice?.images || this.notice.images.length < 1) {
            return '';
        }
        return this.notice.images[0].url + '?width=400&aspect_ratio=100:101&crop_gravity=center&auto_optimize=medium';
    }
}
