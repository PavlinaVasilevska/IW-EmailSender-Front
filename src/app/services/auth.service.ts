import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserDTO } from '../models/user.dto.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/authenticate';
  private registerUrl = 'http://localhost:8080/register';
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user: Observable<any> = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute
  ) {}

  // Login method
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.authUrl, { username, password }).pipe(
      tap(response => {
        console.log(response.access_token);
        localStorage.setItem('access_token', response.access_token);
      })
    );
  }

  // Registration method
  register(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(this.registerUrl, user).pipe(
      tap(response => {
        console.log('User registered successfully:', response);
      })
    );
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return isPlatformBrowser(this.platformId) && !!localStorage.getItem('access_token');
  }

  // Retrieve user data from localStorage
  getUser(): any {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        return JSON.parse(user);
      } catch (e) {
        console.error('Error parsing user data from localStorage', e);
        return {};
      }
    }
    return {};
  }
}
