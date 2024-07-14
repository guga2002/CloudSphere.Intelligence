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
  PopularCategoryResponse,
  PopularCategory,
} from '../../types/popular-category';
import { MostPopularCategoryService } from '../../services/most-popular-category.service';

// Register Chart.js modules
import { PieController, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-popular-category-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './popular-category-chart.component.html',
  styleUrls: ['./popular-category-chart.component.css'],
})
export class PopularCategoryChartComponent implements OnInit, OnChanges {
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

  private popularCategoryService = inject(MostPopularCategoryService);

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

      this.popularCategoryService
        .getTheData(requestData)
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

  updateChartData(response: PopularCategoryResponse) {
    const data = response.data;

    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      return;
    }

    const chartData = data.map(
      (item: PopularCategory) => item.transactionVolume
    );
    const chartLabels = data.map(
      (item: PopularCategory) => item.transactionCategory
    );

    this.pieChartData.datasets[0].data = chartData;
    this.pieChartData.labels = chartLabels;
    this.myPieChart.update();
  }
}
