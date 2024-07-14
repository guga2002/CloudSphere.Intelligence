import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PopularCategoryResponse } from '../types/popular-category';
import { PopularLocationResponse } from '../types/popular-location';
import { MerchantResponse } from '../types/popular-merchants';
import { PopularChanelResponse } from '../types/popular-chanel';
import { Transaction } from '../types/all-transaction';

@Injectable({
  providedIn: 'root',
})
export class AllTransactionService {
  private allTransaction = `http://www.cloudsphereapi.com:5000/api/V2.0/Statistic/AllTransactionBetweenDate`;
  private popularChanel = `http://www.cloudsphereapi.com:5000/api/V2.0/Statistic/MostPopularChannel`;
  private popularLocation = `http://www.cloudsphereapi.com:5000/api/V2.0/Statistic/MostPopularLocation`;
  private popularMerchants = `http://www.cloudsphereapi.com:5000/api/V2.0/Statistic/MostPopularMerchants`;
  private http = inject(HttpClient);

  getAllTransaction(data: object): Observable<Transaction> {
    return this.http.post<Transaction>(this.allTransaction, data);
  }

  getPopularChanel(data: object): Observable<PopularChanelResponse> {
    return this.http.post<PopularChanelResponse>(this.popularChanel, data);
  }

  getPopularLocation(data: object): Observable<PopularLocationResponse> {
    return this.http.post<PopularLocationResponse>(this.popularLocation, data);
  }

  getPopularMerchants(data: object): Observable<MerchantResponse> {
    return this.http.post<MerchantResponse>(this.popularMerchants, data);
  }
}
