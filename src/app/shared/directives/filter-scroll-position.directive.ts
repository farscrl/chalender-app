import { Directive, ElementRef, HostBinding, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
    selector: '[filterScrollPosition]',
    standalone: false
})
export class FilterScrollPositionDirective implements OnInit, OnDestroy {
    @HostBinding('style.maxHeight') heightStyle?: string;

    constructor(
        private el: ElementRef,
        @Inject(PLATFORM_ID) private platformId: any,
    ) {
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            window.addEventListener('scroll', () => this._checkScroll());
            this._checkScroll();
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
            const diff = 97 - topPos;

            if (diff > 0) {
                this.heightStyle = `calc(100vh - ${topPos}px)`
            } else {
                this.heightStyle = undefined;
            }
        }
    }
}
