import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  username: string;
  id?: string;
  name?: string;
  price?: number;
  img?: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.username = this.userService.getUsername();
  }

  ngOnInit(): void {
   this.id = this.activatedRoute.snapshot.params['id'];
    const data = this.activatedRoute.snapshot.data['productDetailData'];
    this.name = data.name;
    this.price = data.price;
    this.img = data.img;
  }

  addToCart(): void {
    this.userService.addCartItem(this.id!);
  }
}
