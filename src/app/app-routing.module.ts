import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsListComponent } from "./pages/events/events-list/events-list.component";
import { EventsDetailsComponent } from "./pages/events/events-details/events-details.component";
import { NotFoundComponent } from "./pages/static/not-found/not-found.component";
import { canMatchEventId } from "./routing/match-event-id.guard";
import { HelpComponent } from "./pages/static/help/help.component";
import { OrganisationComponent } from "./pages/static/organisation/organisation.component";
import { ImprintComponent } from "./pages/static/imprint/imprint.component";
import { PrivacyComponent } from "./pages/static/privacy/privacy.component";
import { NoticesDetailsComponent } from './pages/notices/notices-details/notices-details.component';
import { NoticesListComponent } from './pages/notices/notices-list/notices-list.component';
import { HelpIframeComponent } from './pages/static/help-iframe/help-iframe.component';

const routes: Routes = [
    {
        path: 'user',
        loadChildren: () => import('./user-area/user-area.module').then(m => m.UserAreaModule)
    },
    {
        path: 'moderator',
        loadChildren: () => import('./moderator-area/moderator-area.module').then(m => m.ModeratorAreaModule)
    },
    {
        path: 'administrator',
        loadChildren: () => import('./admin-area/admin-area.module').then(m => m.AdminAreaModule)
    },
    {
        path: 'admin',
        children: []
    },
    {
        path: 'help',
        children: [
            {path: '', pathMatch: 'full', component: HelpComponent},
            {path: 'iframe', pathMatch: 'full', component: HelpIframeComponent}
        ]
    },
    {path: 'organisation', pathMatch: 'full', component: OrganisationComponent},
    {path: 'imprint', pathMatch: 'full', component: ImprintComponent},
    {
        path: 'notices',
        children: [
            {path: ':id', canMatch: [canMatchEventId], pathMatch: 'full', component: NoticesDetailsComponent},
            {
                path: '',
                pathMatch: 'full',
                component: NoticesListComponent,
                data: {
                    reuseRouteKey: 'notices-list'
                }
            },
        ]
    },
    {path: 'privacy', pathMatch: 'full', component: PrivacyComponent},
    {path: ':id', canMatch: [canMatchEventId], pathMatch: 'full', component: EventsDetailsComponent},
    {
        path: '',
        pathMatch: 'full',
        component: EventsListComponent,
        data: {
            reuseRouteKey: 'events-list'
        }
    },
    {path: '**', pathMatch: 'full', component: NotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        initialNavigation: 'enabledBlocking'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
