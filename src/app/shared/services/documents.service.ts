import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../data/event';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DocumentsService {
    private basePath = 'documents';

    constructor(private httpClient: HttpClient,) {
    }

    public uploadDocument(image: File): Observable<Document> {
        const formData = new FormData();
        formData.append('document', image);
        return this.httpClient.post<Document>(this.getUrl(), formData);
    }

    public unlinkImage(id: string): Observable<Document> {
        return this.httpClient.post<Document>(this.getUrl(id) + '/unlink', null);
    }

    getUrl(id?: string) {
        if (id) {
            return environment.apiBasePath.concat(this.basePath).concat('/' + id);
        }
        return environment.apiBasePath.concat(this.basePath);
    }
}
