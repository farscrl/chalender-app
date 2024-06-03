import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IframeService {

    private isIframe = new BehaviorSubject<boolean>(false);
    private showSearch = new BehaviorSubject<boolean>(true);
    private showViewSelection = new BehaviorSubject<boolean>(true);
    private showAddButton = new BehaviorSubject<boolean>(false);
    private showTopNavigation = new BehaviorSubject<boolean>(false);

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

    disableViewSelection() {
        this.showViewSelection.next(false);
    }

    getShowViewSelectionObservable(): Observable<boolean> {
        return this.showViewSelection.asObservable();
    }

    isShowViewSelectionValue(): boolean {
        return this.showViewSelection.value;
    }

    enableAddButton() {
        this.showAddButton.next(true);
    }

    getShowAddButtonObservable(): Observable<boolean> {
        return this.showAddButton.asObservable();
    }

    isShowAddButtonValue(): boolean {
        return this.showAddButton.value;
    }

    enableTopNavigation() {
        this.showTopNavigation.next(true);
    }

    getShowTopNavigationObservable(): Observable<boolean> {
        return this.showTopNavigation.asObservable();
    }

    isShowTopNavigationValue(): boolean {
        return this.showTopNavigation.value;
    }
}
