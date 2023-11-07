import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { EventDto, EventFilter, EventLookup } from '../data/event';
import { Page } from '../data/page';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EventsService {

    private basePath = 'events';

    constructor(private httpClient: HttpClient,) {
    }

    public getEvents(filter: EventFilter, page = 0, pageSize = 20): Observable<Page<EventLookup>> {
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
        return this.httpClient.get<Page<EventLookup>>(this.getUrl(), httpOptions);
    }

    public getEvent(id: string): Observable<EventDto> {
        return this.httpClient.get<EventDto>(this.getUrl(id));
    }

    public getEventIcs(id: string, uid: string): Observable<string> {
        return this.httpClient.get<string>(this.getUrl(id) + '/ics/' + uid, {
            responseType: 'text' as 'json',
        });
    }

    public createEvent(event: EventDto): Observable<EventDto> {
        const body: any = Object.assign({}, event);
        return this.httpClient.post<EventDto>(this.getUrl(), body);
    }

    public updateEvent(event: EventDto): Observable<EventDto> {
        const body: any = Object.assign({}, event);
        return this.httpClient.post<EventDto>(this.getUrl(event.id), body);
    }

    getUrl(id?: string) {
        if (id) {
            return environment.apiBasePath.concat(this.basePath).concat('/' + id);
        }
        return environment.apiBasePath.concat(this.basePath);
    }
}
