export class Message {
    type: MessageType = 'info';
    title: string = '';
    message: string = '';

    constructor(type: MessageType, title: string, message: string) {
        this.type = type;
        this.title = title;
        this.message = message;
    }
}

export type MessageType = 'success' | 'info' | 'warning' | 'danger';
