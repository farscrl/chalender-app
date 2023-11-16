import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { isPlatformServer } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
    providedIn: 'root'
})
export class UniversalDeviceDetectorService extends DeviceDetectorService {

    constructor(@Inject(PLATFORM_ID) platformId: any, @Optional() @Inject(REQUEST) request: Request) {
        super(platformId);
        if (isPlatformServer(platformId)) {
            super.setDeviceInfo((request.headers['user-agent'] as string) || '');
        }
    }
}
