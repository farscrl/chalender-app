import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
    selector: 'app-back-button',
    templateUrl: './back-button.component.html',
    styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent {

    constructor(private navigationService: NavigationService) {
    }

    goBack() {
        this.navigationService.back();
    }
}
