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
  error: string = '';

  displayedColumns: string[] = ['uuid', 'username', 'email', 'roles', 'actions'];

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
        this.error = 'Failed to load users';
        this.loading = false;
      }
    );
  }

  deleteUser(uuid: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(uuid).subscribe(
        () => {
          this.users = this.users.filter(user => user.uuid !== uuid);
          alert('User deleted successfully');
        },
        (error) => {
          this.error = 'Error deleting user';
        }
      );
    }
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  addNewUser(): void {
    this.router.navigate(['/add-user']);  // Adjust the route as per your app structure
  }
}
