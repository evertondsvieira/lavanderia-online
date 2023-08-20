import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderComponent } from './pages/order/order.component';
import { ButtonsComponent } from './components/ui-components/buttons/buttons.component';
import { InputsComponent } from './components/ui-components/inputs/inputs.component';

import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemsComponent } from './components/ui-components/items/items.component';
import { BoxComponent } from './components/ui-components/box/box.component';
import { NavBarComponent } from './components/ui-components/nav-bar/nav-bar.component';
import { MaskComponent } from './components/ui-components/mask/mask.component';
import { DropdownComponent } from './components/ui-components/dropdown/dropdown.component';
import { SearchBarComponent } from './components/ui-components/search-bar/search-bar.component';
import { StatusComponent } from './components/ui-components/status/status.component';
import { DetalhesPedidoComponent } from './pages/detalhes-pedido/detalhes-pedido.component';
import { CartComponent } from './components/ui-components/cart/cart.component';
import { FormsModule } from '@angular/forms';
import { LanguagePopoverComponent } from './components/ui-components/language-popover/language-popover.component';
import { ThemePopoverComponent } from './components/ui-components/theme-popover/theme-popover.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    OrderComponent,
    ButtonsComponent,
    InputsComponent,
    ItemsComponent,
    BoxComponent,
    NavBarComponent,
    MaskComponent,
    DropdownComponent,
    SearchBarComponent,
    StatusComponent,
    DetalhesPedidoComponent,
    CartComponent,
    LanguagePopoverComponent,
    ThemePopoverComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
