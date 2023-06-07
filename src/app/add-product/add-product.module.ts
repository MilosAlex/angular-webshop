import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product.component';
import { AddProductGuard } from './add-product.guard';
import { AddProductRoutingModule } from './add-product-routing.module';

@NgModule({
  declarations: [AddProductComponent],
  imports: [CommonModule, AddProductRoutingModule],
  providers: [AddProductGuard],
})
export class AddProductModule {}
