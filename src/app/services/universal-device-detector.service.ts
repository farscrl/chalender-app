import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { REQUEST } from '../../express.tokens';

@Injectable({
    providedIn: 'root',
})
export class UniversalDeviceDetectorService extends DeviceDetectorService {

    constructor(@Inject(PLATFORM_ID) platformId: any, @Optional() @Inject(REQUEST) request: Request) {
        super(platformId);
        if (isPlatformServer(platformId)) {
            // @ts-ignore
            const userAgent = this.request?.headers?.['user-agent'] as string || '';
            super.setDeviceInfo(userAgent);
        }
    }
}
