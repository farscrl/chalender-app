import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Page } from '../data/page';
import { UserDto, UserFilter } from '../data/user';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private basePath = 'admin';

    constructor(private httpClient: HttpClient,) {
    }

    public getUsers(filter: UserFilter, page = 0, pageSize = 20): Observable<Page<UserDto>> {
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

        const httpOptions = {
            params: params
        };
        return this.httpClient.get<Page<UserDto>>(this.getUrl('users'), httpOptions);
    }

    public getUser(id: string): Observable<UserDto> {
        return this.httpClient.get<UserDto>(this.getUrl('users', id));
    }

    public updateUser(id: string, userDto: UserDto): Observable<UserDto> {
        let header = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.post<UserDto>(this.getUrl('users', id), JSON.stringify(userDto), {
            headers: header
        });
    }

    public deleteUser(id: string): Observable<void> {
        return this.httpClient.delete<void>(this.getUrl('users', id));
    }

    getUrl(type: string, id?: string) {
        if (id) {
            return environment.apiBasePath.concat(this.basePath).concat('/' + type).concat('/' + id);
        }
        return environment.apiBasePath.concat(this.basePath.concat('/' + type));
    }
}
