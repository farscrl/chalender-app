import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventsListComponent} from "./pages/events/events-list/events-list.component";
import {EventsDetailsComponent} from "./pages/events/events-details/events-details.component";

const routes: Routes = [
  { path: ':id', component: EventsDetailsComponent },
  { path: '', component: EventsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
