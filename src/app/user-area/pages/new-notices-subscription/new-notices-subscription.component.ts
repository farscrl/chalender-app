import { Component } from '@angular/core';
import { NoticesSubscription } from '../../../shared/data/subscription';
import { Router } from '@angular/router';
import { NoticesSubscriptionComponent } from '../../../shared/components/forms/notices-subscription/notices-subscription.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-new-notices-subscription',
    templateUrl: './new-notices-subscription.component.html',
    styleUrls: ['./new-notices-subscription.component.scss'],
    imports: [NoticesSubscriptionComponent, TranslatePipe]
})
export class NewNoticesSubscriptionComponent {
    subscription: NoticesSubscription;

    constructor(private router: Router) {
        this.subscription = new NoticesSubscription();
        this.subscription.id = 'xxx';
    }

    success() {
        this.router.navigateByUrl("/user/subscriptions/notices");
    }

    cancel() {
        this.router.navigateByUrl("/user/subscriptions/notices");
    }
}
