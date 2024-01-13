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
import { NewEventComponent } from './pages/new-event/new-event.component';
import { MyEventsComponent } from './pages/my-events/my-events.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { DeleteAccountComponent } from './pages/delete-account/delete-account.component';
import { eventFormFilledGuard } from '../routing/form-filled.guard';
import { NewNoticeComponent } from './pages/new-notice/new-notice.component';
import { NoticesComponent } from './pages/notices/notices.component';
import { MyNoticesComponent } from './pages/my-notices/my-notices.component';
import { MyEventsSubscriptionsComponent } from './pages/my-events-subscriptions/my-events-subscriptions.component';
import { MyNoticesSubscriptionsComponent } from './pages/my-notices-subscriptions/my-notices-subscriptions.component';
import { NewEventsSubscriptionComponent } from './pages/new-events-subscription/new-events-subscription.component';
import { NewNoticesSubscriptionComponent } from './pages/new-notices-subscription/new-notices-subscription.component';
import { EditEventsSubscriptionComponent } from './pages/edit-events-subscription/edit-events-subscription.component';
import {
    EditNoticesSubscriptionComponent
} from './pages/edit-notices-subscription/edit-notices-subscription.component';
import {
    DeactivateEventsSubscriptionComponent
} from './pages/deactivate-events-subscription/deactivate-events-subscription.component';
import {
    DeactivateNoticesSubscriptionComponent
} from './pages/deactivate-notices-subscription/deactivate-notices-subscription.component';


const routes: Routes = [
    {path: 'new-event', component: EventsComponent},
    {path: 'new-notice', component: NoticesComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [notAuthGuard()]},
    {path: 'login', component: LoginComponent, canActivate: [notAuthGuard()]},
    {path: 'logout', component: LogoutComponent, canActivate: [authGuard()]},
    {path: 'register', component: RegisterComponent, canActivate: [notAuthGuard()]},
    {path: 'confirm-email', component: ConfirmEmailComponent, canActivate: [notAuthGuard()]},
    {path: 'confirm-password', component: ConfirmPasswordComponent, canActivate: [notAuthGuard()]},

    {path: 'event-form', component: NewEventComponent, canDeactivate: [eventFormFilledGuard()]},
    {path: 'notice-form', component: NewNoticeComponent},
    {path: 'events', component: MyEventsComponent, canActivate: [authGuard()]},
    {path: 'notices', component: MyNoticesComponent, canActivate: [authGuard()]},
    {
        path: 'subscriptions',
        children: [
            {
                path: 'events',
                children: [
                    {
                        path: '',
                        component: MyEventsSubscriptionsComponent
                    },
                    {
                        path: 'new',
                        component: NewEventsSubscriptionComponent
                    },
                    {
                        path: ':id',
                        pathMatch: 'full',
                        component: EditEventsSubscriptionComponent
                    },
                    {
                        path: 'disable/:id',
                        pathMatch: 'full',
                        component: DeactivateEventsSubscriptionComponent
                    },
                ]
            },
            {
                path: 'notices',
                children: [
                    {
                        path: '',
                        component: MyNoticesSubscriptionsComponent
                    },
                    {
                        path: 'new',
                        component: NewNoticesSubscriptionComponent
                    },
                    {
                        path: ':id',
                        pathMatch: 'full',
                        component: EditNoticesSubscriptionComponent
                    },
                    {
                        path: 'disable/:id',
                        pathMatch: 'full',
                        component: DeactivateNoticesSubscriptionComponent
                    },
                ]
            }
        ],
        canActivate: [authGuard()]
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
