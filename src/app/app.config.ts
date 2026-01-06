import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouteReuseStrategy, withEnabledBlockingInitialNavigation } from '@angular/router';

import { appRoutes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UniversalDeviceDetectorService } from './services/universal-device-detector.service';
import { provideTranslateService, TranslatePipe } from '@ngx-translate/core';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { AuthenticationService } from './shared/services/authentication.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterReuseStrategy } from './routing/router-reuse.strategy';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerTranslatorService } from './shared/services/datepicker-translator.service';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export function jwtOptionsFactory(authService: AuthenticationService) {
    return {
        allowedDomains: [environment.host],
        disallowedRoutes: [
            environment.apiBasePath + 'user/auth/signin',
            environment.apiBasePath + 'user/auth/signup',
            environment.apiBasePath + 'users/auth/confirm-email',
            environment.apiBasePath + 'users/auth/reset-password',
            environment.apiBasePath + 'users/auth/redefine-password',
        ],
        tokenGetter: () => {
            return authService.getToken() ?? null;
        },
    };
}


export function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection(),
        provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
        provideClientHydration(withEventReplay()),
        provideHttpClient(
            withInterceptorsFromDi(),
            withFetch(),
        ),
        importProvidersFrom(
            JwtModule.forRoot({
                jwtOptionsProvider: {
                    provide: JWT_OPTIONS,
                    useFactory: jwtOptionsFactory,
                    deps: [AuthenticationService],
                },
            }),
            ServiceWorkerModule.register('ngsw-worker.js', {
                enabled: !isDevMode() && !inIframe(),
                // Register the ServiceWorker as soon as the application is stable
                // or after 30 seconds (whichever comes first).
                registrationStrategy: 'registerWhenStable:30000',
            }),
            TranslatePipe,
        ),
        {
            provide: DeviceDetectorService,
            useClass: UniversalDeviceDetectorService,
        },
        {
            provide: RouteReuseStrategy,
            useClass: RouterReuseStrategy,
        },
        {
            provide: NgbDatepickerI18n,
            useClass: DatepickerTranslatorService,
        },
        provideTranslateService({
            loader: provideTranslateHttpLoader({prefix: "./assets/i18n/", suffix:".json"}),
            fallbackLang: 'rm',
        }),
        provideAnimationsAsync(),
    ]
};
