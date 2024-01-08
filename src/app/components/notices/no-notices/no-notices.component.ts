import { Component } from '@angular/core';
import { NoticesFilterService } from '../../../shared/services/notices-filter.service';

@Component({
    selector: 'app-no-notices',
    templateUrl: './no-notices.component.html',
    styleUrls: ['./no-notices.component.scss']
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
