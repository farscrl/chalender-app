import { Component } from '@angular/core';
import { NoticesFilterService } from '../../../shared/services/notices-filter.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-no-notices',
    templateUrl: './no-notices.component.html',
    styleUrls: ['./no-notices.component.scss'],
    imports: [TranslatePipe]
})
export class NoNoticesComponent {

    constructor(
        private noticesFilterService: NoticesFilterService,
    ) {
    }

    resetFilters() {
        this.noticesFilterService.resetFilters();
    }
}
