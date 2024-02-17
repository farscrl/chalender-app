import { Injectable } from '@angular/core';
import { EventFilterUrlParams } from '../data/event';
import { BehaviorSubject, debounceTime, Observable, Subject } from 'rxjs';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { UrlUtil } from '../utils/url.util';
import { IframeService } from '../../services/iframe.service';
import { Page } from '../data/page';
import { NoticesService } from './notices.service';
import { NoticeBoardFilter, NoticeBoardItemDto } from '../data/notices';

@Injectable({
    providedIn: 'root'
})
export class NoticesFilterService {
    public selectedView: 'cards' | 'list' = 'cards';
    public numberOfFilters = 0;

    public isFilterCollapsed = false;

    public isSearching = false;

    private selectedGenres = new BehaviorSubject<number[]>([]);
    private searchTerm = new BehaviorSubject<string>('');
    private searchResults = new BehaviorSubject<NoticeBoardItemDto[]>([]);
    private moreSearchResults = new BehaviorSubject<NoticeBoardItemDto[]>([]);
    private urlParams = new BehaviorSubject<EventFilterUrlParams>(new EventFilterUrlParams());

    private pageSize = 30;
    private page = 0;
    hasMorePages = true;
    private noticeBoardFilter = new NoticeBoardFilter();
    private searchSubject = new Subject<void>();

    constructor(
        private noticesService: NoticesService,
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
        this.noticesService.getNotices(this.noticeBoardFilter, this.page, this.pageSize).subscribe((page: Page<NoticeBoardItemDto>) => {
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
        this.selectedGenres.next([]);
        this.searchTerm.next('');

        this.noticeBoardFilter = new NoticeBoardFilter();
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
        this.noticeBoardFilter.genres = genres;
        this.search();
    }

    setSearchterm(searchTerm: string) {
        this.searchTerm.next(searchTerm);
        this.noticeBoardFilter.searchTerm = searchTerm;
        this.search();
    }

    getGenresObservable(): Observable<number[]> {
        return this.selectedGenres.asObservable();
    }

    getSearchTermObservable(): Observable<string> {
        return this.searchTerm.asObservable();
    }

    getSearchResultsObservable(): Observable<NoticeBoardItemDto[]> {
        return this.searchResults.asObservable();
    }

    getSearchMoreResultsObservable(): Observable<NoticeBoardItemDto[]> {
        return this.moreSearchResults.asObservable();
    }

    getNoticesFilterUrlParamsObservable(): Observable<EventFilterUrlParams> {
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

        if (this.searchTerm.getValue().length > 0) {
            this.numberOfFilters++;
        }
    }

    private updateUrlParams() {
        const params = this.urlUtil.calculateUrl(this.noticeBoardFilter, this.selectedView);
        this.urlParams.next(params);
    }
}
