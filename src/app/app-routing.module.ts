import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component'
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';

import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
    { path: '', component: EmployeeListComponent, canActivate: [AuthGuard] },
    { path: 'new', component: EmployeeEditComponent, canActivate: [AuthGuard] },
    { path: ':id/edit', component: EmployeeEditComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}