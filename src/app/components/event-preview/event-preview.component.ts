import { Component, Input, OnInit } from '@angular/core';
import { EventDto, EventLookup } from '../../data/event';
import { EventTransformerUtil } from '../../utils/event-transformer.util';

@Component({
    selector: 'app-event-preview',
    templateUrl: './event-preview.component.html',
    styleUrls: ['./event-preview.component.scss']
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

    constructor(private eventTransformerUtil: EventTransformerUtil) {
    }

    ngOnInit(): void {
        if (this._eventDto) {
            this.getEventLookup();
        }
    }

    private getEventLookup(): void {
        this.eventLookup = this.eventTransformerUtil.getEventLookup(this._eventDto!);
    }
}
