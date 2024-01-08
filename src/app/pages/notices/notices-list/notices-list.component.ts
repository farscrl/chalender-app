import { Component, ViewChild } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { first, Subject, Subscription } from 'rxjs';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { IframeService } from '../../../services/iframe.service';
import * as dayjs from 'dayjs';
import { rmLocale } from '../../../shared/utils/day-js-locale';
import { NoticesFilterService } from '../../../shared/services/notices-filter.service';

const LOCALSTORAGE_NOTICES_LIST_SCROLL_POSITION = 'notices-scroll-position';

@Component({
    selector: 'app-notices-list',
    templateUrl: './notices-list.component.html',
    styleUrls: ['./notices-list.component.scss']
})
export class NoticesListComponent {
    @ViewChild(NgbCollapse) filterCollapsable!: NgbCollapse;

    resetFiltersCommandSubject: Subject<void> = new Subject<void>();
    createSubscriptionCommandSubject: Subject<void> = new Subject<void>();

    private noticesFilterUrlParamSubscription?: Subscription;

    constructor(
        public noticesFilterService: NoticesFilterService,
        private notificationsService: NotificationsService,
        private router: Router,
        private route: ActivatedRoute,
        public iframeService: IframeService,
    ) {
        router.events.subscribe(
            (event) => {
                if (event instanceof NavigationStart) {
                    // hide notifications on page leave
                    if (this.router.url === '/notices/') {
                        this.notificationsService.clearMessages();
                    }
                }
            });
    }

    ngOnInit() {
        const customParseFormat = require('dayjs/plugin/customParseFormat');
        dayjs.extend(customParseFormat);
        dayjs.locale('rm', rmLocale);

        this.noticesFilterService.search();

        this.route.queryParams.pipe(first()).subscribe(params => {
            if (!!params['genres']) {
                const genres: number[] = params['genres'].split(",");
                genres.forEach(genreId => {
                    this.noticesFilterService.toggleGenre(+genreId);
                });
            }

            if (!!params['searchTerm']) {
                this.noticesFilterService.setSearchterm(params['searchTerm'])
            }

            this.noticesFilterUrlParamSubscription = this.noticesFilterService.getNoticesFilterUrlParamsObservable().subscribe((params) => {
                /*this.router.navigate(
                    [],
                    {
                        relativeTo: this.route,
                        queryParams: params,
                        queryParamsHandling: '',
                    }
                );*/
            });
        });
    }

    onAttach(): void {
        const scrollPosition = +(localStorage.getItem(LOCALSTORAGE_NOTICES_LIST_SCROLL_POSITION) || 0);
        window.scrollTo({
            top: scrollPosition,
            behavior: 'instant',
        });
        this.noticesFilterUrlParamSubscription = this.noticesFilterService.getNoticesFilterUrlParamsObservable().pipe(first()).subscribe((params) => {
            /*this.router.navigate(
                [],
                {
                    relativeTo: this.route,
                    queryParams: params,
                    queryParamsHandling: '',
                }
            );*/
        });
    }

    onDetach(): void {
        localStorage.setItem(LOCALSTORAGE_NOTICES_LIST_SCROLL_POSITION, window.scrollY.toString());
    }

    ngOnDestroy() {
        if (this.noticesFilterUrlParamSubscription) {
            this.noticesFilterUrlParamSubscription.unsubscribe();
        }
    }

    toggleFilter() {
        this.filterCollapsable.toggle();
    }

    resetFilters() {
        this.resetFiltersCommandSubject.next();
    }

    createSubscription() {
        this.createSubscriptionCommandSubject.next();
    }
}
