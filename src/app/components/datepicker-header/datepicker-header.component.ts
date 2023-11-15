import { Component, Input, OnInit } from '@angular/core';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { DatesUtil } from '../../shared/utils/dates.util';
import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

@Component({
    selector: 'app-datepicker-header',
    templateUrl: './datepicker-header.component.html',
    styleUrls: ['./datepicker-header.component.scss']
})
export class DatepickerHeaderComponent implements OnInit {

    @Input()
    datepicker!: NgbDatepicker;

    date = "";

    private currentMonth: Dayjs | undefined;

    constructor(private dateUtil: DatesUtil) {
    }

    ngOnInit() {
        this.datepicker.navigate.subscribe(event => {
            this.currentMonth = dayjs().month(event.next.month - 1).year(event.next.year);
            this.date = this.dateUtil.getMonthYearString(event.next.month, event.next.year);
        });
    }

    today() {
        this.datepicker.navigateTo({year: dayjs().year(), month: dayjs().month() + 1});
    }

    back() {
        const month = this.currentMonth?.subtract(1, 'month');
        this.datepicker.navigateTo({year: month!.year(), month: month!.month() + 1});
    }

    forward() {
        const month = this.currentMonth?.add(1, 'month');
        this.datepicker.navigateTo({year: month!.year(), month: month!.month() + 1});
    }

}
