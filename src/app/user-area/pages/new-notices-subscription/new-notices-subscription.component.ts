import { Component } from '@angular/core';
import { NoticesSubscription } from '../../../shared/data/subscription';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-notices-subscription',
    templateUrl: './new-notices-subscription.component.html',
    styleUrls: ['./new-notices-subscription.component.scss'],
    standalone: false
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
