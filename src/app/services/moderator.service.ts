import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Event, EventFilter} from "../data/event";
import {Observable} from "rxjs";
import {Page} from "../data/page";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ModeratorService {

    private basePath = 'moderator';

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
        return this.httpClient.get<Page<Event>>(this.getUrl() + '/events', httpOptions);
    }

    getUrl(id?: number) {
        if (id) {
            return environment.apiBasePath.concat(this.basePath).concat('/' + id);
        }
        return environment.apiBasePath.concat(this.basePath);
    }
}
