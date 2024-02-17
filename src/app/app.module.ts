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
import { ImprintComponent } from './pages/static/imprint/imprint.component';
import { PrivacyComponent } from './pages/static/privacy/privacy.component';
import { OrganisationComponent } from './pages/static/organisation/organisation.component';
import { NotFoundComponent } from './pages/static/not-found/not-found.component';
import { EventCardComponent } from './components/events/event-card/event-card.component';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { EventFilterComponent } from './components/events/event-filter/event-filter.component';
import { FooterComponent } from './components/footer/footer.component';
import { MessagesComponent } from './components/messages/messages.component';
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

import { SharedModule } from './shared/shared.module';
import { AuthenticationService } from './shared/services/authentication.service';
import { translateBrowserLoaderFactory } from './shared/utils/translate-browser.loader';
import { DatepickerTranslatorService } from './shared/services/datepicker-translator.service';
import { DatepickerHeaderComponent } from './components/datepicker-header/datepicker-header.component';
import { NoEventsComponent } from './components/events/no-events/no-events.component';
import { ScrollableTitleDirective } from './shared/directives/scrollable-title.directive';
import { FilterScrollPositionDirective } from './shared/directives/filter-scroll-position.directive';
import {
    PwaInstallInstructionsComponent
} from './components/pwa-install-instructions/pwa-install-instructions.component';
import { TrackingRtrComponent } from './components/tracking-rtr/tracking-rtr.component';
import {
    NoticesListCardsComponent
} from './components/notices/notices-list/notices-list-cards/notices-list-cards.component';
import { NoticesListComponent } from './pages/notices/notices-list/notices-list.component';
import { NoticesDetailsComponent } from './pages/notices/notices-details/notices-details.component';
import { NoticesFilterComponent } from './components/notices/notices-filter/notices-filter.component';
import { NoticeCardComponent } from './components/notices/notice-card/notice-card.component';
import {
    NoticesListTableComponent
} from './components/notices/notices-list/notices-list-table/notices-list-table.component';
import { NoticeListItemComponent } from './components/notices/notice-list-item/notice-list-item.component';
import { NoNoticesComponent } from './components/notices/no-notices/no-notices.component';
import { NoticeDetailsComponent } from './components/notices/notice-details/notice-details.component';
import { NoticePreviewComponent } from './components/notice-preview/notice-preview.component';
import { NoticeDiffComponent } from './components/notice-diff/notice-diff.component';
import { NewEventsSubscriptionComponent } from './components/modals/new-events-subscription/new-events-subscription.component';
import { NewNoticesSubscriptionComponent } from './components/modals/new-notices-subscription/new-notices-subscription.component';
import { HelpIframeComponent } from './pages/static/help-iframe/help-iframe.component';

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

export function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
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
        ImprintComponent,
        PrivacyComponent,
        OrganisationComponent,
        NotFoundComponent,
        EventCardComponent,
        EventFilterComponent,
        FooterComponent,
        MessagesComponent,
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
        DatepickerHeaderComponent,
        NoEventsComponent,
        ScrollableTitleDirective,
        FilterScrollPositionDirective,
        PwaInstallInstructionsComponent,
        TrackingRtrComponent,
        NoticesListCardsComponent,
        NoticesListComponent,
        NoticesDetailsComponent,
        NoticesFilterComponent,
        NoticeCardComponent,
        NoticesListTableComponent,
        NoticeListItemComponent,
        NoNoticesComponent,
        NoticeDetailsComponent,
        NoticePreviewComponent,
        NoticeDiffComponent,
        NewEventsSubscriptionComponent,
        NewNoticesSubscriptionComponent,
        HelpIframeComponent,
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
            enabled: !isDevMode() && !inIframe(),
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
