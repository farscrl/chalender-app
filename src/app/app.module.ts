import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EventsListComponent} from './pages/events/events-list/events-list.component';
import {EventsDetailsComponent} from './pages/events/events-details/events-details.component';
import {HeaderComponent} from './components/header/header.component';
import {BackButtonComponent} from './components/back-button/back-button.component';
import {LoginComponent} from './pages/u/login/login.component';
import {LogoutComponent} from './pages/u/logout/logout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {JWT_OPTIONS, JwtModule} from "@auth0/angular-jwt";
import {environment} from "../environments/environment";
import {HelpComponent} from './pages/static/help/help.component';
import {ContactComponent} from './pages/static/contact/contact.component';
import {ImprintComponent} from './pages/static/imprint/imprint.component';
import {PrivacyComponent} from './pages/static/privacy/privacy.component';
import {OrganisationComponent} from './pages/static/organisation/organisation.component';
import {NotFoundComponent} from './pages/static/not-found/not-found.component';
import {EventsComponent} from './pages/u/events/events.component';
import {ForgotPasswordComponent} from './pages/u/forgot-password/forgot-password.component';
import {RegisterComponent} from './pages/u/register/register.component';
import {NewEventComponent} from './pages/admin/new-event/new-event.component';
import {MyEventsComponent} from './pages/admin/my-events/my-events.component';
import {MySubscriptionsComponent} from './pages/admin/my-subscriptions/my-subscriptions.component';
import {ProfileComponent} from './pages/admin/profile/profile.component';
import {AuthenticationService} from "./services/authentication.service";
import {ShortDomainPipe} from './pipes/short-domain.pipe';
import {EventCardComponent} from './components/events/event-card/event-card.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EventFilterComponent} from './components/events/event-filter/event-filter.component';
import {FooterComponent} from './components/footer/footer.component';
import {MessagesComponent} from './components/messages/messages.component';
import {ConfirmEmailComponent} from './pages/u/confirm-email/confirm-email.component';
import {ConfirmPasswordComponent} from './pages/u/confirm-password/confirm-password.component';
import {ChangePasswordComponent} from './pages/admin/change-password/change-password.component';
import {NewEventButtonComponent} from './components/new-event-button/new-event-button.component';
import {ModeratorEventsComponent} from './pages/moderator/moderator-events/moderator-events.component';
import {StatusBadgeComponent} from './components/status-badge/status-badge.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {EventPreviewComponent} from './components/event-preview/event-preview.component';
import {EventDiffComponent} from './components/event-diff/event-diff.component';
import {DiffFieldComponent} from './components/event-diff/diff-field/diff-field.component';
import {UsersComponent} from "./pages/administrator/users/users.component";
import {RoleBadgeComponent} from './components/role-badge/role-badge.component';
import {UserComponent} from './components/forms/user/user.component';
import {ChangeUserComponent} from './components/change-user/change-user.component';
import {NgxFileDropModule} from "ngx-file-drop";
import { FileListComponent } from './components/file-list/file-list.component';
import { DeleteEventComponent } from './components/modals/delete-event/delete-event.component';

export function jwtOptionsFactory(authService: AuthenticationService) {
    return {
        allowedDomains: [environment.host],
        disallowedRoutes: [
            environment.apiBasePath + 'user/auth/signin',
            environment.apiBasePath + 'user/auth/signup',
            environment.apiBasePath + 'users/auth/confirm-email',
            environment.apiBasePath + 'users/auth/reset-password',
            environment.apiBasePath + 'users/auth/redefine-password',
        ],
        tokenGetter: () => {
            return authService.getToken() ?? null;
        }
    }
}

@NgModule({
    declarations: [
        AppComponent,
        EventsListComponent,
        EventsDetailsComponent,
        HeaderComponent,
        BackButtonComponent,
        LoginComponent,
        LogoutComponent,
        HelpComponent,
        ContactComponent,
        ImprintComponent,
        PrivacyComponent,
        OrganisationComponent,
        NotFoundComponent,
        EventsComponent,
        ForgotPasswordComponent,
        RegisterComponent,
        NewEventComponent,
        MyEventsComponent,
        MySubscriptionsComponent,
        ProfileComponent,
        ShortDomainPipe,
        EventCardComponent,
        EventFilterComponent,
        FooterComponent,
        MessagesComponent,
        ConfirmEmailComponent,
        ConfirmPasswordComponent,
        ChangePasswordComponent,
        NewEventButtonComponent,
        ModeratorEventsComponent,
        StatusBadgeComponent,
        PaginationComponent,
        EventPreviewComponent,
        EventDiffComponent,
        DiffFieldComponent,
        UsersComponent,
        RoleBadgeComponent,
        UserComponent,
        ChangeUserComponent,
        FileListComponent,
        DeleteEventComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory,
                deps: [AuthenticationService]
            },
        }),
        ReactiveFormsModule,
        NgbModule,
        NgxFileDropModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
