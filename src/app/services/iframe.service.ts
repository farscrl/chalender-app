import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IframeService {

    private isIframe = new BehaviorSubject<boolean>(false);
    private showSearch = new BehaviorSubject<boolean>(true);

    constructor() {
    }

    setIsIframe() {
        this.isIframe.next(true);
    }

    getIsIframeObservable(): Observable<boolean> {
        return this.isIframe.asObservable();
    }

    isIframeValue(): boolean {
        return this.isIframe.value;
    }

    disableSearch() {
        this.showSearch.next(false);
    }

    getIsSearchDisabledObservable(): Observable<boolean> {
        return this.showSearch.asObservable();
    }

    isShowSearchValue(): boolean {
        return this.showSearch.value;
    }
}
