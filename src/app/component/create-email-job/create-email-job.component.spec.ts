import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEmailJobComponent } from "/src/app/component/create-email-job"
describe('CreateEmailJobComponent', () => {
  let component: CreateEmailJobComponent;
  let fixture: ComponentFixture<CreateEmailJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEmailJobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmailJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
