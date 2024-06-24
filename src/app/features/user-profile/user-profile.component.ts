import { Component, OnInit, inject } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  public signOut = inject(LoginService);
  isSignOut$ = this.signOut.isSignOut$;
  user$ = this.signOut.user$;

  constructor() {
    this.signOut.init();
  }

  ngOnInit(): void {}
}
