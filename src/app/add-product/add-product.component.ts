import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  username: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.username = this.userService.getUsername();
  }
}
