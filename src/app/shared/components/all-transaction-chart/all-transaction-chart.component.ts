import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AllTransactionService } from '../../services/all-transaction.service';
import { Transaction } from '../../types/all-transaction';

@Component({
  selector: 'app-all-transaction-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './all-transaction-chart.component.html',
  styleUrls: ['./all-transaction-chart.component.css'],
})
export class AllTransactionChartComponent implements OnInit, OnChanges {
  @Input() startDate: string | null = null;
  @Input() endDate: string | null = null;

  public barChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Transaction Amount',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
    labels: [],
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: { display: true },
    },
  };

  public barChartType: ChartType = 'bar';
  @ViewChild(BaseChartDirective) myBarChart!: BaseChartDirective;

  private allTransactionService = inject(AllTransactionService);

  ngOnInit(): void {
    this.fetchChartData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDate'] || changes['endDate']) {
      this.fetchChartData();
    }
  }

  fetchChartData(): void {
    if (this.startDate && this.endDate) {
      const requestData = {
        start: this.startDate,
        end: this.endDate,
      };

      this.allTransactionService
        .getAllTransaction(requestData)
        .pipe(
          catchError((error) => {
            console.error('Error occurred:', error);
            return of({ data: [] });
          })
        )
        .subscribe((response: any) => {
          console.log('API response:', response);
          this.updateChartData(response);
        });
    }
  }

  updateChartData(response: any) {
    const data = response.data;

    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      return;
    }

    const chartData = data.map((item: Transaction) => item.amount);
    const chartLabels = data.map(
      (item: Transaction) => `Transaction ${item.merchantId}`
    );

    this.barChartData.datasets[0].data = chartData;
    this.barChartData.labels = chartLabels;
    this.myBarChart.update();
  }
}
