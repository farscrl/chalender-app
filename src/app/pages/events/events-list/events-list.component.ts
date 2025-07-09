import { Component, OnDestroy, OnInit } from '@angular/core';
import { OnAttach, OnDetach } from '../../../routing/app-router-outlet.directive';
import dayjs from 'dayjs';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { EventsFilterService } from '../../../shared/services/events-filter.service';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { rmLocale } from '../../../shared/utils/day-js-locale';
import { first, Subject, Subscription } from 'rxjs';
import { IframeService } from '../../../services/iframe.service';
import { ScrollPositionService } from '../../../services/scroll-position.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.scss'],
    animations: [
        trigger('slideInOut', [
            state('in', style({
                transform: 'translate3d(0,0,0)',
                width: '320px',
                opacity: 1,
            })),
            state('out', style({
                transform: 'translate3d(-100%, 0, 0)',
                width: '0px',
                opacity: 0,
            })),
            transition('in => out', animate('400ms ease-in-out')),
            transition('out => in', animate('400ms ease-in-out')),
        ]),
    ],
    standalone: false
})
export class EventsListComponent implements OnInit, OnAttach, OnDetach, OnDestroy {

    resetFiltersCommandSubject: Subject<void> = new Subject<void>();
    createSubscriptionCommandSubject: Subject<void> = new Subject<void>();

    private eventFilterUrlParamSubscription?: Subscription;

    constructor(
        public eventsFilterService: EventsFilterService,
        private notificationsService: NotificationsService,
        private router: Router,
        private route: ActivatedRoute,
        public iframeService: IframeService,
        private scrollPositionService: ScrollPositionService,
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
                const regions: number[] = params['regions'].split(',');
                regions.forEach(regionId => {
                    this.eventsFilterService.toggleRegion(+regionId);
                });
            }

            if (!!params['genres']) {
                const genres: number[] = params['genres'].split(',');
                genres.forEach(genreId => {
                    this.eventsFilterService.toggleGenre(+genreId);
                });
            }

            if (!!params['startDate']) {
                const data = params['startDate'].split('-');
                this.eventsFilterService.setStartDate({ day: +data[0], month: +data[1], year: +data[2] });
            }

            if (!!params['searchTerm']) {
                this.eventsFilterService.setSearchterm(params['searchTerm']);
            }

            this.eventFilterUrlParamSubscription = this.eventsFilterService.getEventFilterUrlParamsObservable().subscribe((params) => {
                this.router.navigate(
                    [],
                    {
                        relativeTo: this.route,
                        queryParams: params,
                        queryParamsHandling: '',
                    },
                );
            });
        });
    }

    onAttach(): void {
        const scrollPosition = this.scrollPositionService.getEventsScrollPosition();
        window.scrollTo({
            top: scrollPosition,
            behavior: 'instant',
        });

        this.eventFilterUrlParamSubscription = this.eventsFilterService.getEventFilterUrlParamsObservable().pipe(first()).subscribe((params) => {
            console.log(params);
            this.router.navigate(
                [],
                {
                    relativeTo: this.route,
                    queryParams: params,
                    queryParamsHandling: '',
                },
            );
        });
    }

    onDetach(): void {
        this.scrollPositionService.setEventsScrollPosition(window.scrollY);
    }

    ngOnDestroy() {
        if (this.eventFilterUrlParamSubscription) {
            this.eventFilterUrlParamSubscription.unsubscribe();
        }
    }

    toggleFilter() {
        this.eventsFilterService.isFilterCollapsed = !this.eventsFilterService.isFilterCollapsed;
    }

    resetFilters() {
        this.resetFiltersCommandSubject.next();
    }

    createSubscription() {
        this.createSubscriptionCommandSubject.next();
    }
}
