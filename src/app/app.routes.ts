import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { RegistrateComponent } from './features/registrate/registrate.component';
import { CoinDetailsComponent } from './features/coin-details/coin-details.component';
import { NotFoundPageComponent } from './features/not-found-page/not-found-page.component';
import { FeedbackComponent } from './features/feedback/feedback.component';
import { AboutComponent } from './features/about/about.component';
import { CryptoComponent } from './features/crypto/crypto.component';
import { BlockchainComponent } from './features/blockchain/blockchain.component';
import { TradingComponent } from './features/trading/trading.component';
import { NewsComponent } from './features/news/news.component';
import { TransactionsComponent } from './features/transactions/transactions.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrateComponent },
  { path: 'coin-details/:id', component: CoinDetailsComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'about', component: AboutComponent },
  { path: 'crypto', component: CryptoComponent },
  { path: 'blockchain', component: BlockchainComponent },
  { path: 'trading', component: TradingComponent },
  { path: 'news', component: NewsComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: '**', component: NotFoundPageComponent },
];
