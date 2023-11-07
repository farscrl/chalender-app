import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Subscription } from '../../../shared/data/subscription';

@Component({
    selector: 'app-new-subscription',
    templateUrl: './new-subscription.component.html',
    styleUrls: ['./new-subscription.component.scss']
})
export class NewSubscriptionComponent implements OnInit {
    @Input() subscription: Subscription | undefined;

    constructor(public activeModal: NgbActiveModal, private router: Router) {
    }

    ngOnInit(): void {
    }

    success() {
        this.activeModal.close();
        this.router.navigateByUrl("/admin/subscriptions");
    }

    cancel() {
        this.activeModal.dismiss();
    }
}
