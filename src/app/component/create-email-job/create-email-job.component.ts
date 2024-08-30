import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailJobDTO, FrequencyEnum } from '../../models/email-job.dto.model';
import { EmailJobService } from '../../services/email-job.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-email-job',
  templateUrl: './create-email-job.component.html',
  styleUrls: ['./create-email-job.component.css']
})
export class CreateEmailJobComponent implements OnInit {
  emailJobForm: FormGroup;
  FrequencyEnum = FrequencyEnum;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private emailJobService: EmailJobService,
    private router: Router
  ) {
    this.emailJobForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: [''],
      enabled: [true, Validators.required],
      emailTemplateUuid: ['', Validators.required],
      senderUuid: ['', Validators.required],
      receivers: ['', Validators.required],
      frequency: [FrequencyEnum.DAILY, Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.emailJobForm.valid) {
      const receivers = this.emailJobForm.get('receivers')?.value as string;

      const newJob: EmailJobDTO = {
        uuid: '',
        startDate: new Date(this.emailJobForm.get('startDate')?.value),
        endDate: this.emailJobForm.get('endDate')?.value ? new Date(this.emailJobForm.get('endDate')?.value) : undefined,
        enabled: this.emailJobForm.get('enabled')?.value,
        emailTemplate: {
          uuid: this.emailJobForm.get('emailTemplateUuid')?.value
        },
        sender: {
          uuid: this.emailJobForm.get('senderUuid')?.value
        },
        receivers: receivers,
        frequency: this.emailJobForm.get('frequency')?.value as FrequencyEnum,
        occurrences: []  // Ensure this matches the expected type
      };

      this.emailJobService.createEmailJob(newJob).subscribe(
        response => {
          this.successMessage = 'Email job created successfully!';
          this.errorMessage = '';
          this.emailJobForm.reset();
        },
        error => {
          this.errorMessage = 'Failed to create email job. Please try again.';
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Form is invalid. Please fill out all required fields.';
      this.successMessage = '';
      this.emailJobForm.markAllAsTouched();
    }
  }

  backToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
