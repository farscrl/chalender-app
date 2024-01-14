import { Component, Input } from '@angular/core';
import { EventsSubscription } from '../../../shared/data/subscription';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-events-subscription',
    templateUrl: './new-events-subscription.component.html',
    styleUrls: ['./new-events-subscription.component.scss']
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
