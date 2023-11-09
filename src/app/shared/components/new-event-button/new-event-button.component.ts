import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
    selector: 'app-new-event-button',
    templateUrl: './new-event-button.component.html',
    styleUrls: ['./new-event-button.component.scss']
})
export class NewEventButtonComponent implements AfterViewInit {
    @ViewChild('fab') fab?: ElementRef;
    @ViewChild('button') button?: ElementRef;

    constructor() {

    }

    ngAfterViewInit(): void {
        if (this.button) {
            this.button.nativeElement.addEventListener('click', (e: any) => {
                e.preventDefault();
                if (this.fab) {
                    this.fab.nativeElement.classList.toggle('open');
                }
            });
        }
    }
}
