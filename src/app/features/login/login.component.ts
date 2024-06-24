import { Component, OnInit, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../shared/services/login.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, HttpClientModule, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly signInService = inject(LoginService);
  activatedRoute = inject(ActivatedRoute);
  isSignUpSuccess: boolean = false;
  readonly isLoading$ = this.signInService.inLoading$;

  signInForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    setCookie: [true, [Validators.required]],
  });

  get controls() {
    return this.signInForm.controls;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((paramMap) => {
      this.isSignUpSuccess = Boolean(paramMap.get('signUpSuccess'));
      setTimeout(() => {
        this.isSignUpSuccess = false;
      }, 3000);
    });
  }

  onLogin() {
    console.log('test');
    const signInData = this.signInForm.getRawValue();
    this.signInService.signIn(signInData);
  }
}
