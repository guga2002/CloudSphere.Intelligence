import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-second-section',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './second-section.component.html',
  styleUrl: './second-section.component.css',
})
export class SecondSectionComponent {
  private readonly signIn = inject(LoginService);
  user$ = this.signIn.user$;
}
