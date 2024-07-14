import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { signUp } from '../types/signUp';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly baseUrl = `http://www.cloudsphereapi.com:5000/api/V2.0/Customer/Registration`;
  private readonly httpClient = inject(HttpClient);
  private readonly route = inject(Router);

  inLoading$ = new BehaviorSubject<boolean>(false);

  signUp(data: signUp) {
    this.inLoading$.next(true);
    this.httpClient.post(this.baseUrl, data).subscribe(() => {
      this.inLoading$.next(false);
      this.route.navigate(['/login'], {
        queryParams: {
          signUpSuccess: true,
        },
      });
    });
  }
}
