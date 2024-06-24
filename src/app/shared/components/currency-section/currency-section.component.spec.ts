import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencySectionComponent } from './currency-section.component';

describe('CurrencySectionComponent', () => {
  let component: CurrencySectionComponent;
  let fixture: ComponentFixture<CurrencySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencySectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrencySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
