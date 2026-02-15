import { Routes } from '@angular/router';
import { RegisterPageComponent } from './shared/register-page/register-page';
import { ProductsPageComponent } from './market/products-page/products-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'products',
    component: ProductsPageComponent,
  },
  {
    path: '**',
    redirectTo: 'register',
  },
];