import {Component, OnInit} from '@angular/core';
import {ModeratorService} from "../../../services/moderator.service";
import {Event, EventFilter, EventVersion} from "../../../data/event";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EventPreviewComponent} from "../../../components/event-preview/event-preview.component";
import {EventDiffComponent} from "../../../components/event-diff/event-diff.component";
import {DeleteEventComponent} from "../../../components/modals/delete-event/delete-event.component";

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

    constructor(private moderatorService: ModeratorService, private modalService: NgbModal) {
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
        const modalRef = this.modalService.open(EventPreviewComponent, {size: 'xl'});
    }

    showDiff(event: Event) {
        console.log("show diff", event);
        const modalRef = this.modalService.open(EventDiffComponent, {size: 'xl'});
        modalRef.componentInstance.oldEventVersion = event.currentlyPublished!;
        modalRef.componentInstance.newEventVersion = event.waitingForReview!;
    }

    accept(event: Event) {
        this.moderatorService.acceptEvent(event.id!).subscribe(event => {
            this.search();
        });
        console.log("accept", event);
    }

    refuse(event: Event) {
        this.moderatorService.refuseEvent(event.id!).subscribe(event => {
            this.search();
        });
        console.log("refuse", event);
    }

    edit(event: Event) {
        console.log("edit", event);
    }

    delete(event: Event) {
        const modalRef = this.modalService.open(DeleteEventComponent, {size: 'lg'});
        modalRef.componentInstance.event = this.getEventVersion(event);

        modalRef.closed.subscribe(reason => {
            console.log("delete reason", reason);
            if (reason === 'delete') {
                this.moderatorService.deleteEvent(event.id!).subscribe(event => {
                    this.search();
                });
            }
        });
    }

    private search() {
        this.moderatorService.getEvents(this.eventFilter, this.page, 20).subscribe(events => {
            this.events = events.content;
            this.total = events.totalPages;
            this.current = events.number;
        });
    }
}
