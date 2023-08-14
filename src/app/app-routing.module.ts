import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventsListComponent} from "./pages/events/events-list/events-list.component";
import {EventsDetailsComponent} from "./pages/events/events-details/events-details.component";
import {LoginComponent} from "./pages/u/login/login.component";
import {LogoutComponent} from "./pages/u/logout/logout.component";
import {notAuthGuard} from "./guards/not-auth.guard";
import {authGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: ':id', component: EventsDetailsComponent},
  {
    path: 'u',
    children: [
      {path: 'login', component: LoginComponent, canActivate: [notAuthGuard()]},
      {path: 'logout', component: LogoutComponent, canActivate: [authGuard()]},
    ]
  },
  {path: '', component: EventsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
