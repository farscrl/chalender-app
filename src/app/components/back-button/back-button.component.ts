import { Component, Input } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
    selector: 'app-back-button',
    templateUrl: './back-button.component.html',
    styleUrls: ['./back-button.component.scss'],
    standalone: false
})
export class BackButtonComponent {

    @Input() backTo = '/';

    constructor(private navigationService: NavigationService) {
    }

    goBack() {
        this.navigationService.back(this.backTo);
    }
}
