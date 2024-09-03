import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import MatProgressSpinnerModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from "./component/login/login.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { AuthService } from "./services/auth.service";
import { EmailJobDetailsComponent } from './component/email-job-details/email-job-details.component';
import { DatePipe } from '@angular/common';
import { CreateEmailJobComponent } from "./component/create-email-job/create-email-job.component";
import { OccurrenceDetailsComponent } from './component/occurrence-details/occurrence-details.component';
import { CreateEmailTemplateComponent } from './component/create-email-template/create-email-template.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    EmailJobDetailsComponent,
    CreateEmailJobComponent,
    OccurrenceDetailsComponent,
    CreateEmailTemplateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  providers: [
    AuthService,
    provideHttpClient(withInterceptors([AuthInterceptor])),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
