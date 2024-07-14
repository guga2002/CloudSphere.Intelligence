import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PopularCategoryResponse } from '../types/popular-category';

@Injectable({
  providedIn: 'root',
})
export class MostPopularCategoryService {
  private baseUrl = `http://www.cloudsphereapi.com:5000/api/V2.0/Statistic/MostPopularCategory`;
  private http = inject(HttpClient);

  getTheData(data: object): Observable<PopularCategoryResponse> {
    return this.http.post<PopularCategoryResponse>(this.baseUrl, data);
  }
}
