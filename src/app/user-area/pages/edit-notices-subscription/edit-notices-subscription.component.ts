import { Component } from '@angular/core';
import { NoticesSubscription } from '../../../shared/data/subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsSubscriptionsService } from '../../../shared/services/notifications-subscriptions.service';

@Component({
    selector: 'app-edit-notices-subscription',
    templateUrl: './edit-notices-subscription.component.html',
    styleUrls: ['./edit-notices-subscription.component.scss']
})
export class EditNoticesSubscriptionComponent {

    subscription?: NoticesSubscription;

    constructor(
        private subscriptionsService: NotificationsSubscriptionsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.route.params.subscribe(params => {
            this.subscriptionsService.getSubscription(params['id']).subscribe((subscription: NoticesSubscription) => {
                this.subscription = subscription;
            });
        });
    }

    success() {
        this.router.navigateByUrl("/user/subscriptions/notices");
    }

    cancel() {
        this.router.navigateByUrl("/user/subscriptions/notices");
    }
}
