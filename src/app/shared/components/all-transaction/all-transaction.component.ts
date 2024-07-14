import {
  Component,
  OnInit,
  ViewChild,
  Input,
  SimpleChanges,
  OnChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AllTransactionService } from '../../services/all-transaction.service';
import { Transaction } from '../../types/all-transaction';

@Component({
  selector: 'app-all-transaction',
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
  templateUrl: './all-transaction.component.html',
  styleUrls: ['./all-transaction.component.css'],
})
export class AllTransactionComponent implements OnInit, OnChanges {
  @Input() startDate: string = '';
  @Input() endDate: string = '';

  dataSource!: MatTableDataSource<Transaction>;
  displayedColumns: string[] = [
    'transactionId',
    'date',
    'amount',
    'categoryId',
    'channelId',
    'currencyNameId',
    'equivalentInGel',
    'merchantId',
    'status',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private allTransactionService = inject(AllTransactionService);

  ngOnInit(): void {
    this.fetchData();
  }

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

    this.allTransactionService.getAllTransaction(data).subscribe(
      (result: any) => {
        console.log('API response:', result);
        if (result && result.data) {
          const transactions = result.data.map((item: any) => ({
            ...item,
            transactionId: `T-${Math.floor(Math.random() * 1000000)}`,
            status: Math.random() > 0.5 ? 'Completed' : 'Pending',
          }));
          this.dataSource = new MatTableDataSource(transactions);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log('Data source initialized:', this.dataSource);
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
