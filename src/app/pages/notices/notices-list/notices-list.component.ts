import { Component } from '@angular/core';
import { first, Subject, Subscription } from 'rxjs';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { IframeService } from '../../../services/iframe.service';
import dayjs from 'dayjs';
import { rmLocale } from '../../../shared/utils/day-js-locale';
import { NoticesFilterService } from '../../../shared/services/notices-filter.service';
import { ScrollPositionService } from '../../../services/scroll-position.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-notices-list',
    templateUrl: './notices-list.component.html',
    styleUrls: ['./notices-list.component.scss'],
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
            transition('out => in', animate('400ms ease-in-out'))
        ]),
    ],
    standalone: false
})
export class NoticesListComponent {
    resetFiltersCommandSubject: Subject<void> = new Subject<void>();
    createSubscriptionCommandSubject: Subject<void> = new Subject<void>();

    private noticesFilterUrlParamSubscription?: Subscription;

    constructor(
        public noticesFilterService: NoticesFilterService,
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
        const scrollPosition = this.scrollPositionService.getNoticeBoardScrollPosition();
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
        this.scrollPositionService.setNoticeBoardScrollPosition(window.scrollY);
    }

    ngOnDestroy() {
        if (this.noticesFilterUrlParamSubscription) {
            this.noticesFilterUrlParamSubscription.unsubscribe();
        }
    }

    toggleFilter() {
        this.noticesFilterService.isFilterCollapsed = !this.noticesFilterService.isFilterCollapsed;
    }

    resetFilters() {
        this.resetFiltersCommandSubject.next();
    }

    createSubscription() {
        this.createSubscriptionCommandSubject.next();
    }
}
