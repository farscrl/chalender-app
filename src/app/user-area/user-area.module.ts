import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewEventComponent } from './pages/new-event/new-event.component';
import { MyEventsComponent } from './pages/my-events/my-events.component';
import { MySubscriptionsComponent } from './pages/my-subscriptions/my-subscriptions.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { DeleteAccountComponent } from './pages/delete-account/delete-account.component';
import { EditSubscriptionComponent } from './pages/edit-subscription/edit-subscription.component';
import { DeactivateSubscriptionComponent } from './pages/deactivate-subscription/deactivate-subscription.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { EventsComponent } from './pages/events/events.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RegisterComponent } from './pages/register/register.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { ConfirmPasswordComponent } from './pages/confirm-password/confirm-password.component';
import { UserAreaRoutingModule } from './user-area-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        NewEventComponent,
        MyEventsComponent,
        MySubscriptionsComponent,
        ProfileComponent,
        ChangePasswordComponent,
        DeleteAccountComponent,
        EditSubscriptionComponent,
        DeactivateSubscriptionComponent,
        LoginComponent,
        LogoutComponent,
        EventsComponent,
        ForgotPasswordComponent,
        RegisterComponent,
        ConfirmEmailComponent,
        ConfirmPasswordComponent,
    ],
    imports: [
        CommonModule,
        UserAreaRoutingModule,
        SharedModule,
    ]
})
export class UserAreaModule {
}
