import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailJobService } from '../../services/email-job.service';
import { OccurrenceService } from '../../services/occurrence.service';
import { EmailJobDTO } from '../../models/email-job.dto.model';
import { OccurrenceDTO } from '../../models/occurrence.dto.model';

@Component({
  selector: 'app-email-job-details',
  templateUrl: './email-job-details.component.html',
  styleUrls: ['./email-job-details.component.css']
})
export class EmailJobDetailsComponent implements OnInit {
  emailJob: EmailJobDTO | null = null;
  occurrences: OccurrenceDTO[] = [];
  showOccurrences = false;
  errorMessage: string | null = null;

  constructor(
    private emailJobService: EmailJobService,
    private occurrenceService: OccurrenceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmailJob();
  }

  private loadEmailJob(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (uuid) {
      this.emailJobService.getEmailJobByUuid(uuid).subscribe(
        (job: EmailJobDTO) => {
          this.emailJob = job;
          // Load occurrences if needed
          if (this.showOccurrences) {
            this.loadOccurrences();
          }
        },
        error => {
          console.error('Error fetching email job details', error);
          this.errorMessage = 'Failed to load email job details.';
        }
      );
    } else {
      this.errorMessage = 'Invalid email job identifier.';
    }
  }

  toggleOccurrences(): void {
    this.showOccurrences = !this.showOccurrences;
    if (this.showOccurrences && this.emailJob) {
      this.loadOccurrences();
    } else {
      // Clear occurrences if hiding them
      this.occurrences = [];
    }
  }

  private loadOccurrences(): void {
    if (this.emailJob) {
      this.occurrenceService.getOccurrencesByEmailJob(this.emailJob.uuid).subscribe(
        (occurrences: OccurrenceDTO[]) => {
          this.occurrences = occurrences;
        },
        error => {
          console.error('Error fetching occurrences', error);
          this.errorMessage = 'Failed to load occurrences.';
        }
      );
    }
  }

  backToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
