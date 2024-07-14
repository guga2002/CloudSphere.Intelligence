import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  Chart,
  ChartConfiguration,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TransactionQuantityService } from '../../services/transaction-quantity.service';
import 'chartjs-adapter-date-fns';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { parseISO } from 'date-fns';

interface ChartDataResponse {
  data: {
    date: string;
    subTotal: number;
  }[];
}

interface MatrixDataPoint {
  x: number;
  y: number;
  v: number;
}

Chart.register(
  Title,
  Tooltip,
  Legend,
  TimeScale,
  CategoryScale,
  LinearScale,
  MatrixController,
  MatrixElement
);

@Component({
  selector: 'app-heat-table',
  standalone: true,
  templateUrl: './heat-table.component.html',
  styleUrls: ['./heat-table.component.css'],
  imports: [BaseChartDirective],
})
export class HeatTableComponent implements OnInit, OnChanges {
  @Input() startDate: string | null = null;
  @Input() endDate: string | null = null;

  public heatmapChartData: ChartConfiguration<'matrix'>['data'] = {
    datasets: [
      {
        data: [],
        backgroundColor: (context) => {
          const raw = context.raw as MatrixDataPoint;
          if (!raw) return 'rgba(0, 128, 128, 0)';
          const value = raw.v;
          const alpha = value / 68148;
          return `rgba(0, 128, 128, ${alpha})`;
        },
        borderWidth: 1,
      },
    ],
  };

  public heatmapChartOptions: ChartConfiguration<'matrix'>['options'] = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM d',
          },
        },
        offset: true,
        grid: {
          display: false,
        },
      },
      y: {
        type: 'category',
        labels: ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'],
        reverse: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const raw = tooltipItem.raw as MatrixDataPoint;
            if (!raw) {
              return 'No data';
            }
            const date = new Date(raw.x);
            const dayLabels = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
            const dayLabel = dayLabels[date.getDay()]; // Get day label based on date
            const value = raw.v;
            return `Date: ${date.toLocaleDateString()}, Day: ${dayLabel}, Value: ${value}`;
          },
        },
      },
    },
  };

  public heatmapChartType: 'matrix' = 'matrix';
  @ViewChild(BaseChartDirective) myHeatmapChart!: BaseChartDirective;

  constructor(private transactionQuantity: TransactionQuantityService) {}

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
            console.error('Error occurred while fetching data:', error);
            return of({ data: [] } as ChartDataResponse);
          })
        )
        .subscribe((response: ChartDataResponse | any) => {
          if ('data' in response) {
            this.updateChartData(response);
          } else {
            console.error('Unexpected response format:', response);
          }
        });
    }
  }

  updateChartData(response: ChartDataResponse): void {
    const data = response.data;

    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      return;
    }

    console.log('Received data from API:', data);

    const chartData: MatrixDataPoint[] = data
      .map((item) => {
        const date = parseISO(item.date); // Use parseISO to handle ISO string

        if (isNaN(date.getTime())) {
          console.error('Invalid date format:', item.date);
          return null;
        }

        const dayOfWeek = date.getDay(); // Use getDay instead of getUTCDay

        console.log(`Processing date: ${item.date}, Day of Week: ${dayOfWeek}`);
        return {
          x: date.getTime(),
          y: dayOfWeek, // Use the correct day of the week based on the date
          v: item.subTotal,
        };
      })
      .filter((item): item is MatrixDataPoint => item !== null); // Filter out null values

    console.log('Chart Data:', chartData);

    if (chartData.length === 0) {
      console.warn('No data available to display.');
      this.heatmapChartData.datasets[0].data = [];
    } else {
      this.heatmapChartData.datasets[0].data = chartData;
    }

    console.log('Heatmap Chart Data:', this.heatmapChartData);

    setTimeout(() => {
      if (this.myHeatmapChart && this.myHeatmapChart.chart) {
        this.myHeatmapChart.chart.update();
        console.log('Chart updated with new data.');
      } else {
        console.error('Chart not found or not initialized.');
      }
    }, 0);
  }
}
