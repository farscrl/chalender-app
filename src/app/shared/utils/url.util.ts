import { Injectable } from '@angular/core';
import { EventFilter, EventFilterUrlParams } from '../data/event';
import { IframeService } from '../../services/iframe.service';
import { NoticeBoardFilter } from '../data/notices';

@Injectable({
    providedIn: 'root'
})
export class UrlUtil {

    constructor(private iframeService: IframeService) {
    }

    calculateUrl(eventFilter: EventFilter | NoticeBoardFilter, selectedView: 'cards' | 'list'): EventFilterUrlParams {
        const url = new EventFilterUrlParams();

        if (eventFilter instanceof EventFilter) {
            if (eventFilter.regions.length > 0) {
                url.regions = eventFilter.regions.join(",");
            }

            if (!!eventFilter.startDate) {
                url.startDate = eventFilter.startDate;
            }
        }

        if (eventFilter.genres.length > 0) {
            url.genres = eventFilter.genres.join(",");
        }

        if (!!eventFilter.searchTerm) {
            url.searchTerm = eventFilter.searchTerm;
        }

        if (this.iframeService.isIframeValue()) {
            url.iframe = true;
        }

        if (this.iframeService.isShowAddButtonValue()) {
            url.showAddButton = true;
        }

        if (!this.iframeService.isShowSearchValue()) {
            url.showSearch = false;
        }

        if (!this.iframeService.isShowViewSelectionValue()) {
            url.showViewSelection = false;
        }

        url.view = selectedView;

        return url;
    }

    truncateString(str: string, length: number) {
        if (str.length <= length) {
            return str;
        }
        return str.slice(0, length - 1) + '…'; // Adjust for the length of the ellipsis
    }
}
