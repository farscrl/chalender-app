import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDatepicker, NgbDateStruct, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotLoggedInComponent } from '../../modals/not-logged-in/not-logged-in.component';
import { Router } from '@angular/router';
import { NewSubscriptionComponent } from '../../modals/new-subscription/new-subscription.component';
import { Genre, Region } from '../../../shared/data/static-data';
import { StaticDataService } from '../../../shared/services/static-data.service';
import { EventsFilterService } from '../../../shared/services/events-filter.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { Subscription } from '../../../shared/data/subscription';

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

    @ViewChild('datepicker') datepicker!: NgbDatepicker;

    private selectedGenresSubscription: any;
    private selectedRegionsSubscription: any;
    private selectedStartDateSubscription: any;
    private searchTermSubscription: any;

    constructor(
        private staticData: StaticDataService,
        public eventsFilterService: EventsFilterService,
        private authService: AuthenticationService,
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

        if (this.datepicker) {
            this.datepicker.navigateTo(this.calendar.getToday());
        }
    }

    createSubscription() {
        if (!this.authService.isLoggedIn()) {
            const modalRef = this.modalService.open(NotLoggedInComponent, {size: 'md'});

            modalRef.closed.subscribe(reason => {
                if (reason === 'login') {
                    this.hideFilterIfNeeded.emit();
                    this.router.navigateByUrl("/user/login");
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

    close() {
        this.hideFilterIfNeeded.emit();
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
