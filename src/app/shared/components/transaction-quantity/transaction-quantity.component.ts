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
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  Chart,
} from 'chart.js';
import { TransactionQuantityService } from '../../services/transaction-quantity.service';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

@Component({
  selector: 'app-transaction-quantity',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './transaction-quantity.component.html',
  styleUrls: ['./transaction-quantity.component.css'],
})
export class TransactionQuantityComponent implements OnInit, OnChanges {
  private transactionQuantity = inject(TransactionQuantityService);

  @Input() startDate: string | null = null;
  @Input() endDate: string | null = null;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Transaction Quantity',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1,
      },
    },
    plugins: {
      legend: { display: true },
    },
  };

  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart!: BaseChartDirective;

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

    this.lineChartData.datasets[0].data = chartData;
    this.lineChartData.labels = chartLabels;
    this.myLineChart.update();
  }
}
