import { NgModule } from '@angular/core';
import { authGuard } from '../routing/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [authGuard()]
    }, // TODO: needs Admin Role
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminAreaRoutingModule {
}
