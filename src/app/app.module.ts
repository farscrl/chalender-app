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

@NgModule({
  declarations: [
    AppComponent,
    EventsListComponent,
    EventsDetailsComponent,
    HeaderComponent,
    BackButtonComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MessagesModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
