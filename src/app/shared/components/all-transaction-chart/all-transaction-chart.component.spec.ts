import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTransactionChartComponent } from './all-transaction-chart.component';

describe('AllTransactionChartComponent', () => {
  let component: AllTransactionChartComponent;
  let fixture: ComponentFixture<AllTransactionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTransactionChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllTransactionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
