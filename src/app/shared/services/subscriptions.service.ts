import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from '../data/subscription';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionsService {
    private basePath = 'user/subscriptions';

    constructor(private httpClient: HttpClient,) {
    }

    public getSubscriptions(): Observable<Subscription[]> {
        return this.httpClient.get<Subscription[]>(this.getUrl());
    }

    public getSubscription(id: string): Observable<Subscription> {
        return this.httpClient.get<Subscription>(this.getUrl(id));
    }

    public disableSubscription(id: string): Observable<void> {
        return this.httpClient.post<void>(this.getUrl(id) + '/disable', null);
    }

    public createSubscription(subscription: Subscription): Observable<Subscription> {
        const body: any = Object.assign({}, subscription);
        return this.httpClient.post<Subscription>(this.getUrl(), body);
    }

    public updateSubscription(subscription: Subscription): Observable<Subscription> {
        const body: any = Object.assign({}, subscription);
        return this.httpClient.post<Subscription>(this.getUrl(subscription.id), body);
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
