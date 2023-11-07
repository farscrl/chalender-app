import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from "./pages/users/users.component";
import { AdminAreaRoutingModule } from './admin-area-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ChangeUserComponent } from './components/change-user/change-user.component';
import { RoleBadgeComponent } from './components/role-badge/role-badge.component';


@NgModule({
    declarations: [
        UsersComponent,
        ChangeUserComponent,
        RoleBadgeComponent,
    ],
    imports: [
        CommonModule,
        AdminAreaRoutingModule,
        SharedModule,
    ]
})
export class AdminAreaModule {
}
