import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppComponent } from './app.component';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
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
            loader: provideTranslateHttpLoader({prefix: "./assets/i18n/", suffix:".json"}),
        }),
    ],
    bootstrap: [AppComponent],
})
export class AppServerModule {
}
