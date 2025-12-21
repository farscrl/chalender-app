import { provideZoneChangeDetection } from '@angular/core';
import 'zone.js/node';
import { APP_BASE_HREF } from '@angular/common';
import { REQUEST, RESPONSE } from './src/express.tokens';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { renderApplication } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './src/app/app.component';
import { serverConfig } from './src/app/app.config.server';
import { readFileSync } from 'node:fs';

export function app(): express.Express {
    const server = express();
    const serverDistFolder = dirname(fileURLToPath(import.meta.url));
    const browserDistFolder = resolve(serverDistFolder, '../browser');

    const indexHtml = readFileSync(join(serverDistFolder, 'index.server.html'), 'utf-8');

    server.use(
        express.static(browserDistFolder, {
            maxAge: '1y',
        }),
    );

    server.get(/^\/.*$/, async (req, res, next) => {
        try {
            const html = await renderApplication(
                () => bootstrapApplication(AppComponent, {
                    providers: [
                        provideZoneChangeDetection(),
                        ...serverConfig.providers,
                        { provide: APP_BASE_HREF, useValue: req.baseUrl },
                        { provide: REQUEST, useValue: req },
                        { provide: RESPONSE, useValue: res },
                    ],
                }),
                {
                    document: indexHtml,
                    url: req.originalUrl,
                },
            );
            res.send(html);
        } catch (e) {
            next(e);
        }
    });

    return server;
}

const port = process.env['PORT'] || 4000;
app().listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
