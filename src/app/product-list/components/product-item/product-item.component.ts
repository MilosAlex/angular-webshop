import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input()
  name?: string;

  @Input()
  price?: number;

  @Input()
  img?: number;

  @Input()
  id?: string;

  @Output()
  clickTitle = new EventEmitter<string>();

  alert = false;
  ngOnInit(): void {}
  constructor() {}
  innerClickTitle(value: string) {
    this.clickTitle.emit(value);
    console.log(value);
  }
}
