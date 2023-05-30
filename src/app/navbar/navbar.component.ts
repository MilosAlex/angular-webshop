import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../shared/user.service';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  userService: UserService;

  constructor(userService: UserService, private readonly authService: AuthService) {
    this.userService = userService;
  }

  onLogout() {
    this.authService.logout();
  }
}
