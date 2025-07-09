import { Component } from '@angular/core';
import { EventsSubscription } from '../../../shared/data/subscription';
import { Router } from '@angular/router';
import { EventsSubscriptionComponent } from '../../../shared/components/forms/events-subscription/events-subscription.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-new-events-subscription',
    templateUrl: './new-events-subscription.component.html',
    styleUrls: ['./new-events-subscription.component.scss'],
    imports: [EventsSubscriptionComponent, TranslatePipe]
})
export class NewEventsSubscriptionComponent {
    subscription: EventsSubscription;

    constructor(private router: Router) {
        this.subscription = new EventsSubscription();
        this.subscription.id = 'xxx';
    }

    success() {
        this.router.navigateByUrl("/user/subscriptions/events");
    }

    cancel() {
        this.router.navigateByUrl("/user/subscriptions/events");
    }
}
