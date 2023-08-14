import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {EventLanguage, eventLanguages, Genre, Region} from "../data/static-data";

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
    return of(eventLanguages);
  }

  getUrl(id?: number) {
    return environment.apiBasePath.concat(this.basePath);
  }
}
