import {Message, MessageType} from "../data/notifications";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    messages: Message[] = [];

    constructor() {
    }

    clearMessages(): NotificationsService {
        this.messages = [];
        return this;
    }

    getMessages() {
        return this.messages;
    }

    successMessage(title: string, message: string): NotificationsService {
        this.addMessage(title, message, 'success');
        return this;
    }

    infoMessage(title: string, message: string): NotificationsService {
        this.addMessage(title, message, 'info');
        return this;
    }

    warningMessage(title: string, message: string): NotificationsService {
        this.addMessage(title, message, 'warning');
        return this;
    }

    errorMessage(title: string, message: string): NotificationsService {
        this.addMessage(title, message, 'danger');
        return this;
    }

    dismissMessage(message: Message) {
        const index = this.messages.indexOf(message);
        if (index > -1) {
            this.messages.splice(index, 1);
        }
    }

    private addMessage(title: string, message: string, type: MessageType): NotificationsService {
        this.clearMessages();
        this.messages.push({
            type,
            title,
            message,
        });
        return this;
    }
}
