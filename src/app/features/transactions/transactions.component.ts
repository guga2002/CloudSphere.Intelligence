import { Component, OnInit, inject } from '@angular/core';
import { ChartBarComponent } from '../../shared/components/chart-bar/chart-bar.component';
import { FormsModule } from '@angular/forms';
import { TransactionQuantityComponent } from '../../shared/components/transaction-quantity/transaction-quantity.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ScatterPlotComponent } from '../../shared/components/scatter-plot/scatter-plot.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    ChartBarComponent,
    TransactionQuantityComponent,
    ScatterPlotComponent,
    FormsModule,
  ],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private route = inject(Router);
  public startDate: string | null = '2024-05-12';
  public endDate: string | null = '2024-06-12';
  public graphType: string | null = 'line-chart';

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const startDateParam = params.get('startDate');
      const endDateParam = params.get('endDate');
      const graphTypeParam = params.get('graphType');

      if (!startDateParam || !endDateParam || !graphTypeParam) {
        this.route.navigate([], {
          queryParams: {
            startDate: startDateParam || this.startDate,
            endDate: endDateParam || this.endDate,
            graphType: graphTypeParam || this.graphType,
          },
        });
      } else {
        this.startDate = startDateParam;
        this.endDate = endDateParam;
        this.graphType = graphTypeParam;
      }

      console.log(this.startDate, this.endDate, this.graphType);
    });
  }

  onDateChange(): void {
    console.log('Date range updated:', this.startDate, this.endDate);
    this.route.navigate([], {
      queryParams: {
        startDate: this.startDate,
        endDate: this.endDate,
        graphType: this.graphType,
      },
    });
  }
}
