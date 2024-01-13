import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventsSubscription } from '../data/subscription';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EventsSubscriptionsService {
    private basePath = 'user/subscriptions/events';

    constructor(private httpClient: HttpClient,) {
    }

    public getSubscriptions(): Observable<EventsSubscription[]> {
        return this.httpClient.get<EventsSubscription[]>(this.getUrl());
    }

    public getSubscription(id: string): Observable<EventsSubscription> {
        return this.httpClient.get<EventsSubscription>(this.getUrl(id));
    }

    public disableSubscription(id: string): Observable<void> {
        return this.httpClient.post<void>(this.getUrl(id) + '/disable', null);
    }

    public createSubscription(subscription: EventsSubscription): Observable<EventsSubscription> {
        const body: any = Object.assign({}, subscription);
        return this.httpClient.post<EventsSubscription>(this.getUrl(), body);
    }

    public updateSubscription(subscription: EventsSubscription): Observable<EventsSubscription> {
        const body: any = Object.assign({}, subscription);
        return this.httpClient.post<EventsSubscription>(this.getUrl(subscription.id), body);
    }

    public deleteSubscription(id: string): Observable<void> {
        return this.httpClient.delete<void>(this.getUrl(id));
    }

    getUrl(id?: string) {
        if (id) {
            return environment.apiBasePath.concat(this.basePath).concat('/' + id);
        }
        return environment.apiBasePath.concat(this.basePath);
    }
}
