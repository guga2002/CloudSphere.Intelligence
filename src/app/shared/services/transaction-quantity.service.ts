import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransactionQuantityService {
  private baseUrl = `http://www.cloudsphereapi.com:5000/api/V2.0/Statistic/TransactionQuantityWithDate`;
  private http = inject(HttpClient);

  getAllData(data: object) {
    return this.http.post(this.baseUrl, data);
  }
}
