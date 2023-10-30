import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Event } from "../data/event";
import { Observable } from "rxjs";
import { Page } from "../data/page";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ModerationEventsFilter } from '../data/filter';

@Injectable({
    providedIn: 'root'
})
export class ModeratorService {

    private basePath = 'moderator';

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
        params = params.set('includeStateInReview', filter.includeStateInReview.toString());
        params = params.set('includeStateNewModification', filter.includeStateNewModification.toString());
        params = params.set('includeStatePublished', filter.includeStatePublished.toString());
        params = params.set('includeStateRejected', filter.includeStateRejected.toString());
        params = params.set('includeStateInvalid', filter.includeStateInvalid.toString());
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

    public acceptEvent(id: string, reason: string): Observable<Event> {
        return this.httpClient.post<Event>(this.getUrl('events', id) + '/accept', {comment: reason});
    }

    public refuseEvent(id: string, reason: string): Observable<Event> {
        return this.httpClient.post<Event>(this.getUrl('events', id) + '/refuse', {comment: reason});
    }

    public deleteEvent(id: string): Observable<Event> {
        return this.httpClient.delete<Event>(this.getUrl('events', id));
    }

    getUrl(type: string, id?: string) {
        if (id) {
            return environment.apiBasePath.concat(this.basePath).concat('/' + type).concat('/' + id);
        }
        return environment.apiBasePath.concat(this.basePath).concat('/' + type);
    }
}
