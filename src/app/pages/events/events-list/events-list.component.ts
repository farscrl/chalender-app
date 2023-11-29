import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OnAttach, OnDetach } from '../../../routing/app-router-outlet.directive';
import * as dayjs from 'dayjs';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { EventsFilterService } from '../../../shared/services/events-filter.service';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { rmLocale } from '../../../shared/utils/day-js-locale';
import { first, Subscription } from 'rxjs';
import { IframeService } from '../../../services/iframe.service';

const LOCALSTORAGE_EVENTS_LIST_SCROLL_POSITION = 'events-scroll-position';

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, OnAttach, OnDetach, OnDestroy {

    @ViewChild(NgbCollapse) filterCollapsable!: NgbCollapse;

    private eventFilterUrlParamSubscription?: Subscription;

    constructor(
        public eventsFilterService: EventsFilterService,
        private notificationsService: NotificationsService,
        private router: Router,
        private route: ActivatedRoute,
        public iframeService: IframeService,
    ) {
        router.events.subscribe(
            (event) => {
                if (event instanceof NavigationStart) {
                    // hide notifications on page leave
                    if (this.router.url === '/') {
                        this.notificationsService.clearMessages();
                    }
                }
            });
    }

    ngOnInit() {
        const customParseFormat = require('dayjs/plugin/customParseFormat');
        dayjs.extend(customParseFormat);
        dayjs.locale('rm', rmLocale);

        this.eventsFilterService.search();

        this.route.queryParams.pipe(first()).subscribe(params => {
            if (!!params['regions']) {
                const regions: number[] = params['regions'].split(",");
                regions.forEach(regionId => {
                    this.eventsFilterService.toggleRegion(+regionId);
                });
            }

            if (!!params['genres']) {
                const genres: number[] = params['genres'].split(",");
                genres.forEach(genreId => {
                    this.eventsFilterService.toggleRegion(+genreId);
                });
            }

            if (!!params['startDate']) {
                // this.eventsFilterService.setStartDate()
            }

            if (!!params['searchTerm']) {
                this.eventsFilterService.setSearchterm(params['searchTerm'])
            }

            this.eventFilterUrlParamSubscription = this.eventsFilterService.getEventFilterUrlParamsObservable().subscribe((params) => {
                console.log(params);
                this.router.navigate(
                    [],
                    {
                        relativeTo: this.route,
                        queryParams: params,
                        queryParamsHandling: '',
                    }
                );
            });
        });
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

    ngOnDestroy() {
        if (this.eventFilterUrlParamSubscription) {
            this.eventFilterUrlParamSubscription.unsubscribe();
        }
    }

    toggleFilter() {
        this.filterCollapsable.toggle();
    }
}
