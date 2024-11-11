import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EmailJobService } from '../../services/email-job.service';
import { EmailJobDTO } from '../../models/email-job.dto.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  emailJobs: EmailJobDTO[] = [];

  constructor(
    public authService: AuthService,
    public router: Router,
    private emailJobService: EmailJobService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.loadEmailJobs();
    }
  }

  private loadEmailJobs(): void {
    this.emailJobService.getAllEmailJobs().subscribe(
      (jobs: EmailJobDTO[]) => {
        this.emailJobs = jobs;
      },
      error => {
        console.error('Error loading email jobs', error);
      }
    );
  }

  viewEmailJob(uuid: string): void {
    this.router.navigate(['/email-job', uuid]);
  }

  createEmailJob(): void {
    this.router.navigate(['/create-email-job']);
  }

  // This method is for navigating to the "Manage Users" page
  goToManageUsers(): void {
    console.log("Navigating to Manage Users...");  // Add this for debugging
    this.router.navigate(['/manage-users']);
  }

}
