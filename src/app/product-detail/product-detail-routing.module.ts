import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailGuard } from './product-detail.guard';
//import { ProductDetailResolver } from './product-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailComponent,
    data: {
      title: 'Expense detail',
    },
    canActivate: [ProductDetailGuard],
    /* resolve: {
      ProductDetailData: ProductDetailResolver,
    }, */
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailRoutingModule {}
