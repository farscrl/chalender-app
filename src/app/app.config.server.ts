import { ApplicationConfig, mergeApplicationConfig, TransferState } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';
import { appConfig } from './app.config';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { translateServerLoaderFactory } from './shared/utils/translate-server.loader';

const serverConfig: ApplicationConfig = {
    providers: [
        provideServerRendering(withRoutes(serverRoutes)),
        provideTranslateService({
            loader: {
                provide: TranslateLoader,
                useFactory: translateServerLoaderFactory,
                deps: [TransferState],
            },
        }),
        provideNoopAnimations(),
    ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
