import {Component, OnInit} from '@angular/core';
import {ModeratorService} from "../../../services/moderator.service";
import {Event, EventFilter, EventVersion} from "../../../data/event";

@Component({
    selector: 'app-moderator-events',
    templateUrl: './moderator-events.component.html',
    styleUrls: ['./moderator-events.component.scss']
})
export class ModeratorEventsComponent implements OnInit {

    events: Event[] = [];
    total: number = 0;
    current: number = 0;

    private eventFilter: EventFilter = new EventFilter();
    private page: number = 0;

    constructor(private moderatorService: ModeratorService) {
    }

    ngOnInit(): void {
        this.search();
    }

    getEventVersion(event: Event): EventVersion | undefined {
        switch (event.eventStatus) {
            case 'DRAFT':
                return event.draft;
            case 'IN_REVIEW':
                return event.waitingForReview;
            case 'PUBLISHED':
                return event.currentlyPublished;
            case 'NEW_MODIFICATION':
                return event.waitingForReview;
            default:
                return undefined;
        }
    }

    hasChanges(event: Event) {
        return event.eventStatus === 'NEW_MODIFICATION' || event.eventStatus === 'IN_REVIEW'
    }

    goToPage(page: number) {
        this.page = page;
        this.search();
    }

    showPreview(event: Event) {
        console.log("show preview", event);
    }

    showDiff(event: Event) {
        console.log("show diff", event);
    }

    accept(event: Event) {
        console.log("accept", event);
    }

    reject(event: Event) {
        console.log("reject", event);
    }

    edit(event: Event) {
        console.log("edit", event);
    }

    delete(event: Event) {
        console.log("delete", event);
    }

    private search() {
        this.moderatorService.getEvents(this.eventFilter, this.page, 20).subscribe(events => {
            this.events = events.content;
            this.total = events.totalPages;
            this.current = events.number;
        });
    }
}
