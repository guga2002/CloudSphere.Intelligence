import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularMerchantsChartComponent } from './popular-merchants-chart.component';

describe('PopularMerchantsChartComponent', () => {
  let component: PopularMerchantsChartComponent;
  let fixture: ComponentFixture<PopularMerchantsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularMerchantsChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopularMerchantsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
