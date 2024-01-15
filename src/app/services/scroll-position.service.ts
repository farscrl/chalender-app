import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ScrollPositionService {

    private eventsScrollPosition = 0;
    private noticeBoardScrollPosition = 0;

    constructor() {
    }

    getEventsScrollPosition(): number {
        return this.eventsScrollPosition;
    }

    setEventsScrollPosition(value: number) {
        this.eventsScrollPosition = value;
    }

    getNoticeBoardScrollPosition(): number {
        return this.noticeBoardScrollPosition;
    }

    setNoticeBoardScrollPosition(value: number) {
        this.noticeBoardScrollPosition = value;
    }
}
