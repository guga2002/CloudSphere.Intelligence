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
  ScatterController,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Chart,
} from 'chart.js';
import { TransactionQuantityService } from '../../services/transaction-quantity.service';

Chart.register(
  ScatterController,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface ScatterDataPoint {
  x: number;
  y: number;
}

@Component({
  selector: 'app-scatter-plot',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.css'],
})
export class ScatterPlotComponent implements OnInit, OnChanges {
  private transactionQuantity = inject(TransactionQuantityService);

  @Input() startDate: string | null = null;
  @Input() endDate: string | null = null;

  public scatterChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Cluster 0',
        backgroundColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
      },
      {
        data: [],
        label: 'Cluster 1',
        backgroundColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
      },
      {
        data: [],
        label: 'Cluster 2',
        backgroundColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: 'rgba(75,192,192,1)',
      },
      {
        data: [],
        label: 'Cluster 3',
        backgroundColor: 'rgba(153,102,255,1)',
        pointBackgroundColor: 'rgba(153,102,255,1)',
      },
      {
        data: [],
        label: 'Cluster 4',
        backgroundColor: 'rgba(255,159,64,1)',
        pointBackgroundColor: 'rgba(255,159,64,1)',
      },
      {
        data: [],
        label: 'Cluster 5',
        backgroundColor: 'rgba(54,162,235,1)',
        pointBackgroundColor: 'rgba(54,162,235,1)',
      },
    ],
  };

  public scatterChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  public scatterChartType: ChartType = 'scatter';
  @ViewChild(BaseChartDirective) scatterChart!: BaseChartDirective;

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

    const clusters: ScatterDataPoint[][] = [[], [], [], [], [], []];

    data.forEach((item: any) => {
      const clusterIndex = this.getClusterIndex(item.subTotal);
      const date = new Date(item.date).getTime();
      if (clusters[clusterIndex]) {
        clusters[clusterIndex].push({ x: date, y: item.subTotal });
      }
    });

    clusters.forEach((clusterData, index) => {
      this.scatterChartData.datasets[index].data = clusterData;
    });

    this.scatterChart.update();
  }

  getClusterIndex(subTotal: number): number {
    if (subTotal < 10000) {
      return 0;
    } else if (subTotal < 20000) {
      return 1;
    } else if (subTotal < 30000) {
      return 2;
    } else if (subTotal < 40000) {
      return 3;
    } else if (subTotal < 50000) {
      return 4;
    } else {
      return 5;
    }
  }
}
