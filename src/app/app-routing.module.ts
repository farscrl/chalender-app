import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventsListComponent} from "./pages/events/events-list/events-list.component";
import {EventsDetailsComponent} from "./pages/events/events-details/events-details.component";
import {LoginComponent} from "./pages/u/login/login.component";
import {LogoutComponent} from "./pages/u/logout/logout.component";
import {notAuthGuard} from "./routing/not-auth.guard";
import {authGuard} from "./routing/auth.guard";
import {NotFoundComponent} from "./pages/static/not-found/not-found.component";
import {canMatchEventId} from "./routing/match-event-id.guard";
import {HelpComponent} from "./pages/static/help/help.component";
import {ContactComponent} from "./pages/static/contact/contact.component";
import {OrganisationComponent} from "./pages/static/organisation/organisation.component";
import {ImprintComponent} from "./pages/static/imprint/imprint.component";
import {PrivacyComponent} from "./pages/static/privacy/privacy.component";
import {EventsComponent} from "./pages/u/events/events.component";
import {ForgotPasswordComponent} from "./pages/u/forgot-password/forgot-password.component";
import {RegisterComponent} from "./pages/u/register/register.component";
import {NewEventComponent} from "./pages/admin/new-event/new-event.component";
import {MyEventsComponent} from "./pages/admin/my-events/my-events.component";
import {MySubscriptionsComponent} from "./pages/admin/my-subscriptions/my-subscriptions.component";
import {ProfileComponent} from "./pages/admin/profile/profile.component";
import {ConfirmEmailComponent} from "./pages/u/confirm-email/confirm-email.component";
import {ConfirmPasswordComponent} from "./pages/u/confirm-password/confirm-password.component";
import {ChangePasswordComponent} from "./pages/admin/change-password/change-password.component";
import {ModeratorEventsComponent} from "./pages/moderator/moderator-events/moderator-events.component";
import {UsersComponent} from "./pages/administrator/users/users.component";

const routes: Routes = [
    {
        path: 'u',
        children: [
            {path: 'events', component: EventsComponent},
            {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [notAuthGuard()]},
            {path: 'login', component: LoginComponent, canActivate: [notAuthGuard()]},
            {path: 'logout', component: LogoutComponent, canActivate: [authGuard()]},
            {path: 'register', component: RegisterComponent, canActivate: [notAuthGuard()]},
            {path: 'confirm-email', component: ConfirmEmailComponent, canActivate: [notAuthGuard()]},
            {path: 'confirm-password', component: ConfirmPasswordComponent, canActivate: [notAuthGuard()]},
        ]
    },
    {
        path: 'moderator',
        children: [
            {path: 'events', component: ModeratorEventsComponent, canActivate: [authGuard()]}, // TODO: needs Moderation Role
        ]
    },
    {
        path: 'administrator',
        children: [
            {path: 'users', component: UsersComponent, canActivate: [authGuard()]}, // TODO: needs Admin Role
        ]
    },
    {
        path: 'admin',
        children: [
            {path: 'events/new', component: NewEventComponent},
            {path: 'events', component: MyEventsComponent, canActivate: [authGuard()]},
            {path: 'subscriptions', component: MySubscriptionsComponent, canActivate: [authGuard()]},
            {path: 'profile', component: ProfileComponent, canActivate: [authGuard()]},
            {path: 'change-password', component: ChangePasswordComponent, canActivate: [authGuard()]},
        ]
    },
    {path: ':id', canMatch: [canMatchEventId], pathMatch: 'full', component: EventsDetailsComponent},
    {path: 'help', pathMatch: 'full', component: HelpComponent},
    {path: 'contact', pathMatch: 'full', component: ContactComponent},
    {path: 'organisation', pathMatch: 'full', component: OrganisationComponent},
    {path: 'imprint', pathMatch: 'full', component: ImprintComponent},
    {path: 'privacy', pathMatch: 'full', component: PrivacyComponent},
    {path: '', pathMatch: 'full', component: EventsListComponent},
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
