import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-role-badge',
    templateUrl: './role-badge.component.html',
    styleUrls: ['./role-badge.component.scss'],
    standalone: false
})
export class RoleBadgeComponent {
    @Input()
    role: string = '';
}
