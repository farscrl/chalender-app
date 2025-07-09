import { Component, Input, OnInit } from '@angular/core';
import { EventDto, EventLookup } from '../../shared/data/event';
import { EventTransformerUtil } from '../../shared/utils/event-transformer.util';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventCardComponent } from '../events/event-card/event-card.component';
import { EventDetailsComponent } from '../events/event-details/event-details.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-event-preview',
    templateUrl: './event-preview.component.html',
    styleUrls: ['./event-preview.component.scss'],
    imports: [EventCardComponent, EventDetailsComponent, TranslatePipe]
})
export class EventPreviewComponent implements OnInit {

    @Input()
    set eventDto(dto: EventDto) {
        this._eventDto = dto;
        if (dto) {
            this.getEventLookup();
        }
    }

    get eventDto(): EventDto | undefined {
        return this._eventDto;
    }

    private _eventDto?: EventDto;

    public eventLookup?: EventLookup;

    constructor(private eventTransformerUtil: EventTransformerUtil, private modal: NgbActiveModal) {
    }

    ngOnInit(): void {
        if (this._eventDto) {
            this.getEventLookup();
        }
    }

    private getEventLookup(): void {
        this.eventLookup = this.eventTransformerUtil.getEventLookup(this._eventDto!);
    }

    close() {
        this.modal.close();
    }
}
