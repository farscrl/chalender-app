import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class PlatformService {

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    }

    isSsr(): boolean {
        return !isPlatformBrowser(this.platformId);
    }

    isClient(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    isAndroid(): boolean {
        if (this.isSsr()) {
            return false;
        }
        
        return (/android/i.test(this.userAgent));
    }

    isIos(): boolean {
        if (this.isSsr()) {
            return false;
        }

        // @ts-ignore
        return (/iPad|iPhone|iPod/.test(this.userAgent));
    }

    private get userAgent(): string {
        if (this.isSsr()) {
            return "";
        }

        // @ts-ignore
        return navigator.userAgent || navigator.vendor || window.opera;
    }
}
