import { Component, Input } from '@angular/core';
import { PublicationTypes } from "../../data/event";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-status-badge',
    templateUrl: './status-badge.component.html',
    styleUrls: ['./status-badge.component.scss'],
    imports: [TranslatePipe]
})
export class StatusBadgeComponent {

    @Input()
    status: PublicationTypes = 'INVALID';
}
