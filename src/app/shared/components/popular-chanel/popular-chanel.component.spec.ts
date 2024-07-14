import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularChanelComponent } from './popular-chanel.component';

describe('PopularChanelComponent', () => {
  let component: PopularChanelComponent;
  let fixture: ComponentFixture<PopularChanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularChanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopularChanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
