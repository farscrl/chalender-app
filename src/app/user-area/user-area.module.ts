import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewEventComponent } from './pages/new-event/new-event.component';
import { MyEventsComponent } from './pages/my-events/my-events.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { DeleteAccountComponent } from './pages/delete-account/delete-account.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { EventsComponent } from './pages/events/events.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RegisterComponent } from './pages/register/register.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { ConfirmPasswordComponent } from './pages/confirm-password/confirm-password.component';
import { UserAreaRoutingModule } from './user-area-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NewNoticeComponent } from './pages/new-notice/new-notice.component';
import { NoticesComponent } from './pages/notices/notices.component';
import { MyNoticesComponent } from './pages/my-notices/my-notices.component';
import { MyNoticesSubscriptionsComponent } from './pages/my-notices-subscriptions/my-notices-subscriptions.component';
import { MyEventsSubscriptionsComponent } from './pages/my-events-subscriptions/my-events-subscriptions.component';
import { NewEventsSubscriptionComponent } from './pages/new-events-subscription/new-events-subscription.component';
import { NewNoticesSubscriptionComponent } from './pages/new-notices-subscription/new-notices-subscription.component';
import {
    EditNoticesSubscriptionComponent
} from './pages/edit-notices-subscription/edit-notices-subscription.component';
import { EditEventsSubscriptionComponent } from './pages/edit-events-subscription/edit-events-subscription.component';
import {
    DeactivateEventsSubscriptionComponent
} from './pages/deactivate-events-subscription/deactivate-events-subscription.component';
import {
    DeactivateNoticesSubscriptionComponent
} from './pages/deactivate-notices-subscription/deactivate-notices-subscription.component';

@NgModule({
    declarations: [
        NewEventComponent,
        MyEventsComponent,
        ProfileComponent,
        ChangePasswordComponent,
        DeleteAccountComponent,
        LoginComponent,
        LogoutComponent,
        EventsComponent,
        ForgotPasswordComponent,
        RegisterComponent,
        ConfirmEmailComponent,
        ConfirmPasswordComponent,
        NewNoticeComponent,
        NoticesComponent,
        MyNoticesComponent,
        MyNoticesSubscriptionsComponent,
        MyEventsSubscriptionsComponent,
        NewEventsSubscriptionComponent,
        NewNoticesSubscriptionComponent,
        EditNoticesSubscriptionComponent,
        EditEventsSubscriptionComponent,
        DeactivateEventsSubscriptionComponent,
        DeactivateNoticesSubscriptionComponent,
    ],
    imports: [
        CommonModule,
        UserAreaRoutingModule,
        SharedModule,
    ]
})
export class UserAreaModule {
}
