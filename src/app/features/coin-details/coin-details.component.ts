import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, NgIf } from '@angular/common';
import { ChartConfiguration, ChartType, Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

// Import the required Chart.js components
import {
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';

// Register the required Chart.js components
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
  selector: 'app-coin-details',
  standalone: true,
  imports: [CurrencyPipe, BaseChartDirective, NgIf],
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.css'],
})
export class CoinDetailsComponent implements OnInit {
  constructor(
    private data: ApiService,
    private activateRoute: ActivatedRoute
  ) {}

  coinData: any;
  coinId!: string;
  days: number = 30;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Price Trends',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',
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
    this.activateRoute.params.subscribe((val) => {
      this.coinId = val['id'];
      this.getCoinData();
      this.getGraphData(this.days);
    });
  }

  getCoinData() {
    this.data.getCurrencyById(this.coinId).subscribe((res) => {
      this.coinData = res;
      console.log(this.coinData);
    });
  }

  getGraphData(days: number) {
    this.days = days;
    this.data
      .getGrpahicalCurrencyData(this.coinId, this.days)
      .subscribe((res) => {
        setTimeout(() => {
          this.myLineChart.chart?.update();
        }, 200);
        this.lineChartData.datasets[0].data = res.prices.map((a: any) => a[1]);
        this.lineChartData.labels = res.prices.map((a: any) => {
          let date = new Date(a[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              : `${date.getHours()}:${date.getMinutes()} AM`;
          return days === 1 ? time : date.toLocaleDateString();
        });
      });
  }
}
