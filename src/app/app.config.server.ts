import { ApplicationConfig, TransferState } from '@angular/core';

import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { translateServerLoaderFactory } from './shared/utils/translate-server.loader';

import { DeviceDetectorService } from 'ngx-device-detector';
import { UniversalDeviceDetectorService } from './services/universal-device-detector.service';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

export const serverConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
        provideHttpClient(
            withInterceptorsFromDi(),
            withFetch(),
        ),
        {
            provide: DeviceDetectorService,
            useClass: UniversalDeviceDetectorService,
        },
        provideTranslateService({
            loader: {
                provide: TranslateLoader,
                useFactory: translateServerLoaderFactory,
                deps: [TransferState],
            },
        }),
    ],
};
