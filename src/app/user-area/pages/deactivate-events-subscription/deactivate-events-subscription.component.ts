import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsSubscriptionsService } from '../../../shared/services/events-subscriptions.service';

@Component({
    selector: 'app-deactivate-events-subscription',
    templateUrl: './deactivate-events-subscription.component.html',
    styleUrls: ['./deactivate-events-subscription.component.scss']
})
export class DeactivateEventsSubscriptionComponent {

    subscriptionId?: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private subscriptionsService: EventsSubscriptionsService,
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
