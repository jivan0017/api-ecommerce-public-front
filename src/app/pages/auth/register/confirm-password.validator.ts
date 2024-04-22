import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidator {
  /**
   * Check matching password with confirm password
   * @param control AbstractControl
   */
  static MatchPassword(control: AbstractControl): void {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('cPassword')?.value;

    if (password !== confirmPassword) {
      control.get('cPassword')?.setErrors({ ConfirmPassword: true });
    }
  }
}
// import {

// 	AbstractControl,
// 	ValidationErrors,
// 	ValidatorFn,
//   } from '@angular/forms';

//   export const confirmPasswordValidator: ValidatorFn = (
// 	control: AbstractControl
//   ): ValidationErrors | null => {
// 	return control.value.password === control.value.cPassword
// 	  ? null
// 	  : { PasswordNoMatch: true };
//   };
