import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ContactForm } from '../data/contact-form';

@Injectable({
    providedIn: 'root'
})
export class ContactFormService {
    private basePath = 'contact';

    constructor(private httpClient: HttpClient,) {
    }

    public sendForm(contactForm: ContactForm): Observable<ContactForm> {
        const body: any = Object.assign({}, contactForm);
        return this.httpClient.post<ContactForm>(this.getUrl('contact-form'), body);
    }

    getUrl(type: string) {
        return environment.apiBasePath.concat(this.basePath.concat('/' + type));
    }
}
