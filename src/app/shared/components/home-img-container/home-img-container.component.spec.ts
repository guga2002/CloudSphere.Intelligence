import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeImgContainerComponent } from './home-img-container.component';

describe('HomeImgContainerComponent', () => {
  let component: HomeImgContainerComponent;
  let fixture: ComponentFixture<HomeImgContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeImgContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeImgContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
