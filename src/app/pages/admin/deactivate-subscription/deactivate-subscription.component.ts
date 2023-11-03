import { Component } from '@angular/core';
import { SubscriptionsService } from '../../../services/subscriptions.service';
import { ActivatedRoute, Router } from '@angular/router';

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
