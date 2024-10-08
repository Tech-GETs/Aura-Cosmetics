import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductComponent },
  { path: 'users', component: UserComponent }
];
