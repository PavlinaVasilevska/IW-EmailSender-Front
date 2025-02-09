import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { UserDTO } from "../../models/user.dto.model";
import { RoleService } from "../../services/role.service"; // Import RoleService
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  user: UserDTO = {
    uuid: '',
    createdOn: new Date(),
    username: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    roles: [],
  };

  roles: string[] = []; // Store roles from the database
  isSuccess: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private roleService: RoleService, // Inject RoleService
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRoles(); // Load roles when component initializes
  }

  loadRoles() {
    this.roleService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles.map(role => role.roleName); // Assuming backend returns objects with 'roleName'
      },
      error: (error) => {
        console.error('Error fetching roles:', error);
        this.errorMessage = 'Failed to load roles from the database.';
      }
    });
  }

  onSubmit(registerForm: NgForm) {
    if (registerForm.invalid) {
      this.errorMessage = 'All fields are mandatory. Please fill them out correctly.';
      this.isError = true;
      this.isSuccess = false;
      return;
    }

    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('User registered:', response);
        this.isSuccess = true;
        this.isError = false;
        this.successMessage = 'User registered successfully!';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/manage-users']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error registering user:', error);
        this.isError = true;
        this.isSuccess = false;
        this.errorMessage = 'An error occurred while registering the user.';
        this.successMessage = '';
      },
    });
  }

  onCancel() {
    this.router.navigate(['/manage-users']);
  }
}
