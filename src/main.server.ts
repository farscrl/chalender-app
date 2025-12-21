import 'zone.js/node';
import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { serverConfig } from './app/app.config.server';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

// this function is imported as the `default` by your SSR builder
const bootstrap = (context: BootstrapContext) => bootstrapApplication(AppComponent, {
    providers: [
        provideZoneChangeDetection(),
        ...serverConfig.providers,
    ],
}, context);

export default bootstrap;
