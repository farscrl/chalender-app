import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SubscriptionsService } from '../../../services/subscriptions.service';
import { Subscription } from '../../../data/subscription';

@Component({
    selector: 'app-my-subscriptions',
    templateUrl: './my-subscriptions.component.html',
    styleUrls: ['./my-subscriptions.component.scss']
})
export class MySubscriptionsComponent {
    subscriptions: Subscription[] = [];

    isLoading: boolean = false;

    constructor(
        private subscriptionsService: SubscriptionsService,
        private modalService: NgbModal,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.loadData();
    }

    getGenres(subscription: Subscription): string {
        return subscription.genres.map(genre => genre.name).join(', ');
    }

    getRegions(subscription: Subscription): string {
        return subscription.regions.map(region => region.name).join(', ');
    }

    edit(subscription: Subscription) {
        this.router.navigateByUrl('/admin/subscriptions/' + subscription.id);
    }

    delete(subscription: Subscription) {
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
