import { Component, ElementRef, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-tracking-rtr',
    templateUrl: './tracking-rtr.component.html',
    styleUrls: ['./tracking-rtr.component.scss']
})
export class TrackingRtrComponent {
    constructor(
        @Inject(PLATFORM_ID) private readonly platformId: Object,
        private readonly renderer: Renderer2,
        private readonly el: ElementRef,
    ) {
        // BROWSER
        if (isPlatformBrowser(this.platformId)) {
            const script = this.renderer.createElement('script') as HTMLScriptElement;
            script.src = `/assets/tracking/tc_SRGGD_53.js`;
            script.async = true;
            this.renderer.appendChild(this.el.nativeElement, script);
        }
    }
}
