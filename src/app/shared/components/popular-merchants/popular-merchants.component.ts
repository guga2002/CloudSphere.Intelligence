import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AllTransactionService } from '../../services/all-transaction.service';
import { Merchant, MerchantResponse } from '../../types/popular-merchants'; // Adjust the path as needed

@Component({
  selector: 'app-popular-merchants',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
  ],
  templateUrl: './popular-merchants.component.html',
  styleUrls: ['./popular-merchants.component.css'],
})
export class PopularMerchantsComponent implements OnInit, OnChanges {
  @Input() startDate: string = '';
  @Input() endDate: string = '';

  dataSource!: MatTableDataSource<Merchant>;
  displayedColumns: string[] = ['name', 'volume', 'quantity', 'average'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private popularMerchantsService: AllTransactionService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDate'] || changes['endDate']) {
      this.fetchData();
    }
  }

  fetchData(): void {
    const data = {
      start: this.startDate,
      end: this.endDate,
    };

    this.popularMerchantsService.getPopularMerchants(data).subscribe(
      (result: MerchantResponse) => {
        console.log('API response:', result);
        if (result && result.data) {
          this.dataSource = new MatTableDataSource(result.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          console.error('Invalid API response structure:', result);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
