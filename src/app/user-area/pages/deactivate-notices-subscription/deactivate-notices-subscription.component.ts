import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsSubscriptionsService } from '../../../shared/services/notifications-subscriptions.service';

@Component({
    selector: 'app-deactivate-notices-subscription',
    templateUrl: './deactivate-notices-subscription.component.html',
    styleUrls: ['./deactivate-notices-subscription.component.scss']
})
export class DeactivateNoticesSubscriptionComponent {

    subscriptionId?: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private subscriptionsService: NotificationsSubscriptionsService,
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
