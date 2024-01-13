import { Component } from '@angular/core';
import { NoticesSubscription } from '../../../shared/data/subscription';
import { Router } from '@angular/router';
import { NotificationsSubscriptionsService } from '../../../shared/services/notifications-subscriptions.service';

@Component({
    selector: 'app-my-notices-subscriptions',
    templateUrl: './my-notices-subscriptions.component.html',
    styleUrls: ['./my-notices-subscriptions.component.scss']
})
export class MyNoticesSubscriptionsComponent {
    subscriptions: NoticesSubscription[] = [];

    isLoading: boolean = false;

    constructor(
        private subscriptionsService: NotificationsSubscriptionsService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.loadData();
    }

    createNew() {
        this.router.navigateByUrl("/user/subscriptions/notices/new");
    }

    edit(subscription: NoticesSubscription) {
        this.router.navigateByUrl('/user/subscriptions/notices/' + subscription.id);
    }

    delete(subscription: NoticesSubscription) {
        this.subscriptionsService.deleteSubscription(subscription.id!).subscribe(() => {
            this.loadData();
        });
    }

    private loadData() {
        this.isLoading = true;
        this.subscriptionsService.getSubscriptions().subscribe(subscriptions => {
            this.subscriptions = subscriptions;
            this.isLoading = false;
        });
    }
}
