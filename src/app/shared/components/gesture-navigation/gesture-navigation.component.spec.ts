import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestureNavigationComponent } from './gesture-navigation.component';

describe('GestureNavigationComponent', () => {
  let component: GestureNavigationComponent;
  let fixture: ComponentFixture<GestureNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestureNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestureNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
