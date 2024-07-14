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
import {
  PopularChanel,
  PopularChanelResponse,
} from '../../types/popular-chanel';

@Component({
  selector: 'app-popular-chanel',
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
  templateUrl: './popular-chanel.component.html',
  styleUrls: ['./popular-chanel.component.css'],
})
export class PopularChanelComponent implements OnInit, OnChanges {
  @Input() startDate: string = '';
  @Input() endDate: string = '';

  dataSource!: MatTableDataSource<PopularChanel>;
  displayedColumns: string[] = ['channelType', 'quantity', 'volume', 'average'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private popularChanelService = inject(AllTransactionService);

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

    this.popularChanelService.getPopularChanel(data).subscribe(
      (result: PopularChanelResponse) => {
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
