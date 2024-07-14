import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularChanelChartComponent } from './popular-chanel-chart.component';

describe('PopularChanelChartComponent', () => {
  let component: PopularChanelChartComponent;
  let fixture: ComponentFixture<PopularChanelChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularChanelChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopularChanelChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
