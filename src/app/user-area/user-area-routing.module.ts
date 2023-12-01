import { NgModule } from '@angular/core';
import { EventsComponent } from './pages/events/events.component';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { notAuthGuard } from '../routing/not-auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { authGuard } from '../routing/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { ConfirmPasswordComponent } from './pages/confirm-password/confirm-password.component';
import { MySubscriptionsComponent } from './pages/my-subscriptions/my-subscriptions.component';
import { NewEventComponent } from './pages/new-event/new-event.component';
import { MyEventsComponent } from './pages/my-events/my-events.component';
import { EditSubscriptionComponent } from './pages/edit-subscription/edit-subscription.component';
import { DeactivateSubscriptionComponent } from './pages/deactivate-subscription/deactivate-subscription.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { DeleteAccountComponent } from './pages/delete-account/delete-account.component';
import { eventFormFilledGuard } from '../routing/form-filled.guard';
import { NewSubscriptionComponent } from './pages/new-subscription/new-subscription.component';


const routes: Routes = [
    {path: 'new-event', component: EventsComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [notAuthGuard()]},
    {path: 'login', component: LoginComponent, canActivate: [notAuthGuard()]},
    {path: 'logout', component: LogoutComponent, canActivate: [authGuard()]},
    {path: 'register', component: RegisterComponent, canActivate: [notAuthGuard()]},
    {path: 'confirm-email', component: ConfirmEmailComponent, canActivate: [notAuthGuard()]},
    {path: 'confirm-password', component: ConfirmPasswordComponent, canActivate: [notAuthGuard()]},

    {path: 'event-form', component: NewEventComponent, canDeactivate: [eventFormFilledGuard()]},
    {path: 'events', component: MyEventsComponent, canActivate: [authGuard()]},
    {
        path: 'subscriptions', children: [
            {
                path: '',
                component: MySubscriptionsComponent, canActivate: [authGuard()]
            },
            {
                path: 'new',
                component: NewSubscriptionComponent, canActivate: [authGuard()]
            },
            {
                path: ':id',
                pathMatch: 'full',
                component: EditSubscriptionComponent
            },
            {
                path: 'disable/:id',
                pathMatch: 'full',
                component: DeactivateSubscriptionComponent
            },
        ], canActivate: [authGuard()]
    },
    {path: 'profile', component: ProfileComponent, canActivate: [authGuard()]},
    {path: 'change-password', component: ChangePasswordComponent, canActivate: [authGuard()]},
    {path: 'delete', component: DeleteAccountComponent, canActivate: [authGuard()]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserAreaRoutingModule {
}
