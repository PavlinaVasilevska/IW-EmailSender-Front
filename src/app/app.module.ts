import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; // Import withFetch here

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select'; // Added MatSelectModule for dropdown menus
import { MatCheckboxModule } from '@angular/material/checkbox'; // For any checkboxes (e.g., roles)


// Routing Module
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EmailJobDetailsComponent } from './component/email-job-details/email-job-details.component';
import { CreateEmailJobComponent } from './component/create-email-job/create-email-job.component';
import { OccurrenceDetailsComponent } from './component/occurrence-details/occurrence-details.component';
import { CreateEmailTemplateComponent } from './component/create-email-template/create-email-template.component';
import { ManageUsersComponent } from './component/manage-users/manage-users.component';
import { EditUserComponent } from './component/edit-user/edit-user.component';

// Services and Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
import { RegisterUserComponent } from './component/register-user/register-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    EmailJobDetailsComponent,
    CreateEmailJobComponent,
    OccurrenceDetailsComponent,
    CreateEmailTemplateComponent,
    ManageUsersComponent,
    EditUserComponent,
    RegisterUserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // Angular Material Modules
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule, // Added for dropdown menus
    MatCheckboxModule, // Added for checkboxes, such as roles
  ],
  providers: [
    AuthService,
    provideHttpClient(withFetch(), withInterceptors([AuthInterceptor])), // Enable withFetch here
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
