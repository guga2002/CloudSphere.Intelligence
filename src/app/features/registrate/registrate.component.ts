import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { personalNumberValidator } from './personal-namber';
import { RegisterService } from '../../shared/services/register.service';

@Component({
  selector: 'app-registrate',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, AsyncPipe],
  templateUrl: './registrate.component.html',
  styleUrl: './registrate.component.css',
})
export class RegistrateComponent {
  private readonly maxLength = 16;
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly signUpService = inject(RegisterService);
  readonly isLoading$ = this.signUpService.inLoading$;

  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(this.maxLength)]],
    surname: ['', [Validators.required, Validators.maxLength(this.maxLength)]],
    birthDate: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.maxLength(this.maxLength)]],
    email: ['', [Validators.required, Validators.email]],
    personalNumber: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  get controls() {
    return this.signupForm.controls;
  }

  onSubmit() {
    const signUpData = this.signupForm.getRawValue();
    this.signUpService.signUp(signUpData);
    console.log(signUpData);
  }
}
