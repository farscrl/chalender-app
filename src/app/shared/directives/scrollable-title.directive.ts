import { Directive, ElementRef, HostBinding, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({ selector: '[scrollableTitle]' })
export class ScrollableTitleDirective implements OnInit, OnDestroy {
    @HostBinding('class.touchesTop') touchesTop: boolean = false;
    @HostBinding('class.isOnTop') isOnTop: boolean = false;
    @HostBinding('class.startsHiding') startsHiding: boolean = false;

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
            const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            const {
                top: t,
            } = this.el.nativeElement.getBoundingClientRect();
            const {
                scrollX,
            } = window
            const topPos = t + scrollX

            if (width < 768) {
                this.touchesTop = topPos <= 54;
            } else {
                this.touchesTop = topPos <= 75;
            }
            this.isOnTop = topPos < 1;
            this.startsHiding = topPos < 0;
        }
    }
}
