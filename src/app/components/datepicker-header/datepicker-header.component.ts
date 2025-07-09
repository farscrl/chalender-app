import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatesUtil } from '../../shared/utils/dates.util';
import dayjs, { Dayjs } from 'dayjs';
import { Subscription } from 'rxjs';
import { EventsFilterService } from '../../shared/services/events-filter.service';

@Component({
    selector: 'app-datepicker-header',
    templateUrl: './datepicker-header.component.html',
    styleUrls: ['./datepicker-header.component.scss'],
    standalone: false
})
export class DatepickerHeaderComponent implements OnInit, OnDestroy {

    @Input()
    datepicker!: NgbDatepicker;

    date = '';

    private currentMonth: Dayjs | undefined;

    private selectedFilterDate: NgbDateStruct | undefined;

    private selectedStartDateSubscription?: Subscription;

    constructor(private dateUtil: DatesUtil, private eventsFilterService: EventsFilterService) {
    }

    ngOnInit() {
        this.datepicker.navigate.subscribe(event => {
            this.currentMonth = dayjs().month(event.next.month - 1).year(event.next.year);
            this.date = this.dateUtil.getMonthYearString(event.next.month, event.next.year);
        });

        this.selectedStartDateSubscription = this.eventsFilterService.getStartDateObservable().subscribe(startDate => {
            this.selectedFilterDate = startDate;
        });
    }

    ngOnDestroy() {
        if (this.selectedStartDateSubscription) {
            this.selectedStartDateSubscription.unsubscribe();
        }
    }

    today() {
        this.eventsFilterService.resetDateFilter();
        this.datepicker.navigateTo({ year: dayjs().year(), month: dayjs().month() + 1 });
    }

    back() {
        const month = this.currentMonth?.subtract(1, 'month');
        this.datepicker.navigateTo({ year: month!.year(), month: month!.month() + 1 });
    }

    forward() {
        const month = this.currentMonth?.add(1, 'month');
        this.datepicker.navigateTo({ year: month!.year(), month: month!.month() + 1 });
    }

    get isToday() {
        return this.selectedFilterDate?.year === dayjs().year()
            && this.selectedFilterDate?.month === dayjs().month() + 1
            && this.selectedFilterDate?.day === dayjs().date();
    }
}
