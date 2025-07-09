import { Component } from '@angular/core';
import { EventsSubscription } from '../../../shared/data/subscription';
import { EventsSubscriptionsService } from '../../../shared/services/events-subscriptions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'app-my-events-subscriptions',
    templateUrl: './my-events-subscriptions.component.html',
    styleUrls: ['./my-events-subscriptions.component.scss'],
    standalone: false
})
export class MyEventsSubscriptionsComponent {
    subscriptions: EventsSubscription[] = [];

    isLoading: boolean = false;

    constructor(
        private subscriptionsService: EventsSubscriptionsService,
        private modalService: NgbModal,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.loadData();
    }

    getGenres(subscription: EventsSubscription): string {
        return subscription.genres.map(genre => genre.name).join(', ');
    }

    getRegions(subscription: EventsSubscription): string {
        return subscription.regions.map(region => region.name).join(', ');
    }

    createNew() {
        this.router.navigateByUrl("/user/subscriptions/events/new");
    }

    edit(subscription: EventsSubscription) {
        this.router.navigateByUrl('/user/subscriptions/events/' + subscription.id);
    }

    delete(subscription: EventsSubscription) {
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
