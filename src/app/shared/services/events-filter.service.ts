import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, Observable, Subject } from "rxjs";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Page } from '../data/page';
import { EventFilter, EventFilterUrlParams, EventLookup } from '../data/event';
import { EventsService } from './events.service';
import * as dayjs from 'dayjs';
import { UrlUtil } from '../utils/url.util';
import { IframeService } from '../../services/iframe.service';

@Injectable({
    providedIn: 'root'
})
export class EventsFilterService {
    public selectedView: 'cards' | 'list' = 'cards';
    public numberOfFilters = 0;

    public isFilterCollapsed = false;

    public isSearching = false;

    private selectedRegions = new BehaviorSubject<number[]>([]);
    private selectedGenres = new BehaviorSubject<number[]>([]);
    private selectedStartDate = new BehaviorSubject<NgbDateStruct>(this.calendar.getToday());
    private searchTerm = new BehaviorSubject<string>('');
    private searchResults = new Subject<EventLookup[]>();
    private moreSearchResults = new Subject<EventLookup[]>();
    private urlParams = new BehaviorSubject<EventFilterUrlParams>(new EventFilterUrlParams());

    private pageSize = 30;
    private page = 0;
    hasMorePages = true;
    private eventFilter = new EventFilter();
    private searchSubject = new Subject<void>();

    constructor(
        private eventsService: EventsService,
        private calendar: NgbCalendar,
        private urlUtil: UrlUtil,
        private iframeService: IframeService,
    ) {
        this.resetFilters();
        this.searchSubject
            .pipe(debounceTime(50))
            .subscribe(() => this.debouncedSearch());
    }

    search() {
        this.recalculateNumberOfFilters();
        this.updateUrlParams();
        this.page = 0;
        this.hasMorePages = true;
        this.executeSearch();
    }

    loadNextPage() {
        if (this.hasMorePages) {
            this.page++;
            this.executeSearch();
        }
    }

    private executeSearch() {
        this.isSearching = true;
        this.searchSubject.next();
    }

    private debouncedSearch() {
        this.eventsService.getEvents(this.eventFilter, this.page, this.pageSize).subscribe((page: Page<EventLookup>) => {
            if (page.first) {
                this.searchResults.next(page.content);
            } else {
                this.moreSearchResults.next(page.content);
            }
            if (page.last) {
                this.hasMorePages = false;
            }
            this.isSearching = false;
        });
    }

    resetFilters() {
        this.selectedRegions.next([]);
        this.selectedGenres.next([]);
        this.selectedStartDate.next(this.calendar.getToday());
        this.searchTerm.next('');

        this.eventFilter = new EventFilter();
        this.search();
    }

    resetDateFilter() {
        this.setStartDate(this.calendar.getToday());
    }

    toggleRegion(regionId: number) {
        const regions = this.selectedRegions.getValue();
        if (regions.includes(regionId)) {
            const index = regions.indexOf(regionId);
            regions.splice(index, 1);
        } else {
            regions.push(regionId);
        }
        this.selectedRegions.next(regions);
        this.eventFilter.regions = regions;
        this.search();
    }

    toggleGenre(genreId: number) {
        const genres = this.selectedGenres.getValue();
        if (genres.includes(genreId)) {
            const index = genres.indexOf(genreId);
            genres.splice(index, 1);
        } else {
            genres.push(genreId);
        }
        this.selectedGenres.next(genres);
        this.eventFilter.genres = genres;
        this.search();
    }

    setSearchterm(searchTerm: string) {
        this.searchTerm.next(searchTerm);
        this.eventFilter.searchTerm = searchTerm;
        this.search();
    }

    setStartDate(startDate: NgbDateStruct) {
        this.selectedStartDate.next(startDate);
        this.eventFilter.startDate = dayjs().set('year', startDate.year).set('month', startDate.month - 1).set('date', startDate.day).format('DD-MM-YYYY');
        this.search();
    }

    getRegionsObservable(): Observable<number[]> {
        return this.selectedRegions.asObservable();
    }

    getGenresObservable(): Observable<number[]> {
        return this.selectedGenres.asObservable();
    }

    getStartDateObservable(): Observable<NgbDateStruct> {
        return this.selectedStartDate.asObservable();
    }

    getSearchTermObservable(): Observable<string> {
        return this.searchTerm.asObservable();
    }

    getSearchResultsObservable(): Observable<EventLookup[]> {
        return this.searchResults.asObservable();
    }

    getSearchMoreResultsObservable(): Observable<EventLookup[]> {
        return this.moreSearchResults.asObservable();
    }

    getEventFilterUrlParamsObservable(): Observable<EventFilterUrlParams> {
        return this.urlParams.asObservable();
    }

    setSelectedView(view: 'cards' | 'list') {
        this.selectedView = view;
        this.updateUrlParams();
    }

    private recalculateNumberOfFilters() {
        this.numberOfFilters = 0;

        if (this.selectedGenres.getValue().length > 0) {
            this.numberOfFilters++;
        }

        if (this.selectedRegions.getValue().length > 0) {
            this.numberOfFilters++;
        }

        if (this.selectedStartDate.getValue().year !== new Date().getFullYear()
            || this.selectedStartDate.getValue().month !== new Date().getMonth() + 1
            || this.selectedStartDate.getValue().day !== new Date().getDate()) {
            this.numberOfFilters++;
        }

        if (this.searchTerm.getValue().length > 0) {
            this.numberOfFilters++;
        }
    }

    private updateUrlParams() {
        const params = this.urlUtil.calculateUrl(this.eventFilter, this.selectedView);
        this.urlParams.next(params);
    }
}
