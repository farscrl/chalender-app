import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EventLanguage, Genre, Region } from "../data/static-data";
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StaticDataService {
    private basePath = 'static';


    constructor(private httpClient: HttpClient) {
    }

    getGenres(): Observable<Genre[]> {
        return this.httpClient.get<Genre[]>(this.getUrl().concat('/genres'));
    }

    getRegions(): Observable<Region[]> {
        return this.httpClient.get<Region[]>(this.getUrl().concat('/regions'));
    }

    getEventLanguages(): Observable<EventLanguage[]> {
        return this.httpClient.get<EventLanguage[]>(this.getUrl().concat('/languages'));
    }

    getUrl(id?: number) {
        return environment.apiBasePath.concat(this.basePath);
    }
}
