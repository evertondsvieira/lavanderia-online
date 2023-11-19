import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OrderComponent } from './pages/order/order.component';
import { MaskComponent } from './components/ui-components/mask/mask.component';
import { CartItemsComponent } from './pages/cart-items/cart-items.component';
import { LaundryServicesComponent } from './pages/laundry-services/laundry-services.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { OrderViewComponent } from './pages/order-view/order-view.component';
import { HomeEmployeeComponent } from './pages/home-employee/home-employee.component';
import { EmployeeCrudComponent } from './pages/employee-crud/employee-crud.component';
import { ReportCustomerComponent } from './pages/report-customer/report-customer.component';
import { ReportLoyalCustomerComponent } from './pages/report-loyal-customer/report-loyal-customer.component';
import { ReportIncomeComponent } from './pages/report-income/report-income.component';
import { ReportCustomerDetailsComponent } from './pages/report-customer-details/report-customer-details.component';
import { EmployeeMaintenanceComponent } from './pages/employee-maintenance/employee-maintenance.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { EmployeeGuard } from './utils/employee.guard';
import { UserGuard } from './utils/user.guard';

export const userRoutes: Routes = [
  { path: 'services', component: LaundryServicesComponent, canActivate: [UserGuard], data: { title: 'Laundry Services' } },
  { path: 'order', component: OrderComponent, canActivate: [UserGuard] },
  { path: 'order/:id', component: OrderDetailsComponent, canActivate: [UserGuard] },
  { path: 'cart', component: CartItemsComponent, canActivate: [UserGuard] },
  { path: 'user/home', component: UserHomeComponent, canActivate: [UserGuard] },
];

export const employeeRoutes: Routes = [
  { path: 'order/view', component: OrderViewComponent, canActivate: [EmployeeGuard], data: { title: 'View Orders' } },
  { path: 'employee/home', component: HomeEmployeeComponent, canActivate: [EmployeeGuard] },
  { path: 'employee/crud', component: EmployeeCrudComponent, canActivate: [EmployeeGuard] },
  { path: 'employee/maintenance', component: EmployeeMaintenanceComponent, canActivate: [EmployeeGuard] },
  { path: 'report/income', component: ReportIncomeComponent, canActivate: [EmployeeGuard] },
  { path: 'report/customer', component: ReportCustomerComponent, canActivate: [EmployeeGuard] },
  { path: 'report/customer/:id', component: ReportCustomerDetailsComponent, canActivate: [EmployeeGuard] },
  { path: 'report/loyalcustomer', component: ReportLoyalCustomerComponent, canActivate: [EmployeeGuard] },
];

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: MaskComponent,
    children: [
      ...userRoutes,
      ...employeeRoutes,
      { path: '**', redirectTo: '/login' },
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
