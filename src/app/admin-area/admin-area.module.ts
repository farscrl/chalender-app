import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './pages/users/users.component';
import { AdminAreaRoutingModule } from './admin-area-routing.module';

import { ChangeUserComponent } from './components/change-user/change-user.component';
import { RoleBadgeComponent } from './components/role-badge/role-badge.component';
import { TranslatePipe } from '@ngx-translate/core';


@NgModule({
    imports: [
    CommonModule,
    AdminAreaRoutingModule,
    TranslatePipe,
    UsersComponent,
    ChangeUserComponent,
    RoleBadgeComponent,
],
})
export class AdminAreaModule {
}
