import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
//import { AppValidators } from './password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        /* AppValidators.createPasswordStrengthValidator(), */
      ],
    }),
  });

  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}
  onSubmit() {
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      this.authService
        .register(
          this.registerForm.controls.username.value!,
          this.registerForm.controls.password.value!
        )
        .subscribe(() => {
          console.log('OK');
          this.router.navigate(['/']);
        });
    }
  }
}
