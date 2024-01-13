import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NoticesSubscription } from '../data/subscription';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NotificationsSubscriptionsService {
    private basePath = 'user/subscriptions/notices';

    constructor(private httpClient: HttpClient,) {
    }

    public getSubscriptions(): Observable<NoticesSubscription[]> {
        return this.httpClient.get<NoticesSubscription[]>(this.getUrl());
    }

    public getSubscription(id: string): Observable<NoticesSubscription> {
        return this.httpClient.get<NoticesSubscription>(this.getUrl(id));
    }

    public disableSubscription(id: string): Observable<void> {
        return this.httpClient.post<void>(this.getUrl(id) + '/disable', null);
    }

    public createSubscription(subscription: NoticesSubscription): Observable<NoticesSubscription> {
        const body: any = Object.assign({}, subscription);
        return this.httpClient.post<NoticesSubscription>(this.getUrl(), body);
    }

    public updateSubscription(subscription: NoticesSubscription): Observable<NoticesSubscription> {
        const body: any = Object.assign({}, subscription);
        return this.httpClient.post<NoticesSubscription>(this.getUrl(subscription.id), body);
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
