import { Component } from '@angular/core';
import { NotificationsService } from '../../shared/services/notifications.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
    imports: [NgbAlert]
})
export class MessagesComponent {
    constructor(public notificationsService: NotificationsService) {
    }
}
