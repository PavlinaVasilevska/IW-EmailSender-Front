import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailTemplateService } from "../../services/email-template.service";

@Component({
  selector: 'app-create-email-template',
  templateUrl: './create-email-template.component.html',
  styleUrls: ['./create-email-template.component.css']
})
export class CreateEmailTemplateComponent implements OnInit {
  emailTemplateForm: FormGroup;
  successMessage?: string;
  errorMessage?: string;

  constructor(
    private fb: FormBuilder,
    private emailTemplateService: EmailTemplateService,
    private router: Router
  ) {
    this.emailTemplateForm = this.fb.group({
      subject: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.emailTemplateForm.valid) {
      this.emailTemplateService.createEmailTemplate(this.emailTemplateForm.value).subscribe(
        response => {
          this.successMessage = 'Email Template created successfully!';
          this.errorMessage = '';
          this.emailTemplateForm.reset();
        },
        error => {
          this.errorMessage = 'Error creating email template!';
          this.successMessage = '';
        }
      );
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
