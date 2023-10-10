import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OnAttach, OnDetach } from '../../../routing/app-router-outlet.directive';
import * as dayjs from 'dayjs';
import { rmLocale } from '../../../utils/day-js-locale';
import { EventsFilterService } from '../../../services/events-filter.service';
import { DatesUtil } from '../../../utils/dates.util';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

const LOCALSTORAGE_EVENTS_LIST_SCROLL_POSITION = 'events-scroll-position';

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, OnDestroy, OnAttach, OnDetach {

    @ViewChild(NgbCollapse) filterCollapsable!: NgbCollapse;

    public isFilterCollapsed = false;

    constructor(private eventsFilterService: EventsFilterService, private datesUtil: DatesUtil) {
    }

    ngOnInit() {
        const customParseFormat = require('dayjs/plugin/customParseFormat');
        dayjs.extend(customParseFormat);
        dayjs.locale('rm', rmLocale);

        this.eventsFilterService.search();


    }

    ngAfterViewInit() {
        this.filterCollapsable.hidden.subscribe((isHidden) => {
            console.log('isHidden', isHidden);
        });
        this.filterCollapsable.shown.subscribe((isShown) => {
            console.log('isShown', isShown);
        });
    }

    ngOnDestroy(): void {

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
