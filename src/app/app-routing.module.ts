import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EmailJobDetailsComponent } from './component/email-job-details/email-job-details.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CreateEmailJobComponent } from './component/create-email-job/create-email-job.component';
import { OccurrenceDetailsComponent } from './component/occurrence-details/occurrence-details.component';
import { CreateEmailTemplateComponent } from './component/create-email-template/create-email-template.component'; // Import the component
import {ManageUsersComponent} from "./component/manage-users/manage-users.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'email-job/:uuid', component: EmailJobDetailsComponent, canActivate: [AuthGuard] },
  { path: 'create-email-job', component: CreateEmailJobComponent, canActivate: [AuthGuard] },
  { path: 'create-email-template', component: CreateEmailTemplateComponent, canActivate: [AuthGuard] },
  { path: 'occurrence-details/:emailJobUuid', component: OccurrenceDetailsComponent, canActivate: [AuthGuard] },
  { path: 'manage-users', component: ManageUsersComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' } // Wildcard should be the last route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
