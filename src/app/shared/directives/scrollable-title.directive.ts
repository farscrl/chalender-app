import { Directive, ElementRef, HostBinding, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
    selector: '[scrollableTitle]',
})
export class ScrollableTitleDirective implements OnInit, OnDestroy {
    @HostBinding('class.isOnTop') shadow: boolean = false;

    constructor(
        private el: ElementRef,
        @Inject(PLATFORM_ID) private platformId: any,
    ) {
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            window.addEventListener('scroll', () => this._checkScroll());
        }

    }

    ngOnDestroy() {
        if (isPlatformBrowser(this.platformId)) {
            window.removeEventListener('scroll', () => this._checkScroll());
        }
    }

    private _checkScroll() {
        if (isPlatformBrowser(this.platformId)) {
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
