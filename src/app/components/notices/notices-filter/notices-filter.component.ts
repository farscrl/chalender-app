import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Genre, Region } from '../../../shared/data/static-data';
import { NgbCalendar, NgbDatepicker, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Subscription as RxSubscription } from 'rxjs/internal/Subscription';
import { StaticDataService } from '../../../shared/services/static-data.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { NotLoggedInComponent } from '../../modals/not-logged-in/not-logged-in.component';
import { EventsSubscription } from '../../../shared/data/subscription';
import { NoticesFilterService } from '../../../shared/services/notices-filter.service';
import {
    NewNoticesSubscriptionComponent
} from '../../modals/new-notices-subscription/new-notices-subscription.component';

@Component({
    selector: 'app-notices-filter',
    templateUrl: './notices-filter.component.html',
    styleUrls: ['./notices-filter.component.scss']
})
export class NoticesFilterComponent {

    genres: Genre[] = [];
    regions: Region[] = [];

    selectedRegionIds: number[] = [];
    selectedGenreIds: number[] = [];
    selectedStartDate: NgbDateStruct;
    searchTerm: string = '';

    @Input()
    resetFilterCommand?: Observable<void>;

    @Input()
    createSubscriptionCommand?: Observable<void>;

    @Output()
    hideFilterIfNeeded: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('datepicker') datepicker!: NgbDatepicker;

    private selectedGenresSubscription?: RxSubscription;
    private selectedRegionsSubscription?: RxSubscription;
    private selectedStartDateSubscription?: RxSubscription;
    private searchTermSubscription?: RxSubscription;

    private resetFilterCommandSubscription?: RxSubscription;
    private createSubscriptionCommandSubscription?: RxSubscription;

    constructor(
        private staticData: StaticDataService,
        public noticesFilterService: NoticesFilterService,
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

        if (this.resetFilterCommand) {
            this.resetFilterCommandSubscription = this.resetFilterCommand.subscribe(() => {
                this.resetFilters();
            });
        }
        if (this.createSubscriptionCommand) {
            this.createSubscriptionCommandSubscription = this.createSubscriptionCommand.subscribe(() => {
                this.createSubscription();
            });
        }
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
        if (this.resetFilterCommandSubscription) {
            this.resetFilterCommandSubscription.unsubscribe();
        }
        if (this.createSubscriptionCommandSubscription) {
            this.createSubscriptionCommandSubscription.unsubscribe();
        }
    }

    toggleGenre(genreId: number) {
        this.noticesFilterService.toggleGenre(genreId);
    }

    searchTermUpdated() {
        this.noticesFilterService.setSearchterm(this.searchTerm);
    }

    resetFilters() {
        this.noticesFilterService.resetFilters();
        this.hideFilterIfNeeded.emit();

        if (this.datepicker) {
            this.datepicker.navigateTo(this.calendar.getToday());
        }
    }

    createSubscription() {
        if (!this.authService.isLoggedIn()) {
            const modalRef = this.modalService.open(NotLoggedInComponent, {size: 'md', centered: true});

            modalRef.closed.subscribe(reason => {
                if (reason === 'login') {
                    this.hideFilterIfNeeded.emit();
                    this.router.navigateByUrl("/user/login");
                }
            });

            return;
        }

        const subscription = new EventsSubscription();
        subscription.genres = this.genres.filter(genre => this.selectedGenreIds.includes(genre.id));
        subscription.regions = this.regions.filter(region => this.selectedRegionIds.includes(region.id));
        subscription.searchTerm = this.searchTerm;

        const modalRef = this.modalService.open(NewNoticesSubscriptionComponent, {size: 'lg', centered: true});
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
        this.selectedGenresSubscription = this.noticesFilterService.getGenresObservable().subscribe(genres => {
            this.selectedGenreIds = genres;
        });
        this.searchTermSubscription = this.noticesFilterService.getSearchTermObservable().subscribe(searchTerm => {
            this.searchTerm = searchTerm;
        });
    }
}
