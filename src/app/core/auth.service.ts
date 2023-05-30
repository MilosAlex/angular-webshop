import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly backendUrl = environment.backendUrl;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly cookieService: CookieService,
    private userService: UserService
  ) {}

  register(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.backendUrl}/register`, {
      username,
      password,
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.backendUrl}/login`, {
      username,
      password,
    });
  }

  logout(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('username');
    this.userService.setUsername('');
  }

  isLoggedIn() {
    return this.cookieService.check('token');
  }
}
