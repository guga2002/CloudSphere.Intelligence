import { Component, inject } from '@angular/core';
import { HomeImgContainerComponent } from '../../shared/components/home-img-container/home-img-container.component';
import { SecondSectionComponent } from '../../shared/components/second-section/second-section.component';
import { CurrencySectionComponent } from '../../shared/components/currency-section/currency-section.component';
import { CurrentExchangeComponent } from '../../shared/components/current-exchange/current-exchange.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { MoreInfoComponent } from '../../shared/components/more-info/more-info.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeImgContainerComponent,
    SecondSectionComponent,
    CurrencySectionComponent,
    CurrentExchangeComponent,
    FooterComponent,
    MoreInfoComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
