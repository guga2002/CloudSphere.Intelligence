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
import {
  PopularLocation,
  PopularLocationResponse,
} from '../../types/popular-location'; // Adjust the path as needed

@Component({
  selector: 'app-popular-location',
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
  templateUrl: './popular-location.component.html',
  styleUrls: ['./popular-location.component.css'],
})
export class PopularLocationComponent implements OnInit, OnChanges {
  @Input() startDate: string = '';
  @Input() endDate: string = '';

  dataSource!: MatTableDataSource<PopularLocation>;
  displayedColumns: string[] = ['location', 'quantity'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private popularLocationService: AllTransactionService) {}

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

    this.popularLocationService.getPopularLocation(data).subscribe(
      (result: PopularLocationResponse) => {
        console.log('API response:', result);
        if (result && result.data) {
          this.dataSource = new MatTableDataSource(result.data);
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
