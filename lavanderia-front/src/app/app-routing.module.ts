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
import { OrderViewComponent } from './pages/order-view/order-view.component';
import { HomeEmployeeComponent } from './pages/home-employee/home-employee.component';
import { EmployeeCrudComponent } from './pages/employee-crud/employee-crud.component';
import { ReportCustomerComponent } from './pages/report-customer/report-customer.component';
import { ReportLoyalCustomerComponent } from './pages/report-loyal-customer/report-loyal-customer.component';
import { ReportIncomeComponent } from './pages/report-income/report-income.component';
import { ReportCustomerDetailsComponent } from './pages/report-customer-details/report-customer-details.component';

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
      { path: 'order/view', component: OrderViewComponent},
      { path: 'order/:id', component: OrderDetailsComponent },
      { path: 'cart', component: CartItemsComponent },
      { path: 'home/employee', component: HomeEmployeeComponent},
      { path: 'employee/crud', component: EmployeeCrudComponent},
      { path: 'report/income', component: ReportIncomeComponent },
      { path: 'report/customer', component: ReportCustomerComponent },
      { path: 'report/customer/:id', component: ReportCustomerDetailsComponent },
      { path: 'report/loyalcostumer', component: ReportLoyalCustomerComponent },
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
