import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OrderComponent } from './pages/order/order.component';
import { MaskComponent } from './components/ui-components/mask/mask.component';
import { CartItemsComponent } from './pages/cart-items/cart-items.component';
import { LaundryServicesComponent } from './pages/laundry-services/laundry-services.component';
import { LaundryServicesDetailsComponent } from './pages/laundry-services-details/laundry-services-details.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: MaskComponent,
    children: [
      { path: 'services', component: LaundryServicesComponent },
      { path: 'services/:id', component: LaundryServicesDetailsComponent },
      { path: 'order', component: OrderComponent },
      { path: 'order/:id', component: OrderDetailsComponent },
      { path: 'cart', component: CartItemsComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollOffset: [0, 0],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
