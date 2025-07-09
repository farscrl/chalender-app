import { NgModule, TransferState } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppComponent } from './app.component';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { translateServerLoaderFactory } from './shared/utils/translate-server.loader';
import { UniversalDeviceDetectorService } from './services/universal-device-detector.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@NgModule({
    imports: [
    ServerModule,
],
    providers: [
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
    bootstrap: [AppComponent],
})
export class AppServerModule {
}
