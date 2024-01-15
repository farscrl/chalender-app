import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OnAttach, OnDetach } from '../../../routing/app-router-outlet.directive';
import * as dayjs from 'dayjs';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { EventsFilterService } from '../../../shared/services/events-filter.service';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { rmLocale } from '../../../shared/utils/day-js-locale';
import { first, Subject, Subscription } from 'rxjs';
import { IframeService } from '../../../services/iframe.service';
import { ScrollPositionService } from '../../../services/scroll-position.service';

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, OnAttach, OnDetach, OnDestroy {

    @ViewChild(NgbCollapse) filterCollapsable!: NgbCollapse;

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
                const regions: number[] = params['regions'].split(",");
                regions.forEach(regionId => {
                    this.eventsFilterService.toggleRegion(+regionId);
                });
            }

            if (!!params['genres']) {
                const genres: number[] = params['genres'].split(",");
                genres.forEach(genreId => {
                    this.eventsFilterService.toggleGenre(+genreId);
                });
            }

            if (!!params['startDate']) {
                const data = params['startDate'].split('-');
                this.eventsFilterService.setStartDate({day: +data[0], month: +data[1], year: +data[2]});
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
                    }
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
                }
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
        this.filterCollapsable.toggle();
    }

    resetFilters() {
        this.resetFiltersCommandSubject.next();
    }

    createSubscription() {
        this.createSubscriptionCommandSubject.next();
    }
}
