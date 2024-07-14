import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatTableComponent } from './heat-table.component';

describe('HeatTableComponent', () => {
  let component: HeatTableComponent;
  let fixture: ComponentFixture<HeatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeatTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
