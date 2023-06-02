import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, delay, of, tap } from 'rxjs';
import { ProductService } from '../product.service';

@Injectable({ providedIn: 'root' })
export class ProductDetailResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<any | undefined> {
    const id = route.paramMap.get('id');
    if (id) {
      return this.productService.getProductById(id).pipe(
        tap((item) => {
          if (!item) {
            console.log('item undefined');
            this.router.navigate(['']);
          }
        })
      );
    }
    this.router.navigate(['']);
    return of(undefined);
  }
}
