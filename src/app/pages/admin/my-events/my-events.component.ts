import { Component } from '@angular/core';
import { Event, EventFilter, EventVersion } from "../../../data/event";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EventPreviewComponent } from "../../../components/event-preview/event-preview.component";
import { EventDiffComponent } from "../../../components/event-diff/event-diff.component";
import { UserService } from "../../../services/user.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-my-events',
    templateUrl: './my-events.component.html',
    styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent {
    events: Event[] = [];
    total: number = 0;
    current: number = 0;

    private eventFilter: EventFilter = new EventFilter();
    private page: number = 0;

    constructor(private userService: UserService, private modalService: NgbModal, private router: Router) {
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

    edit(event: Event) {
        console.log("edit", event);
        this.router.navigateByUrl('/admin/events/new', {
            state: {event},
        });
    }

    delete(event: Event) {
        console.log("delete", event);
    }

    private search() {
        this.userService.getEvents(this.eventFilter, this.page, 20).subscribe(events => {
            this.events = events.content;
            this.total = events.totalPages;
            this.current = events.number;
        });
    }
}
