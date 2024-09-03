import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/authenticate';
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user: Observable<any> = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute
  ) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.authUrl, { username, password }).pipe(
      tap(response => {
        console.log(response.access_token)
          localStorage.setItem('access_token', response.access_token);
      })
    );
  }

  isLoggedIn(): boolean {
    return isPlatformBrowser(this.platformId) && !!localStorage.getItem('access_token');
  }

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
