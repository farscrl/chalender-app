import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionsService } from '../../../shared/services/subscriptions.service';

@Component({
    selector: 'app-deactivate-subscription',
    templateUrl: './deactivate-subscription.component.html',
    styleUrls: ['./deactivate-subscription.component.scss']
})
export class DeactivateSubscriptionComponent {

    subscriptionId?: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private subscriptionsService: SubscriptionsService,
    ) {
        this.route.params.subscribe(params => {
            this.subscriptionId = params['id'];

            if (!this.subscriptionId) {
                this.router.navigateByUrl("/");
            }
        });
    }

    disableSubscription() {
        this.subscriptionsService.disableSubscription(this.subscriptionId!).subscribe(() => {
            this.router.navigateByUrl("/");
        });
    }

    cancel() {
        this.router.navigateByUrl("/");
    }
}
