import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, TransferState } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsListComponent } from './pages/events/events-list/events-list.component';
import { EventsDetailsComponent } from './pages/events/events-details/events-details.component';
import { HeaderComponent } from './components/header/header.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { JWT_OPTIONS, JwtModule } from "@auth0/angular-jwt";
import { environment } from "../environments/environment";
import { HelpComponent } from './pages/static/help/help.component';
import { ContactComponent } from './pages/static/contact/contact.component';
import { ImprintComponent } from './pages/static/imprint/imprint.component';
import { PrivacyComponent } from './pages/static/privacy/privacy.component';
import { OrganisationComponent } from './pages/static/organisation/organisation.component';
import { NotFoundComponent } from './pages/static/not-found/not-found.component';
import { EventCardComponent } from './components/events/event-card/event-card.component';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { EventFilterComponent } from './components/events/event-filter/event-filter.component';
import { FooterComponent } from './components/footer/footer.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NewEventButtonComponent } from './components/new-event-button/new-event-button.component';
import { EventPreviewComponent } from './components/event-preview/event-preview.component';
import { EventDiffComponent } from './components/event-diff/event-diff.component';
import { DiffFieldComponent } from './components/event-diff/diff-field/diff-field.component';
import { DeleteEventComponent } from './components/modals/delete-event/delete-event.component';
import { ReasonForChangeComponent } from './components/modals/reason-for-change/reason-for-change.component';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { RouteReuseStrategy } from '@angular/router';
import { RouterReuseStrategy } from './routing/router-reuse.strategy';
import { AppRouterOutletDirective } from './routing/app-router-outlet.directive';
import { EventFilterModalComponent } from './components/events/event-filter-modal/event-filter-modal.component';
import {
    EventsListCardsComponent
} from './components/events/events-list/events-list-cards/events-list-cards.component';
import {
    EventsListTableComponent
} from './components/events/events-list/events-list-table/events-list-table.component';
import { ViewSelectionComponent } from './components/events/view-selection/view-selection.component';
import { EventListItemComponent } from './components/events/event-list-item/event-list-item.component';
import { EventDetailsComponent } from './components/events/event-details/event-details.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NotLoggedInComponent } from './components/modals/not-logged-in/not-logged-in.component';
import { NewSubscriptionComponent } from './components/modals/new-subscription/new-subscription.component';

import { SharedModule } from './shared/shared.module';
import { AuthenticationService } from './shared/services/authentication.service';
import { translateBrowserLoaderFactory } from './shared/utils/translate-browser.loader';
import { DatepickerTranslatorService } from './shared/services/datepicker-translator.service';

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
        HelpComponent,
        ContactComponent,
        ImprintComponent,
        PrivacyComponent,
        OrganisationComponent,
        NotFoundComponent,
        EventCardComponent,
        EventFilterComponent,
        FooterComponent,
        MessagesComponent,
        NewEventButtonComponent,
        EventPreviewComponent,
        EventDiffComponent,
        DiffFieldComponent,
        DeleteEventComponent,
        ReasonForChangeComponent,
        AppRouterOutletDirective,
        EventFilterModalComponent,
        EventsListCardsComponent,
        EventsListTableComponent,
        ViewSelectionComponent,
        EventListItemComponent,
        EventDetailsComponent,
        NotLoggedInComponent,
        NewSubscriptionComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory,
                deps: [AuthenticationService]
            },
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: translateBrowserLoaderFactory,
                deps: [HttpClient, TransferState]
            },
            defaultLanguage: 'rm'
        }),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        SharedModule,
    ],
    providers: [
        {
            provide: RouteReuseStrategy,
            useClass: RouterReuseStrategy
        },
        {
            provide: NgbDatepickerI18n,
            useClass: DatepickerTranslatorService
        },
        provideClientHydration()
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
