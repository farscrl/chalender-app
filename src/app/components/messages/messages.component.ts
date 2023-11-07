import { Component } from '@angular/core';
import { NotificationsService } from '../../shared/services/notifications.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
    constructor(public notificationsService: NotificationsService) {
    }
}
