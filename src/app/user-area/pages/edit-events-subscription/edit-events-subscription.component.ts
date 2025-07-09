import { Component } from '@angular/core';
import { EventsSubscription } from '../../../shared/data/subscription';
import { EventsSubscriptionsService } from '../../../shared/services/events-subscriptions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsSubscriptionComponent } from '../../../shared/components/forms/events-subscription/events-subscription.component';

@Component({
    selector: 'app-edit-events-subscription',
    templateUrl: './edit-events-subscription.component.html',
    styleUrls: ['./edit-events-subscription.component.scss'],
    imports: [EventsSubscriptionComponent]
})
export class EditEventsSubscriptionComponent {

    subscription?: EventsSubscription;

    constructor(
        private subscriptionsService: EventsSubscriptionsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.route.params.subscribe(params => {
            this.subscriptionsService.getSubscription(params['id']).subscribe((subscription: EventsSubscription) => {
                this.subscription = subscription;
            });
        });
    }

    success() {
        this.router.navigateByUrl("/user/subscriptions/events");
    }

    cancel() {
        this.router.navigateByUrl("/user/subscriptions/events");
    }
}
