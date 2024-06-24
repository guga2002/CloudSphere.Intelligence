import { HeaderComponent } from './shared/components/header/header.component';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { RegistrateComponent } from './features/registrate/registrate.component';
import { LoginService } from './shared/services/login.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegistrateComponent,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly signIn = inject(LoginService);
  private readonly activatedRoute = inject(ActivatedRoute);
  user$ = this.signIn.user$;
  signInSuccess: boolean = false;
  menuOpen: boolean = false;

  constructor() {
    this.signIn.init();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.signInSuccess = Boolean(param.get('signInSuccess'));
      setTimeout(() => {
        this.signInSuccess = false;
      }, 3000);
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
