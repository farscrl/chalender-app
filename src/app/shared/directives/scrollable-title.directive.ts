import { Directive, ElementRef, HostBinding, OnDestroy, OnInit } from '@angular/core';

@Directive({
    selector: '[scrollableTitle]',
})
export class ScrollableTitleDirective implements OnInit, OnDestroy {
    @HostBinding('class.isOnTop') shadow: boolean = false;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        if (typeof window !== undefined) {
            window.addEventListener('scroll', () => this._checkScroll());
        }

    }

    ngOnDestroy() {
        if (typeof window !== undefined) {
            window.removeEventListener('scroll', () => this._checkScroll());
        }
    }

    private _checkScroll() {
        if (typeof window !== undefined) {
            const {
                top: t,
            } = this.el.nativeElement.getBoundingClientRect();
            const {
                scrollX,
            } = window
            const topPos = t + scrollX
            this.shadow = topPos <= 75;
        }
    }
}
