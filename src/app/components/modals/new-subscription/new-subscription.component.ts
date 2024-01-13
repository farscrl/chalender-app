import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { EventsSubscription } from '../../../shared/data/subscription';

@Component({
    selector: 'app-new-subscription',
    templateUrl: './new-subscription.component.html',
    styleUrls: ['./new-subscription.component.scss']
})
export class NewSubscriptionComponent implements OnInit {
    @Input() subscription: EventsSubscription | undefined;

    constructor(public activeModal: NgbActiveModal, private router: Router) {
    }

    ngOnInit(): void {
    }

    success() {
        this.activeModal.close();
        this.router.navigateByUrl("/user/subscriptions");
    }

    cancel() {
        this.activeModal.dismiss();
    }
}
