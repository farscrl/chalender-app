import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Event, EventDto} from "../data/event";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class EventsService {

    private basePath = 'events';

    constructor(private httpClient: HttpClient,) {
    }

    public getEvents(): Observable<EventDto[]> {
        return this.httpClient.get<EventDto[]>(this.getUrl());
    }

    public getEvent(id: number): Observable<EventDto> {
        return this.httpClient.get<EventDto>(this.getUrl(id));
    }

    public createEvent(event: Event): Observable<Event> {
        const body: any = Object.assign({}, event);
        return this.httpClient.post<Event>(this.getUrl(), body);
    }

    getUrl(id?: number) {
        if (id) {
            return environment.apiBasePath.concat(this.basePath).concat('/' + id);
        }
        return environment.apiBasePath.concat(this.basePath);
    }
}
