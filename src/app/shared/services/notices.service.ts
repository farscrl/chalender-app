import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../data/page';
import { environment } from '../../../environments/environment';
import { NoticeBoardFilter, NoticeBoardItemDto } from '../data/notices';

@Injectable({
    providedIn: 'root'
})
export class NoticesService {

    private basePath = 'notices';

    constructor(private httpClient: HttpClient,) {
    }

    public getNotices(filter: NoticeBoardFilter, page = 0, pageSize = 20): Observable<Page<NoticeBoardItemDto>> {
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
        if (filter.searchTerm != null && filter.searchTerm.length > 0) {
            params = params.set('searchTerm', filter.searchTerm);
        }

        const httpOptions = {
            params: params
        };
        return this.httpClient.get<Page<NoticeBoardItemDto>>(this.getUrl(), httpOptions);
    }

    public getNotice(id: string): Observable<NoticeBoardItemDto> {
        return this.httpClient.get<NoticeBoardItemDto>(this.getUrl(id));
    }

    public createNotice(notice: NoticeBoardItemDto): Observable<NoticeBoardItemDto> {
        const body: any = Object.assign({}, notice);
        return this.httpClient.post<NoticeBoardItemDto>(this.getUrl(), body);
    }

    public updateNotice(notice: NoticeBoardItemDto): Observable<NoticeBoardItemDto> {
        const body: any = Object.assign({}, notice);
        return this.httpClient.post<NoticeBoardItemDto>(this.getUrl(notice.id), body);
    }

    public deleteNotice(noticeId: string): Observable<void> {
        return this.httpClient.delete<void>(this.getUrl(noticeId));
    }

    getUrl(id?: string) {
        if (id) {
            return environment.apiBasePath.concat(this.basePath).concat('/' + id);
        }
        return environment.apiBasePath.concat(this.basePath);
    }
}
