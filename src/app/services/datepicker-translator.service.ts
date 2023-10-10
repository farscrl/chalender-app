import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class DatepickerTranslatorService extends NgbDatepickerI18n {

    private v = {
        weekdays: ['gl', 'ma', 'me', 'gie', 've', 'so', 'du'],
        months: ['scha', 'fev', 'mar', 'avr', 'matg', 'zercl', 'fen', 'uost', 'sett', 'oct', 'nov', 'dec'],
        weekLabel: 'emna'
    };

    constructor(private translateService: TranslateService) {
        super();
    }

    getWeekdayLabel(weekday: number): string {
        return this.v.weekdays[weekday - 1];
    }

    override getWeekLabel(): string {
        return this.v.weekLabel;
    }

    getMonthShortName(month: number): string {
        return this.v.months[month - 1];
    }

    getMonthFullName(month: number): string {
        return this.getMonthShortName(month);
    }

    getDayAriaLabel(date: NgbDateStruct): string {
        return `${date.day}-${date.month}-${date.year}`;
    }
}
