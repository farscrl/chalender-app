import { Component, Input } from '@angular/core';
import { NoticesSubscription } from '../../../shared/data/subscription';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-notices-subscription',
    templateUrl: './new-notices-subscription.component.html',
    styleUrls: ['./new-notices-subscription.component.scss'],
    standalone: false
})
export class NewNoticesSubscriptionComponent {
    @Input() subscription: NoticesSubscription | undefined;

    constructor(public activeModal: NgbActiveModal, private router: Router) {
    }

    ngOnInit(): void {
    }

    success() {
        this.activeModal.close();
        this.router.navigateByUrl("/user/subscriptions/notices");
    }

    cancel() {
        this.activeModal.dismiss();
    }
}
