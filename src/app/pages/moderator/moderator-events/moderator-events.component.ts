import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ModeratorService } from "../../../services/moderator.service";
import { Event, EventVersion } from "../../../data/event";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EventPreviewComponent } from "../../../components/event-preview/event-preview.component";
import { EventDiffComponent } from "../../../components/event-diff/event-diff.component";
import { DeleteEventComponent } from "../../../components/modals/delete-event/delete-event.component";
import { ReasonForChangeComponent } from "../../../components/modals/reason-for-change/reason-for-change.component";
import { Router } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { ModerationEventsFilter } from '../../../data/filter';
import { SortableDirective, SortEvent } from '../../../utils/sortable.directive';

@Component({
    selector: 'app-moderator-events',
    templateUrl: './moderator-events.component.html',
    styleUrls: ['./moderator-events.component.scss']
})
export class ModeratorEventsComponent implements OnInit {

    events: Event[] = [];
    total: number = 0;
    current: number = 0;

    filter = new ModerationEventsFilter();

    private page: number = 0;

    @ViewChildren(SortableDirective) headers: QueryList<SortableDirective> | undefined;

    constructor(
        private moderatorService: ModeratorService,
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
        if (!this.canShowPreview(event)) {
            return;
        }
        
        const modalRef = this.modalService.open(EventPreviewComponent, {size: 'xl'});
        this.eventService.getEvent(event.id!).subscribe(eventDto => {
            modalRef.componentInstance.eventDto = eventDto;
        });
    }

    canShowPreview(event: Event) {
        return event.eventStatus === 'NEW_MODIFICATION';
    }

    showDiff(event: Event) {
        console.log("show diff", event);
        const modalRef = this.modalService.open(EventDiffComponent, {size: 'xl'});
        modalRef.componentInstance.oldEventVersion = event.currentlyPublished!;
        modalRef.componentInstance.newEventVersion = event.waitingForReview!;
    }

    accept(event: Event): void {
        const modalRef = this.modalService.open(ReasonForChangeComponent, {size: 'lg'});
        modalRef.componentInstance.event = this.getEventVersion(event);
        modalRef.componentInstance.type = 'accept';

        modalRef.closed.subscribe(reason => {
            console.debug("reason", reason);
            this.moderatorService.acceptEvent(event.id!, reason).subscribe(event => {
                this.search();
            });
        });
    }

    refuse(event: Event): void {

        const modalRef = this.modalService.open(ReasonForChangeComponent, {size: 'lg'});
        modalRef.componentInstance.event = this.getEventVersion(event);
        modalRef.componentInstance.type = 'refuse';

        modalRef.closed.subscribe(reason => {
            console.debug("reason", reason);
            this.moderatorService.refuseEvent(event.id!, reason).subscribe(event => {
                this.search();
            });
        });
    }

    edit(event: Event) {
        console.log("edit", event);
        this.router.navigateByUrl('/admin/events/new', {
            state: {event},
        });
    }

    delete(event: Event) {
        const modalRef = this.modalService.open(DeleteEventComponent, {size: 'lg'});
        modalRef.componentInstance.event = this.getEventVersion(event);

        modalRef.closed.subscribe(reason => {
            if (reason === 'delete') {
                this.moderatorService.deleteEvent(event.id!).subscribe(event => {
                    this.search();
                });
            }
        });
    }

    updateSearchTerm(searchTerm: string) {
        this.filter.searchTerm = searchTerm;
        this.search();
    }


    onSort({column, direction}: SortEvent) {
        if (!this.headers) {
            return;
        }

        // resetting other headers
        this.headers.forEach((header) => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });

        this.filter.sortOrder = direction;
        this.filter.sortBy = column;
        this.search();
    }

    search() {
        console.log(this.filter);

        this.moderatorService.getEvents(this.filter, this.page, 20).subscribe(events => {
            this.events = events.content;
            this.total = events.totalPages;
            this.current = events.number;
        });
    }
}
