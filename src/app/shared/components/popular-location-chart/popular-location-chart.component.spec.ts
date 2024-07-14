import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularLocationChartComponent } from './popular-location-chart.component';

describe('PopularLocationChartComponent', () => {
  let component: PopularLocationChartComponent;
  let fixture: ComponentFixture<PopularLocationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularLocationChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopularLocationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
