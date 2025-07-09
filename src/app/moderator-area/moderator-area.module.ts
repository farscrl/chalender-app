import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeratorEventsComponent } from './pages/moderator-events/moderator-events.component';
import { ModeratorAreaRoutingModule } from './moderator-area-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ModeratorNoticesComponent } from './pages/moderator-notices/moderator-notices.component';


@NgModule({
    imports: [
        CommonModule,
        ModeratorAreaRoutingModule,
        SharedModule,
        ModeratorEventsComponent,
        ModeratorNoticesComponent,
    ]
})
export class ModeratorAreaModule {
}
