import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeratorEventsComponent } from './pages/moderator-events/moderator-events.component';
import { ModeratorAreaRoutingModule } from './moderator-area-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        ModeratorEventsComponent,
    ],
    imports: [
        CommonModule,
        ModeratorAreaRoutingModule,
        SharedModule,
    ]
})
export class ModeratorAreaModule {
}
