import { Component, OnInit, ViewChild } from '@angular/core';
import { OnAttach, OnDetach } from '../../../routing/app-router-outlet.directive';
import * as dayjs from 'dayjs';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { NavigationStart, Router } from '@angular/router';
import { EventsFilterService } from '../../../shared/services/events-filter.service';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { rmLocale } from '../../../shared/utils/day-js-locale';

const LOCALSTORAGE_EVENTS_LIST_SCROLL_POSITION = 'events-scroll-position';

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, OnAttach, OnDetach {

    @ViewChild(NgbCollapse) filterCollapsable!: NgbCollapse;

    constructor(
        public eventsFilterService: EventsFilterService,
        private notificationsService: NotificationsService,
        private router: Router,
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

    toggleFilter() {
        this.filterCollapsable.toggle();
    }
}
