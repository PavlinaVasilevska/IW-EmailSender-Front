import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailJobDetailsComponent } from './email-job-details.component';

describe('EmailJobDetailsComponent', () => {
  let component: EmailJobDetailsComponent;
  let fixture: ComponentFixture<EmailJobDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailJobDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
