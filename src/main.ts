/// <reference types="@angular/localize" />

import { RouteReuseStrategy } from '@angular/router';
import { RouterReuseStrategy } from './app/routing/router-reuse.strategy';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerTranslatorService } from './app/shared/services/datepicker-translator.service';
import { bootstrapApplication, BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideTranslateService, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { translateBrowserLoaderFactory } from './app/shared/utils/translate-browser.loader';
import { importProvidersFrom, isDevMode, TransferState } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { AuthenticationService } from './app/shared/services/authentication.service';
import { environment } from './environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app/app.component';

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


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
            BrowserModule,
            AppRoutingModule,
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
            provide: RouteReuseStrategy,
            useClass: RouterReuseStrategy,
        },
        {
            provide: NgbDatepickerI18n,
            useClass: DatepickerTranslatorService,
        },
        provideClientHydration(),
        provideHttpClient(withInterceptorsFromDi()),
        provideTranslateService({
            loader: {
                provide: TranslateLoader,
                useFactory: translateBrowserLoaderFactory,
                deps: [HttpClient, TransferState],
            },
            defaultLanguage: 'rm',
        }),
        provideAnimations(),
    ],
})
    .catch(err => console.error(err));
