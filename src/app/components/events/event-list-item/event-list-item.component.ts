import { Component, Input } from '@angular/core';
import { EventLookup } from '../../../shared/data/event';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-event-list-item',
    templateUrl: './event-list-item.component.html',
    styleUrls: ['./event-list-item.component.scss'],
    imports: [RouterLink, TranslatePipe]
})
export class EventListItemComponent {
    @Input()
    public event?: EventLookup;

    @Input()
    public isFirst = false;
}
