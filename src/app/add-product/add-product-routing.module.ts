import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product.component';
import { AddProductGuard } from './add-product.guard';

const routes: Routes = [
  {
    path: '',
    component: AddProductComponent,
    data: {
      title: 'Add product',
    },
    canActivate: [AddProductGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddProductRoutingModule {}
