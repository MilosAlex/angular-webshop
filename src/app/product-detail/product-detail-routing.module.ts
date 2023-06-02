import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailGuard } from './product-detail.guard';
import { ProductDetailResolver } from './product-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailComponent,
    data: {
      title: 'Product detail',
    },
    canActivate: [ProductDetailGuard],
    resolve: {
      productDetailData: ProductDetailResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailRoutingModule {}
