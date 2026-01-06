import { inject, Injectable, PLATFORM_ID, REQUEST } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
    providedIn: 'root',
})
export class UniversalDeviceDetectorService extends DeviceDetectorService {

    private readonly _platformId = inject(PLATFORM_ID);
    private readonly _request = inject(REQUEST, { optional: true });

    constructor() {
        super();

        if (isPlatformServer(this._platformId)) {
            const userAgent = this._request?.headers.get('user-agent') || '';
            this.setDeviceInfo(userAgent);
        }
    }
}
