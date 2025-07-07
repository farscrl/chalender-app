import { NgModule, TransferState } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { translateServerLoaderFactory } from './shared/utils/translate-server.loader';
import { UniversalDeviceDetectorService } from './services/universal-device-detector.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@NgModule({
    imports: [
        AppModule,
        ServerModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: translateServerLoaderFactory,
                deps: [TransferState],
            },
        }),
    ],
    providers: [
        {
            provide: DeviceDetectorService,
            useClass: UniversalDeviceDetectorService,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppServerModule {
}
