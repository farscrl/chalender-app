import { Component, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EventVersion } from '../../../shared/data/event';
import { NoticeBoardItemVersion } from '../../../shared/data/notices';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-delete-event',
    templateUrl: './delete-event.component.html',
    styleUrls: ['./delete-event.component.scss'],
    imports: [TranslatePipe]
})
export class DeleteEventComponent {
    @Input() event: EventVersion | NoticeBoardItemVersion | undefined;
    @Input() type: 'event' | 'notice' = 'event';

    constructor(public activeModal: NgbActiveModal) {
    }
}
