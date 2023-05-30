import { Component } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  username: string;

  constructor(private userService: UserService) {
    this.username = this.userService.getUsername();
  }
}
