import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCategoryChartComponent } from './popular-category-chart.component';

describe('PopularCategoryChartComponent', () => {
  let component: PopularCategoryChartComponent;
  let fixture: ComponentFixture<PopularCategoryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularCategoryChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopularCategoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
