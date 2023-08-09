import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventsListComponent} from "./pages/events/events-list/events-list.component";
import {EventsDetailsComponent} from "./pages/events/events-details/events-details.component";
import {LoginComponent} from "./pages/u/login/login.component";
import {LogoutComponent} from "./pages/u/logout/logout.component";

const routes: Routes = [
  {path: ':id', component: EventsDetailsComponent},
  {
    path: 'u', children: [
      {path: 'login', component: LoginComponent},
      {path: 'logout', component: LogoutComponent},
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
