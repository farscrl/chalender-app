import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SERVER_USER_AGENT } from '../tokens/server.tokens';

@Injectable({
    providedIn: 'root',
})
export class UniversalDeviceDetectorService extends DeviceDetectorService {

    constructor(@Inject(PLATFORM_ID) platformId: any, @Optional() @Inject(SERVER_USER_AGENT) serverUserAgent: string | null) {
        super(platformId);
        if (isPlatformServer(platformId)) {
            if (serverUserAgent) {
                super.setDeviceInfo(serverUserAgent);
            } else {
                console.warn('Server User Agent not available for UniversalDeviceDetectorService (this should not happen if configured correctly)');
                super.setDeviceInfo('');
            }
        }
    }
}
