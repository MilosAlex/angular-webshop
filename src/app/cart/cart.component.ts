import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: any[] = [];

  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.updateCartItems();
  }

  updateCartItems(): void {
    const items = this.userService.getCartItems();
    const ids: string[] = items.map((item) => item.id);
    if (ids) {
      this.productService.getCartProducts(ids).subscribe((value) => {
        this.cartItems = value.map((item) => {
          const cartItem = items.find((cartItem) => cartItem.id === item.id);
          return { ...item, quantity: cartItem.quantity };
        });
      });
    }
  }

  addToCart(id: string): void {
    this.userService.addCartItem(id);
    this.updateCartItems();
  }

  removeFromCart(id: string): void {
    this.userService.removeCartItem(id);
    this.updateCartItems();
  }

  clearCart(): void {
    this.userService.clearCartItems();
    this.updateCartItems();
  }

  trackProductList(index: number, item: any) {
    return item.id;
  }

  ngOnDestroy(): void {}
}
