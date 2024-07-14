import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ChartConfiguration, ChartType, Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { AllTransactionService } from '../../services/all-transaction.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PopularLocation, PopularLocationResponse } from '../../types/popular-location';

// Register Chart.js modules
import { BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

@Component({
  selector: 'app-popular-location-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './popular-location-chart.component.html',
  styleUrls: ['./popular-location-chart.component.css'],
})
export class PopularLocationChartComponent implements OnInit, OnChanges {
  @Input() startDate: string | null = null;
  @Input() endDate: string | null = null;

  public barChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Quantity',
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

  private popularLocationService = inject(AllTransactionService);

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

      this.popularLocationService
        .getPopularLocation(requestData)
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

  updateChartData(response: PopularLocationResponse) {
    const data = response.data;

    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      return;
    }

    const chartData = data.map((item: PopularLocation) => item.quantity);
    const chartLabels = data.map((item: PopularLocation) => item.location);

    this.barChartData.datasets[0].data = chartData;
    this.barChartData.labels = chartLabels;
    this.myBarChart.update();
  }
}
