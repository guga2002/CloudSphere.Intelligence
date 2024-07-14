import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MostPopularCategoryService } from '../../shared/services/most-popular-category.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PopularCategoryResponse,
  PopularCategory,
} from '../../shared/models/../types/popular-category'; // Adjust the import path as necessary
import { AllTransactionComponent } from '../../shared/components/all-transaction/all-transaction.component';
import { PopularChanelComponent } from '../../shared/components/popular-chanel/popular-chanel.component';
import { PopularLocationComponent } from '../../shared/components/popular-location/popular-location.component';
import { PopularMerchantsComponent } from '../../shared/components/popular-merchants/popular-merchants.component';
import { PopularMerchantsChartComponent } from '../../shared/components/popular-merchants-chart/popular-merchants-chart.component';
import { PopularCategoryChartComponent } from '../../shared/components/popular-category-chart/popular-category-chart.component';
import { PopularLocationChartComponent } from '../../shared/components/popular-location-chart/popular-location-chart.component';
import { PopularChanelChartComponent } from '../../shared/components/popular-chanel-chart/popular-chanel-chart.component';
import { AllTransactionChartComponent } from '../../shared/components/all-transaction-chart/all-transaction-chart.component';

@Component({
  selector: 'app-popular-category',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    AllTransactionComponent,
    PopularChanelComponent,
    PopularLocationComponent,
    PopularMerchantsComponent,
    PopularMerchantsChartComponent,
    PopularCategoryChartComponent,
    PopularLocationChartComponent,
    PopularChanelChartComponent,
    AllTransactionChartComponent,
  ],
  templateUrl: './popular-category.component.html',
  styleUrls: ['./popular-category.component.css'],
})
export class PopularCategoryComponent implements OnInit {
  dataSource!: MatTableDataSource<PopularCategory>;
  displayedColumns: string[] = [
    'transactionCategory',
    'transactionTypeId',
    'transactionCount',
    'transactionVolume',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public startDate: string = '2024-05-10';
  public endDate: string = '2024-06-10';
  public tableType: string | null = 'popular-category';

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  constructor(private popularCategories: MostPopularCategoryService) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const startDateParam = params.get('startDate');
      const endDateParam = params.get('endDate');

      if (!startDateParam || !endDateParam) {
        this.router.navigate([], {
          queryParams: {
            startDate: startDateParam || this.startDate,
            endDate: endDateParam || this.endDate,
          },
          queryParamsHandling: 'merge',
        });
      } else {
        this.startDate = startDateParam!;
        this.endDate = endDateParam!;
      }

      this.fetchData();
    });
  }

  fetchData(): void {
    const data = {
      start: this.startDate,
      end: this.endDate,
    };

    this.popularCategories.getTheData(data).subscribe(
      (result: PopularCategoryResponse) => {
        // console.log('API response:', result);
        if (result && result.data) {
          this.dataSource = new MatTableDataSource(result.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // console.log('Data source initialized:', this.dataSource);
        } else {
          console.error('Invalid API response structure:', result);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  onDateChange(): void {
    this.router.navigate([], {
      queryParams: {
        startDate: this.startDate,
        endDate: this.endDate,
      },
      queryParamsHandling: 'merge',
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
