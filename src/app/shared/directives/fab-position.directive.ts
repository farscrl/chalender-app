import { Directive, ElementRef, HostBinding, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
    selector: '[fabPosition]',
})
export class FabPositionDirective implements OnInit, OnDestroy {
    @HostBinding('style.bottom') setBottom?: string;

    constructor(
        private el: ElementRef,
        @Inject(PLATFORM_ID) private platformId: any,
    ) {
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            const that = this;
            window.addEventListener('scroll', () => this._checkScroll());
            const observer = new MutationObserver(function (mutationsList, observer) {
                for (let mutation of mutationsList) {
                    if (mutation.type === "childList") {
                        that._checkScroll();
                        break;
                    }
                }
            });
            observer.observe(document.body, {childList: true, subtree: true});

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
            const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            const diff = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;

            if (width < 768) {
                if (diff < 152) {
                    this.setBottom = (152 - diff + 20) + 'px';
                } else {
                    this.setBottom = undefined;
                }
            } else {
                if (diff < 97) {
                    this.setBottom = (97 - diff + 45) + 'px';
                } else {
                    this.setBottom = undefined;
                }
            }
        }
    }
}
