import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private Url = `http://www.cloudsphereapi.com:5000/api/Customer/Info`;
  private http = inject(HttpClient);

  getUserData(): Observable<any> {
    return this.http.get(this.Url);
  }
}
