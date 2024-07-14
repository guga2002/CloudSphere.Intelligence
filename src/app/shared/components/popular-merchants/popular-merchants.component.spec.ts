import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularMerchantsComponent } from './popular-merchants.component';

describe('PopularMerchantsComponent', () => {
  let component: PopularMerchantsComponent;
  let fixture: ComponentFixture<PopularMerchantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularMerchantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopularMerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
