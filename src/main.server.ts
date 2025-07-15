import 'zone.js/node';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { serverConfig } from './app/app.config.server';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

// this function is imported as the `default` by your SSR builder
const bootstrap = () => bootstrapApplication(AppComponent, {
    providers: [
        ...serverConfig.providers,
    ],
});

export default bootstrap;
