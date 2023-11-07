import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsListComponent } from "./pages/events/events-list/events-list.component";
import { EventsDetailsComponent } from "./pages/events/events-details/events-details.component";
import { NotFoundComponent } from "./pages/static/not-found/not-found.component";
import { canMatchEventId } from "./routing/match-event-id.guard";
import { HelpComponent } from "./pages/static/help/help.component";
import { ContactComponent } from "./pages/static/contact/contact.component";
import { OrganisationComponent } from "./pages/static/organisation/organisation.component";
import { ImprintComponent } from "./pages/static/imprint/imprint.component";
import { PrivacyComponent } from "./pages/static/privacy/privacy.component";

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
    {path: ':id', canMatch: [canMatchEventId], pathMatch: 'full', component: EventsDetailsComponent},
    {path: 'help', pathMatch: 'full', component: HelpComponent},
    {path: 'contact', pathMatch: 'full', component: ContactComponent},
    {path: 'organisation', pathMatch: 'full', component: OrganisationComponent},
    {path: 'imprint', pathMatch: 'full', component: ImprintComponent},
    {path: 'privacy', pathMatch: 'full', component: PrivacyComponent},
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
