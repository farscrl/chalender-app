import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { StaticDataService } from "../../../services/static-data.service";
import { Genre, Region } from "../../../data/static-data";
import { EventsFilterService } from "../../../services/events-filter.service";

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


    constructor(private staticData: StaticDataService, private eventsFilterService: EventsFilterService, private calendar: NgbCalendar) {
        // this.startDate = this.calendar.getToday();
        this.selectedStartDate = {year: 2023, month: 4, day: 1}; // TODO: change to today
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
        this.eventsFilterService.selectedStartDate.next(date);
    }

    searchTermUpdated() {
        this.eventsFilterService.searchTerm.next(this.searchTerm);
    }

    resetFilters() {
        this.eventsFilterService.resetFilters();
        this.hideFilterIfNeeded.emit();
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
