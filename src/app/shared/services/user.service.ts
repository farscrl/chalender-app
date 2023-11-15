import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Event } from "../data/event";
import { Observable } from "rxjs";
import { Page } from "../data/page";
import { environment } from '../../../environments/environment';
import { ModerationEventsFilter } from '../data/filter';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private basePath = 'user';

    constructor(private httpClient: HttpClient,) {
    }

    public getEvents(filter: ModerationEventsFilter, page = 0, pageSize = 20): Observable<Page<Event>> {
        let params: HttpParams = new HttpParams();
        if (page != 0) {
            params = params.set('page', page);
        }
        if (pageSize != 20) {
            params = params.set('size', pageSize);
        }

        if (filter.searchTerm != null && filter.searchTerm.length > 0) {
            params = params.set('searchTerm', filter.searchTerm);
        }
        if (filter.dates != null) {
            params = params.set('dates', filter.dates);
        }

        if (filter.sortBy != null) {
            params = params.set('sortBy', filter.sortBy);
        }
        if (filter.sortOrder != null) {
            params = params.set('sortOrder', filter.sortOrder);
        }

        const httpOptions = {
            params: params
        };
        return this.httpClient.get<Page<Event>>(this.getUrl('events'), httpOptions);
    }

    public getEvent(id: string): Observable<Event> {
        return this.httpClient.get<Event>(this.getUrl('events', id));
    }

    getUrl(type: string, id?: string) {
        if (id) {
            return environment.apiBasePath.concat(this.basePath).concat('/' + type).concat('/' + id);
        }
        return environment.apiBasePath.concat(this.basePath).concat('/' + type);
    }
}
