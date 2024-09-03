import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: any): void {
    if (form.valid) {
      this.errorMessage = null;
      this.authService.login(this.username, this.password).pipe(
        tap((response) => {
          // localStorage.setItem('access_token', response.accessToken);
          this.router.navigate(['/dashboard']);
        }),
        catchError((error) => {
          console.error('Login failed', error);
          this.errorMessage = 'Login failed. Please check your username and password.';
          return of(null);
        })
      ).subscribe();
    } else {
      this.errorMessage = 'Username and password are required.';
    }
  }
}
