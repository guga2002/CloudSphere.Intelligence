import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionQuantityComponent } from './transaction-quantity.component';

describe('TransactionQuantityComponent', () => {
  let component: TransactionQuantityComponent;
  let fixture: ComponentFixture<TransactionQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionQuantityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
