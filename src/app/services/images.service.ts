import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ImagesService {
    private basePath = 'images';

    constructor(private httpClient: HttpClient,) {
    }

    public uploadImage(image: File): Observable<string> {
        const formData = new FormData();
        formData.append('image', image);
        return this.httpClient.post<string>(this.getUrl(), formData);
        //return of("result").pipe(delay(1000));
    }

    getUrl(id?: string) {
        if (id) {
            return environment.apiBasePath.concat(this.basePath).concat('/' + id);
        }
        return environment.apiBasePath.concat(this.basePath);
    }
}
