import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../shared/user.service';
//import { AppValidators } from './password.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
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
    private readonly cookieService: CookieService,
    private userService: UserService,
    private router: Router
  ) {}

  //@Output() loginEvent = new EventEmitter<void>();

  onSubmit() {
    console.log(this.loginForm);
    if (this.loginForm.valid) {
      this.authService
        .login(
          this.loginForm.controls.username.value!,
          this.loginForm.controls.password.value!
        )
        .subscribe((result) => {
          console.log('OK', result);
          //this.loginEvent.emit();
          this.cookieService.set('token', result.token, new Date('2100'));
          this.cookieService.set('username', this.loginForm.controls.username.value!, new Date('2100'));
          this.userService.setUsername(this.loginForm.controls.username.value!);
          this.router.navigate(['/']);
        });
    }
  }
}
