import { Component } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EventPreviewComponent } from "../../../components/event-preview/event-preview.component";
import { Router } from '@angular/router';
import { Event, EventVersion } from '../../../shared/data/event';
import { UserService } from '../../../shared/services/user.service';
import { EventsService } from '../../../shared/services/events.service';
import { ModerationEventsFilter } from '../../../shared/data/filter';

@Component({
    selector: 'app-my-events',
    templateUrl: './my-events.component.html',
    styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent {
    events: Event[] = [];
    total: number = 0;
    current: number = 0;

    isLoading: boolean = false;

    private page: number = 0;

    filter = new ModerationEventsFilter();

    constructor(
        private userService: UserService,
        private modalService: NgbModal,
        private router: Router,
        private eventService: EventsService,
    ) {
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
            case "REJECTED":
                return event.rejected;
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
        this.eventService.getEvent(event.id!).subscribe(eventDto => {
            modalRef.componentInstance.eventDto = eventDto;
        });
    }

    edit(event: Event) {
        this.router.navigateByUrl('/user/event-form', {
            state: {event},
        });
    }

    delete(event: Event) {
        console.log("delete", event);
    }

    updateSearchTerm(searchTerm: string) {
        this.filter.searchTerm = searchTerm;
        this.search();
    }

    search() {
        this.isLoading = true;
        this.userService.getEvents(this.filter, this.page, 20).subscribe(events => {
            this.events = events.content;
            this.total = events.totalPages;
            this.current = events.number;
            this.isLoading = false;
        });
    }
}
