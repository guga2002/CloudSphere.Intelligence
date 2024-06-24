import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {
  BarController,
  BarElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  Chart,
} from 'chart.js';
import { TransactionQuantityService } from '../../services/transaction-quantity.service';

Chart.register(
  BarController,
  BarElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

@Component({
  selector: 'app-chart-bar',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.css'],
})
export class ChartBarComponent implements OnInit, OnChanges {
  private transactionQuantity = inject(TransactionQuantityService);

  @Input() startDate: string | null = null;
  @Input() endDate: string | null = null;

  public barChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Transaction Quantity',
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

      this.transactionQuantity
        .getAllData(requestData)
        .pipe(
          catchError((error) => {
            console.error('Error occurred:', error);
            return of([]);
          })
        )
        .subscribe((response) => {
          console.log('Response:', response);
          setTimeout(() => {
            this.updateChartData(response);
          }, 200);
        });
    }
  }

  updateChartData(response: any) {
    const data = response.data;

    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      return;
    }

    const chartData = data.map((item: any) => item.subTotal);
    const chartLabels = data.map((item: any) =>
      new Date(item.date).toLocaleDateString()
    );

    this.barChartData.datasets[0].data = chartData;
    this.barChartData.labels = chartLabels;
    this.myBarChart.update();
  }
}
