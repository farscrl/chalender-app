import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from '../../../shared/data/subscription';
import { SubscriptionsService } from '../../../shared/services/subscriptions.service';

@Component({
    selector: 'app-edit-subscription',
    templateUrl: './edit-subscription.component.html',
    styleUrls: ['./edit-subscription.component.scss']
})
export class EditSubscriptionComponent {

    subscription?: Subscription;

    constructor(
        private subscriptionsService: SubscriptionsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.route.params.subscribe(params => {
            this.subscriptionsService.getSubscription(params['id']).subscribe((subscription: Subscription) => {
                this.subscription = subscription;
            });
        });
    }

    success() {
        this.router.navigateByUrl("/admin/subscriptions");
    }

    cancel() {
        this.router.navigateByUrl("/admin/subscriptions");
    }
}
