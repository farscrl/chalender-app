import { Component, Input } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-back-button',
    templateUrl: './back-button.component.html',
    styleUrls: ['./back-button.component.scss'],
    imports: [TranslatePipe]
})
export class BackButtonComponent {

    @Input() backTo = '/';

    constructor(private navigationService: NavigationService) {
    }

    goBack() {
        this.navigationService.back(this.backTo);
    }
}
