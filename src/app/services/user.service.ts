import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Event, EventFilter} from "../data/event";
import {Observable} from "rxjs";
import {Page} from "../data/page";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private basePath = 'user';

    constructor(private httpClient: HttpClient,) {
    }

    public getEvents(filter: EventFilter, page = 0, pageSize = 20): Observable<Page<Event>> {
        let params: HttpParams = new HttpParams();
        if (page != 0) {
            params = params.set('page', page);
        }
        if (pageSize != 20) {
            params = params.set('size', pageSize);
        }
        if (filter.genres != null && filter.genres.length > 0) {
            params = params.set('genres', filter.genres.join(','));
        }
        if (filter.regions != null && filter.regions.length > 0) {
            params = params.set('regions', filter.regions.join(','));
        }
        if (filter.searchTerm != null && filter.searchTerm.length > 0) {
            params = params.set('searchTerm', filter.searchTerm);
        }
        if (filter.startDate != null) {
            params = params.set('date', filter.startDate);
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
