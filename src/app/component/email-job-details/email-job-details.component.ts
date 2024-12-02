import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailJobService } from '../../services/email-job.service';
import { OccurrenceService } from '../../services/occurrence.service';
import { EmailJobDTO, FrequencyEnum } from '../../models/email-job.dto.model';
import { OccurrenceDTO, StatusEnum } from '../../models/occurrence.dto.model';

@Component({
  selector: 'app-email-job-details',
  templateUrl: './email-job-details.component.html',
  styleUrls: ['./email-job-details.component.css']
})
export class EmailJobDetailsComponent implements OnInit {
  emailJob: EmailJobDTO | null = null;
  occurrences: OccurrenceDTO[] = [];
  selectedOccurrence: OccurrenceDTO | null = null;
  showOccurrences = false;
  errorMessage: string | null = null;
  StatusEnum = StatusEnum;

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
          console.log('Fetched email job:', job);
          this.emailJob = job;
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

  viewOccurrencesDetails(): void {
    if (this.emailJob) {
      this.occurrenceService.getOccurrencesByEmailJob(this.emailJob.uuid).subscribe(
        (occurrences: OccurrenceDTO[]) => {
          this.occurrences = occurrences;
          this.showOccurrences = true;
          if (occurrences.length === 0) {
            this.errorMessage = 'No occurrences available.';
          } else {
            this.errorMessage = null;
          }
        },
        error => {
          console.error('Error fetching occurrences', error);
          this.errorMessage = 'Failed to load occurrences.';
        }
      );
    }
  }

  toggleOccurrencesDetails(): void {
    if (!this.showOccurrences) {
      this.viewOccurrencesDetails();
    } else {
      this.showOccurrences = false;
      this.errorMessage = null;
    }
  }

  backToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  getFrequencyDisplay(frequency: FrequencyEnum): string {
    const frequencyMap: { [key in FrequencyEnum]: string } = {
      [FrequencyEnum.DAILY]: 'Daily',
      [FrequencyEnum.WEEKLY]: 'Weekly',
      [FrequencyEnum.MONTHLY]: 'Monthly',
      [FrequencyEnum.YEARLY]: 'Yearly'
    };
    return frequencyMap[frequency] || 'Unknown';
  }

  goToOccurrenceDetails(occurrence: OccurrenceDTO): void {
    this.selectedOccurrence = occurrence;
    this.router.navigate(['/occurrence-details', occurrence.uuid]);
  }

  confirmDelete(): void {
    if (this.emailJob && confirm('Are you sure you want to delete this email job?')) {
      this.emailJobService.deleteEmailJob(this.emailJob.uuid!).subscribe(() => {
        alert('Email Job deleted successfully.');
        this.router.navigate(['/dashboard']); // Redirect to the dashboard after deletion
      });
    }
  }

}
