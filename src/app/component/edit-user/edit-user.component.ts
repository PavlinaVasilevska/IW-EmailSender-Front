import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDTO } from '../../models/user.dto.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  user: UserDTO = {} as UserDTO;
  userId!: string;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {
    this.editUserForm = this.fb.group({
      uuid: [{ value: '', disabled: true }],
      username: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      roleName: ['', Validators.required], // Role name as a simple editable field
    });
  }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('uuid')!;
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUserByUuid(this.userId).subscribe(
      (data: UserDTO) => {
        this.user = data;

        // Populate form fields
        this.editUserForm.patchValue({
          uuid: this.user.uuid,
          username: this.user.username,
          name: this.user.name,
          surname: this.user.surname,
          email: this.user.email,
          password: this.user.password,
          roleName: Array.isArray(this.user.roles) && this.user.roles.length > 0
            ? this.user.roles.map(role => role.roleName).join(', ') // Correct mapping here
            : '' // Fallback in case roles is undefined or empty
        });

        console.log('Loaded user roles:', this.user.roles); // Debug log to confirm roles
        this.cdr.detectChanges(); // Trigger change detection to ensure the form updates
      },
      (error) => {
        console.error('Error loading user:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.editUserForm.invalid) {
      return;
    }

    const updatedUser = { ...this.editUserForm.getRawValue() };

    // Convert the comma-separated role names back into an array of role objects
    updatedUser.roles = updatedUser.roleName.split(',').map((roleName: string) => ({
      roleName: roleName.trim()
    }));

    // Make the API call to update the user
    this.userService.updateUser(this.userId, updatedUser).subscribe(
      () => {
        alert('User updated successfully');
        this.router.navigate(['/manage-users']);
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/manage-users']);
  }
}
