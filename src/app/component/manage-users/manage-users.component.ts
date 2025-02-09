import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDTO } from '../../models/user.dto.model';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: UserDTO[] = [];
  loading: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';
  showDeleteConfirmation: boolean = false; // Flag for modal visibility
  userToDelete: UserDTO | null = null; // Store user to delete

  displayedColumns: string[] = ['uuid', 'username', 'name', 'surname', 'email', 'roles', 'actions'];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: UserDTO[]) => {
        this.users = data;
        this.loading = false;
      },
      (err) => {
        this.errorMessage = 'Failed to load users';
        this.loading = false;
      }
    );
  }

  deleteUser(uuid: string): void {
    // Find the user to delete
    this.userToDelete = this.users.find(user => user.uuid === uuid) || null;
    // Show the confirmation modal
    this.showDeleteConfirmation = true;
  }

  confirmDelete(): void {
    if (this.userToDelete) {
      this.userService.deleteUser(this.userToDelete.uuid).subscribe(
        () => {
          // Remove the deleted user from the list
          this.users = this.users.filter(user => user.uuid !== this.userToDelete?.uuid);
          this.showDeleteConfirmation = false; // Close the modal
          this.successMessage = 'User deleted successfully'; // Show success message
          setTimeout(() => this.successMessage = '', 3000); // Hide message after 3 seconds
        },
        (error) => {
          this.errorMessage = 'Error deleting user'; // Show error message
          this.showDeleteConfirmation = false; // Close the modal
          setTimeout(() => this.errorMessage = '', 3000); // Hide message after 3 seconds
        }
      );
    }
  }

  cancelDelete(): void {
    this.showDeleteConfirmation = false; // Close the modal without deleting
    this.userToDelete = null; // Clear the user to delete
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  navigateToRegisterUser() {
    this.router.navigate(['/register-user']); // Adjust route as needed
  }

  editUser(uuid: string): void {
    this.router.navigate(['/edit-user', uuid]);
  }
}
