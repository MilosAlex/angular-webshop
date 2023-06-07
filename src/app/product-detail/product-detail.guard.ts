import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';

@Injectable()
export class ProductDetailGuard {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    /* if (!this.authService.isLoggedIn()) {
      this.router.navigate(['']);
      return false;
    } */
    return true;
  }
}
