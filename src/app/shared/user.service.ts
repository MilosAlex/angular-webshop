import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private username: string;
  private cartItems: any[];
  private saveCartItems: () => void;

  constructor(cookieService: CookieService) {
    this.username = cookieService.get('username');
    this.cartItems = JSON.parse(cookieService.get('cartItems') || '[]');

    this.saveCartItems = (): void => {
      cookieService.set('cartItems', JSON.stringify(this.cartItems));
    };
  }

  setUsername(username: string): void {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  addCartItem(id: string): void {
    const index = this.cartItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.cartItems[index].quantity++;
    } else {
      this.cartItems.push({ id, quantity: 1 });
    }
    this.saveCartItems();
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  clearCartItems(): void {
    this.cartItems = [];
    this.saveCartItems();
  }

  removeCartItem(id: number): void {
    this.cartItems.splice(id, 1);
    this.saveCartItems();
  }

  getCartItemsCount(): number {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }
}
