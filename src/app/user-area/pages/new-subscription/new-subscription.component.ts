import { Component } from '@angular/core';
import { Subscription } from '../../../shared/data/subscription';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-subscription',
    templateUrl: './new-subscription.component.html',
    styleUrls: ['./new-subscription.component.scss']
})
export class NewSubscriptionComponent {
    subscription: Subscription;

    constructor(private router: Router) {
        this.subscription = new Subscription();
        this.subscription.id = 'xxx';
    }

    success() {
        this.router.navigateByUrl("/user/subscriptions");
    }

    cancel() {
        this.router.navigateByUrl("/user/subscriptions");
    }
}
