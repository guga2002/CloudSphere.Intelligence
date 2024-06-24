import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SignInResponse, signIn, signInErrors } from '../types/signIn';
import { Router } from '@angular/router';
import { BehaviorSubject, EMPTY, catchError } from 'rxjs';
import { signUp } from '../types/signUp';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly baseUrl = `http://localhost:5000/api/Customer/SignIn`;
  private readonly httpClient = inject(HttpClient);
  private readonly route = inject(Router);

  errors$ = new BehaviorSubject<signInErrors>({ signIn: '' });
  user$ = new BehaviorSubject<any>(null);
  inLoading$ = new BehaviorSubject<boolean>(false);
  isSignOut$ = new BehaviorSubject<boolean>(false);

  get token(): string | null {
    return localStorage.getItem('access_token');
  }

  set token(value: string) {
    localStorage.setItem('access_token', value);
  }

  get refreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  set refreshToken(value: string) {
    localStorage.setItem('refresh_token', value);
  }

  init() {
    const token = this.token;
    if (token) {
      const user = this.parseJwt(token);
      this.user$.next(user);
      console.log(user);
    }
  }

  signIn(data: signIn) {
    this.inLoading$.next(true);
    this.httpClient
      .post<SignInResponse>(this.baseUrl, data)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          const error = errorResponse.error;
          console.log(error);
          this.errors$.next({ ...this.errors$.value, signIn: error.error });
          return EMPTY;
        })
      )
      .subscribe((param) => {
        this.inLoading$.next(false);
        this.token = param.data.authToken;
        this.refreshToken = param.data.refreshToken;
        this.route.navigate(['/home'], {
          queryParams: {
            signInSuccess: true,
          },
        });
        const user = this.parseJwt(param.data.authToken);
        this.user$.next(user);
        console.log(param);
        console.log(param.data.authToken, param.data.refreshToken);
      });
  }

  signOut() {
    this.isSignOut$.next(true);
    setTimeout(() => {
      this.isSignOut$.next(false);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      this.route.navigate(['/']);
      this.user$.next(null);
    }, 2000);
  }

  parseJwt(token: string): any | null {
    try {
      const decoded = atob(token.split('.')[1]);
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }
}
