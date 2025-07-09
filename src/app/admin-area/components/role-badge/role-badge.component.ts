import {Component, Input} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-role-badge',
    templateUrl: './role-badge.component.html',
    styleUrls: ['./role-badge.component.scss'],
    imports: [TranslatePipe]
})
export class RoleBadgeComponent {
    @Input()
    role: string = '';
}
