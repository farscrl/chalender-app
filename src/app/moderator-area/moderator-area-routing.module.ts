import { NgModule } from '@angular/core';
import { authGuard } from '../routing/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { ModeratorEventsComponent } from './pages/moderator-events/moderator-events.component';

const routes: Routes = [

    {
        path: 'events',
        component: ModeratorEventsComponent,
        canActivate: [authGuard()]
    }, // TODO: needs Moderation Role
    {
        path: 'notices',
        component: ModeratorEventsComponent,
        canActivate: [authGuard()]
    }, // TODO: needs Moderation Role
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModeratorAreaRoutingModule {
}
