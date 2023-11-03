import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { StaticDataService } from "../../../services/static-data.service";
import { Genre, Region } from "../../../data/static-data";
import { EventsFilterService } from "../../../services/events-filter.service";
import { AuthenticationService } from '../../../services/authentication.service';
import { NotLoggedInComponent } from '../../modals/not-logged-in/not-logged-in.component';
import { Router } from '@angular/router';
import { Subscription } from '../../../data/subscription';
import { SubscriptionsService } from '../../../services/subscriptions.service';
import { NewSubscriptionComponent } from '../../modals/new-subscription/new-subscription.component';

@Component({
    selector: 'app-event-filter',
    templateUrl: './event-filter.component.html',
    styleUrls: ['./event-filter.component.scss']
})
export class EventFilterComponent implements OnInit, OnDestroy {

    genres: Genre[] = [];
    regions: Region[] = [];

    selectedRegionIds: number[] = [];
    selectedGenreIds: number[] = [];
    selectedStartDate: NgbDateStruct;
    searchTerm: string = '';

    @Output()
    hideFilterIfNeeded: EventEmitter<void> = new EventEmitter<void>();

    private selectedGenresSubscription: any;
    private selectedRegionsSubscription: any;
    private selectedStartDateSubscription: any;
    private searchTermSubscription: any;

    constructor(
        private staticData: StaticDataService,
        private eventsFilterService: EventsFilterService,
        private authService: AuthenticationService,
        private subscriptionsService: SubscriptionsService,
        private calendar: NgbCalendar,
        private modalService: NgbModal,
        private router: Router,
    ) {
        this.selectedStartDate = this.calendar.getToday();
    }

    ngOnInit(): void {
        this.loadStaticData();
        this.loadCurrentFilters();
    }

    ngOnDestroy(): void {
        if (this.selectedGenresSubscription) {
            this.selectedGenresSubscription.unsubscribe();
        }
        if (this.selectedRegionsSubscription) {
            this.selectedRegionsSubscription.unsubscribe();
        }
        if (this.selectedStartDateSubscription) {
            this.selectedStartDateSubscription.unsubscribe();
        }
        if (this.searchTermSubscription) {
            this.searchTermSubscription.unsubscribe();
        }
    }

    toggleRegion(regionId: number) {
        this.eventsFilterService.toggleRegion(regionId);
    }

    toggleGenre(genreId: number) {
        this.eventsFilterService.toggleGenre(genreId);
    }

    dateSelected(date: NgbDate) {
        this.eventsFilterService.setStartDate(date);
    }

    searchTermUpdated() {
        this.eventsFilterService.setSearchterm(this.searchTerm);
    }

    resetFilters() {
        this.eventsFilterService.resetFilters();
        this.hideFilterIfNeeded.emit();
    }

    createSubscription() {
        if (!this.authService.isLoggedIn()) {
            const modalRef = this.modalService.open(NotLoggedInComponent, {size: 'md'});

            modalRef.closed.subscribe(reason => {
                if (reason === 'login') {
                    this.hideFilterIfNeeded.emit();
                    this.router.navigateByUrl("/u/login");
                }
            });

            return;
        }

        const subscription = new Subscription();
        subscription.genres = this.genres.filter(genre => this.selectedGenreIds.includes(genre.id));
        subscription.regions = this.regions.filter(region => this.selectedRegionIds.includes(region.id));
        subscription.searchTerm = this.searchTerm;

        const modalRef = this.modalService.open(NewSubscriptionComponent, {size: 'lg'});
        modalRef.componentInstance.subscription = subscription;
    }

    private loadStaticData() {
        this.staticData.getGenres().subscribe(genres => {
            if (!genres) {
                this.genres = [];
                return;
            }

            this.genres = genres;
        });

        this.staticData.getRegions().subscribe(regions => {
            if (!regions) {
                this.regions = [];
                return;
            }
            this.regions = regions;
        });
    }

    private loadCurrentFilters() {
        this.selectedGenresSubscription = this.eventsFilterService.getGenresObservable().subscribe(genres => {
            this.selectedGenreIds = genres;
        });
        this.selectedRegionsSubscription = this.eventsFilterService.getRegionsObservable().subscribe(regions => {
            this.selectedRegionIds = regions;
        });
        this.selectedStartDateSubscription = this.eventsFilterService.getStartDateObservable().subscribe(startDate => {
            this.selectedStartDate = startDate;
        });
        this.searchTermSubscription = this.eventsFilterService.getSearchTermObservable().subscribe(searchTerm => {
            this.searchTerm = searchTerm;
        });
    }
}
