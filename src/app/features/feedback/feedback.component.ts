import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  feedbackForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    feedback: ['', [Validators.required]],
    ratingGivedByUser: [
      '',
      [Validators.required, Validators.min(0), Validators.max(10)],
    ],
  });

  get controls() {
    return this.feedbackForm.controls;
  }

  onSubmit() {}
}
