import { Component, Input } from '@angular/core';
import { EventsSubscription } from '../../../shared/data/subscription';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
    @Input() subscription: EventsSubscription | undefined;

    constructor(public activeModal: NgbActiveModal, private router: Router) {
    }

    ngOnInit(): void {
    }

    success() {
        this.activeModal.close();
        this.router.navigateByUrl("/user/subscriptions/events");
    }

    cancel() {
        this.activeModal.dismiss();
    }
}
