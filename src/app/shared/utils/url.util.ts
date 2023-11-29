import { Injectable } from '@angular/core';
import { EventFilter, EventFilterUrlParams } from '../data/event';
import { IframeService } from '../../services/iframe.service';

@Injectable({
    providedIn: 'root'
})
export class UrlUtil {

    constructor(private iframeService: IframeService) {
    }

    calculateUrl(eventFilter: EventFilter): EventFilterUrlParams {
        const url = new EventFilterUrlParams();

        if (eventFilter.regions.length > 0) {
            url.regions = eventFilter.regions.join(",");
        }

        if (eventFilter.genres.length > 0) {
            url.genres = eventFilter.genres.join(",");
        }

        if (!!eventFilter.startDate) {
            url.startDate = eventFilter.startDate;
        }

        if (!!eventFilter.searchTerm) {
            url.searchTerm = eventFilter.searchTerm;
        }

        if (this.iframeService.isIframeValue()) {
            url.iframe = true;
        }

        if (!this.iframeService.isShowSearchValue()) {
            url.showSearch = false;
        }

        return url;
    }
}
