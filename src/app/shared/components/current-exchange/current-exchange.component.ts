import { Component } from '@angular/core';
import { CurrentApiService } from '../../services/current-api.service';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-current-exchange',
  standalone: true,
  imports: [FormsModule, DecimalPipe, NgFor, NgIf],
  templateUrl: './current-exchange.component.html',
  styleUrl: './current-exchange.component.css',
})
export class CurrentExchangeComponent {
  currencies: string[] = [
    'USD',
    'EUR',
    'GBP',
    'JPY',
    'AUD',
    'CAD',
    'CHF',
    'CNY',
    'SEK',
    'NZD',
    'INR',
    'BRL',
    'RUB',
    'MXN',
    'ZAR',
    'KRW',
    'SGD',
    'HKD',
  ];
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  amount: number = 1;
  exchangeRate!: number;
  convertedAmount!: number;
  rates: { [key: string]: number } = {};

  constructor(private currentApi: CurrentApiService) {}

  ngOnInit() {
    this.getRates();
  }

  getRates() {
    this.currentApi.getExchangeRates(this.fromCurrency).subscribe((data) => {
      this.rates = data.rates;
    });
  }

  convertCurrency() {
    this.exchangeRate = this.rates[this.toCurrency];
    this.convertedAmount = this.amount * this.exchangeRate;
  }
}
