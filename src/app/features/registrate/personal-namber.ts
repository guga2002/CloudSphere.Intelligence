import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function personalNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = /^[0-9]{11}$/.test(control.value);
    return isValid
      ? null
      : {
          personalNumber: {
            valid: false,
            message: 'Personal number must be exactly 11 digits',
          },
        };
  };
}
