import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EventsListComponent} from './pages/events/events-list/events-list.component';
import {EventsDetailsComponent} from './pages/events/events-details/events-details.component';
import {HeaderComponent} from './components/header/header.component';
import {BackButtonComponent} from './components/back-button/back-button.component';
import {MessagesModule} from "primeng/messages";
import {LoginComponent} from './pages/u/login/login.component';
import {LogoutComponent} from './pages/u/logout/logout.component';
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {HttpClientModule} from "@angular/common/http";
import {JwtModule} from "@auth0/angular-jwt";
import {environment} from "../environments/environment";
import { HelpComponent } from './pages/static/help/help.component';
import { ContactComponent } from './pages/static/contact/contact.component';
import { ImprintComponent } from './pages/static/imprint/imprint.component';
import { PrivacyComponent } from './pages/static/privacy/privacy.component';
import { OrganisationComponent } from './pages/static/organisation/organisation.component';
import { NotFoundComponent } from './pages/static/not-found/not-found.component';

const TOKEN_KEY = 'token';

export function tokenGetter() {
  return localStorage.getItem(TOKEN_KEY);
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
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MessagesModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ButtonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.host],
        disallowedRoutes: [
          environment.apiBasePath + 'user/auth/signin',
          environment.apiBasePath + 'user/auth/signup',
          environment.apiBasePath + 'users/auth/forgot_password',
        ]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
