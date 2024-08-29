import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EmailJobDetailsComponent } from './component/email-job-details/email-job-details.component';
import {LoginComponent} from "./component/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {CreateEmailJobComponent} from "./component/create-email-job/create-email-job.component";



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route to login
  { path: 'login', component: LoginComponent }, // Login page
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Dashboard with AuthGuard
  { path: 'email-job/:uuid', component: EmailJobDetailsComponent, canActivate: [AuthGuard] }, // Email job details with AuthGuard
  { path: 'create-email-job', component: CreateEmailJobComponent, canActivate: [AuthGuard] }, // Create email job with AuthGuard
  { path: '**', redirectTo: '/login' } // Redirect unknown routes to login
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
