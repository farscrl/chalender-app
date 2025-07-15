import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { REQUEST, RESPONSE } from './src/express.tokens';
import { renderApplication } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './src/app/app.component';
import { serverConfig } from './src/app/app.config.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
    const server = express();
    const serverDistFolder = dirname(fileURLToPath(import.meta.url));
    const browserDistFolder = resolve(serverDistFolder, '../browser');
    const indexHtml = join(serverDistFolder, 'index.server.html');

    const commonEngine = new CommonEngine();

    server.set('view engine', 'html');
    server.set('views', browserDistFolder);

    // Example Express Rest API endpoints
    // server.get('/api/**', (req, res) => { });
    // Serve static files from /browser
    server.get('**', express.static(browserDistFolder, {
        maxAge: '1y',
        index: 'index.html',
    }));

    // All regular routes use the Angular engine
    server.get('**', async (req, res, next) => {
        try {
            const html = await renderApplication(
                () => bootstrapApplication(AppComponent, {
                    providers: [
                        ...serverConfig.providers,
                        { provide: APP_BASE_HREF, useValue: req.baseUrl },
                        { provide: REQUEST, useValue: req },
                        { provide: RESPONSE, useValue: res },
                    ],
                }),
                {
                    document: indexHtml,
                    url: req.originalUrl,
                    // platform‑level providers (e.g. for zone shims) go here:
                    platformProviders: [],
                },
            );

            res.send(html);
        } catch (err) {
            next(err);
        }
    });

    return server;
}

function run(): void {
    const port = process.env['PORT'] || 4000;

    // Start up the Node server
    const server = app();
    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

run();
