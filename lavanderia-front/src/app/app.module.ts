import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { LaundryServicesDetailsComponent } from './pages/laundry-services-details/laundry-services-details.component';
import { OrderViewComponent } from './pages/order-view/order-view.component';
import { StoreModule } from '@ngrx/store';
import { DateFilterComponent } from './components/ui-components/date-filter/date-filter.component';
import { HomeEmployeeComponent} from './pages/home-employee/home-employee.component';
import { EmployeeCrudComponent } from './pages/employee-crud/employee-crud.component';

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
    LaundryServicesDetailsComponent,
    OrderViewComponent,
    DateFilterComponent,
    HomeEmployeeComponent,
    EmployeeCrudComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
