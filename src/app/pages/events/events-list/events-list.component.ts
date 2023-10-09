import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventsService } from "../../../services/events.service";
import { EventFilter, EventLookup } from "../../../data/event";
import * as dayjs from 'dayjs'
import { rmLocale } from "../../../utils/day-js-locale";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EventFilterComponent } from "../../../components/events/event-filter/event-filter.component";
import { EventsFilterService } from "../../../services/events-filter.service";
import { Page } from "../../../data/page";
import { OnAttach, OnDetach } from '../../../routing/app-router-outlet.directive';

const LOCALSTORAGE_EVENTS_LIST_SCROLL_POSITION = 'events-scroll-position';

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, OnDestroy, OnAttach, OnDetach {

    public events: EventLookup[] = [];
    public categorizedEvents: { date: string, formattedDate: string, events: EventLookup[] }[] = [];
    private dates: string[] = [];

    private selectedGenresSubscription: any;
    private selectedRegionsSubscription: any;
    private selectedStartDateSubscription: any;
    private searchTermSubscription: any;

    private pageSize = 10;
    private page = 0;
    hasMorePages = true;
    private eventFilter = new EventFilter();

    constructor(private eventsService: EventsService, private modalService: NgbModal, private eventsFilterService: EventsFilterService) {
    }

    ngOnInit() {
        const customParseFormat = require('dayjs/plugin/customParseFormat');
        dayjs.extend(customParseFormat);
        dayjs.locale('rm', rmLocale);

        this.search();
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

    onAttach(): void {
        const scrollPosition = +(localStorage.getItem(LOCALSTORAGE_EVENTS_LIST_SCROLL_POSITION) || 0);
        window.scrollTo({
            top: scrollPosition,
            behavior: 'instant',
        });
    }

    onDetach(): void {
        localStorage.setItem(LOCALSTORAGE_EVENTS_LIST_SCROLL_POSITION, window.scrollY.toString());
    }

    openFilter(): void {
        const modalRef = this.modalService.open(EventFilterComponent, {size: 'lg'});
    }

    search() {
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
        // TODO: debounce
        this.eventsService.getEvents(this.eventFilter, this.page, this.pageSize).subscribe((page: Page<EventLookup>) => {
            if (page.first) {
                this.events = page.content;
            } else {
                this.events = [...this.events, ...page.content];
            }
            if (page.last) {
                this.hasMorePages = false;
            }
            this.groupEvents();
        });
    }

    private groupEvents(): void {
        this.dates = [...new Set(this.events.map(event => event.date))];
        const sortedDates = this.dates.sort((a, b) => {
            const dateA = dayjs(a, "DD-MM-YYYY");
            const dateB = dayjs(b, "DD-MM-YYYY");
            if (dateA.isBefore(dateB)) {
                return -1;
            }
            if (dateA.isAfter(dateB)) {
                return 1;
            }
            return 0;
        });
        this.categorizedEvents = sortedDates.map(date => {
            const dateObj = dayjs(date, "DD-MM-YYYY");
            let formattedDate = dateObj.format('dddd[, ils ]D[ da ]MMMM YYYY');
            if (dateObj.month() === 3 || dateObj.month() === 7) {
                formattedDate = dateObj.format('dddd[, ils ]D[ d’]MMMM YYYY');
            }

            return {
                date: date,
                formattedDate: formattedDate,
                events: this.events.filter(e => e.date === date),
            }
        });
    }

    private loadCurrentFilters() {
        this.selectedGenresSubscription = this.eventsFilterService.getGenresObservable().subscribe(genres => {
            this.eventFilter.genres = genres;
            this.search();
        });
        this.selectedRegionsSubscription = this.eventsFilterService.getRegionsObservable().subscribe(regions => {
            this.eventFilter.regions = regions;
            this.search();
        });
        this.selectedStartDateSubscription = this.eventsFilterService.getStartDateObservable().subscribe(startDate => {
            this.eventFilter.startDate = dayjs().set('year', startDate.year).set('month', startDate.month - 1).set('date', startDate.day).format('DD-MM-YYYY');
            this.search();
        });
        this.searchTermSubscription = this.eventsFilterService.getSearchTermObservable().subscribe(searchTerm => {
            this.eventFilter.searchTerm = searchTerm;
            this.search();
        });
    }
}
