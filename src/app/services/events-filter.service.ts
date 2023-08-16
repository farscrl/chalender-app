import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {NgbCalendar, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {calendar} from "ngx-bootstrap/chronos/moment/calendar";

@Injectable({
    providedIn: 'root'
})
export class EventsFilterService {

    selectedRegions = new BehaviorSubject<number[]>([]);
    selectedGenres = new BehaviorSubject<number[]>([]);
    // selectedStartDate = new BehaviorSubject<NgbDateStruct>(this.calendar.getToday());
    selectedStartDate = new BehaviorSubject<NgbDateStruct>({year: 2023, month: 3, day: 1}); // TODO: change to today
    searchTerm = new BehaviorSubject<string>('');

    constructor(private calendar: NgbCalendar) {
        //this.resetFilters();
    }

    resetFilters() {
        this.selectedRegions.next([]);
        this.selectedGenres.next([]);
        // this.selectedStartDate.next(this.calendar.getToday());
        this.selectedStartDate.next({year: 2023, month: 3, day: 1}); // TODO: change to today
        this.searchTerm.next('');
    }

    toggleRegion(regionId: number) {
        const regions = this.selectedRegions.getValue();
        if (regions.includes(regionId)) {
            const index = regions.indexOf(regionId);
            regions.splice(index, 1);
        } else {
            regions.push(regionId);
        }
        this.selectedRegions.next(regions);
    }

    toggleGenre(genreId: number) {
        const genres = this.selectedGenres.getValue();
        if (genres.includes(genreId)) {
            const index = genres.indexOf(genreId);
            genres.splice(index, 1);
        } else {
            genres.push(genreId);
        }
        this.selectedGenres.next(genres);
    }

    getRegionsObservable(): Observable<number[]> {
        return this.selectedRegions.asObservable();
    }

    getGenresObservable(): Observable<number[]> {
        return this.selectedGenres.asObservable();
    }

    getStartDateObservable(): Observable<NgbDateStruct> {
        return this.selectedStartDate.asObservable();
    }

    getSearchTermObservable(): Observable<string> {
        return this.searchTerm.asObservable();
    }
}
