import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Image } from '../data/event';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ImagesService {
    private basePath = 'images';

    constructor(private httpClient: HttpClient,) {
    }

    public uploadImage(image: File): Observable<Image> {
        const formData = new FormData();
        formData.append('image', image);
        return this.httpClient.post<Image>(this.getUrl(), formData);
    }

    public unlinkImage(id: string): Observable<Image> {
        return this.httpClient.post<Image>(this.getUrl(id) + '/unlink', null);
    }

    getUrl(id?: string) {
        if (id) {
            return environment.apiBasePath.concat(this.basePath).concat('/' + id);
        }
        return environment.apiBasePath.concat(this.basePath);
    }
}
