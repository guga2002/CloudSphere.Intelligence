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
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  PopularChanelResponse,
  PopularChanel,
} from '../../types/popular-chanel';
import { AllTransactionService } from '../../services/all-transaction.service';

// Register Chart.js modules
import { PieController, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-popular-chanel-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './popular-chanel-chart.component.html',
  styleUrls: ['./popular-chanel-chart.component.css'],
})
export class PopularChanelChartComponent implements OnInit, OnChanges {
  @Input() startDate: string | null = null;
  @Input() endDate: string | null = null;

  public pieChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
    labels: [],
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  public pieChartType: ChartType = 'pie';
  @ViewChild(BaseChartDirective) myPieChart!: BaseChartDirective;

  private popularChanelService = inject(AllTransactionService);

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

      this.popularChanelService
        .getPopularChanel(requestData)
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

  updateChartData(response: PopularChanelResponse) {
    const data = response.data;

    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      return;
    }

    const chartData = data.map((item: PopularChanel) => item.quantity);
    const chartLabels = data.map((item: PopularChanel) => item.channelType);

    this.pieChartData.datasets[0].data = chartData;
    this.pieChartData.labels = chartLabels;
    this.myPieChart.update();
  }
}
