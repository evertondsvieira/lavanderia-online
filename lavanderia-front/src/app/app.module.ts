import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OrderComponent } from './pages/order/order.component';
import { ButtonsComponent } from './components/ui-components/buttons/buttons.component';
import { InputsComponent } from './components/ui-components/inputs/inputs.component';

import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemsComponent } from './components/ui-components/items/items.component';
import { BoxComponent } from './components/ui-components/box/box.component';
import { NavBarComponent } from './components/ui-components/nav-bar/nav-bar.component';
import { MaskComponent } from './components/ui-components/mask/mask.component';
import { SearchBarComponent } from './components/ui-components/search-bar/search-bar.component';
import { StatusComponent } from './components/ui-components/status/status.component';
import { CartComponent } from './components/ui-components/cart/cart.component';
import { FormsModule } from '@angular/forms';
import { LanguagePopoverComponent } from './components/ui-components/language-popover/language-popover.component';
import { ThemePopoverComponent } from './components/ui-components/theme-popover/theme-popover.component';
import { PopoverComponent } from './components/ui-components/popover/popover.component';
import { CartItemsComponent } from './pages/cart-items/cart-items.component';
import { ProductComponent } from './components/ui-components/product/product.component';
import { AlertComponent } from './components/ui-components/alert/alert.component';
import { ConfirmationModalComponent } from './components/ui-components/confirmation-modal/confirmation-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { LaundryServicesComponent } from './pages/laundry-services/laundry-services.component';
import { OrderViewComponent } from './pages/order-view/order-view.component';
import { StoreModule } from '@ngrx/store';
import { DateFilterComponent } from './components/ui-components/date-filter/date-filter.component';
import { HomeEmployeeComponent} from './pages/home-employee/home-employee.component';
import { EmployeeCrudComponent } from './pages/employee-crud/employee-crud.component';
import { ReportCustomerComponent } from './pages/report-customer/report-customer.component';
import { ReportLoyalCustomerComponent } from './pages/report-loyal-customer/report-loyal-customer.component';
import { ReportIncomeComponent } from './pages/report-income/report-income.component';
import { WrapperComponent } from './components/ui-components/wrapper/wrapper.component';
import { ReportCustomerDetailsComponent } from './pages/report-customer-details/report-customer-details.component';
import { EmployeeMaintenanceComponent } from './pages/employee-maintenance/employee-maintenance.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { CancelationModalComponent } from './components/ui-components/cancelation-modal/cancelation-modal.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { UserGuard } from './utils/user.guard';
import { EmployeeGuard } from './utils/employee.guard';
import { DatePipe } from '@angular/common';
import { NoDataFoundComponent } from './components/ui-components/no-data-found/no-data-found.component';
import { DetailsModalComponent } from './components/ui-components/details-modal/details-modal.component';
import { OrderSearchComponent } from './pages/order-search/order-search.component';
import { ErrorAlertComponent } from './components/ui-components/error-alert/error-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    OrderComponent,
    ButtonsComponent,
    InputsComponent,
    ItemsComponent,
    BoxComponent,
    NavBarComponent,
    MaskComponent,
    SearchBarComponent,
    StatusComponent,
    CartComponent,
    LanguagePopoverComponent,
    ThemePopoverComponent,
    PopoverComponent,
    CartItemsComponent,
    ProductComponent,
    AlertComponent,
    ConfirmationModalComponent,
    OrderDetailsComponent,
    LaundryServicesComponent,
    OrderViewComponent,
    DateFilterComponent,
    HomeEmployeeComponent,
    EmployeeCrudComponent,
    ReportCustomerComponent,
    ReportLoyalCustomerComponent,
    ReportIncomeComponent,
    WrapperComponent,
    ReportCustomerDetailsComponent,
    EmployeeMaintenanceComponent,
    UserHomeComponent,
    CancelationModalComponent,
    UnauthorizedComponent,
    NoDataFoundComponent,
    DetailsModalComponent,
    OrderSearchComponent,
    ErrorAlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [UserGuard, EmployeeGuard, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
