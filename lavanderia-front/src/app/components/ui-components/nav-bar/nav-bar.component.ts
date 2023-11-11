import { Component, ElementRef, ViewChild } from '@angular/core';

interface INaveItems {
  nome: string
  icone: string
  link: string
  employee: boolean
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  @ViewChild('drawerNavigation')
  drawerNavigation!: ElementRef;

  navItems: INaveItems[] = [
    { nome: 'Home', icone: 'home', link: 'user/home', employee: false },
    { nome: 'Pedidos', icone: 'article', link: '/order', employee: false },
    { nome: 'Serviços', icone: 'local_laundry_service', link: '/services', employee: false },
    { nome: 'Carrinho', icone: 'shopping_cart', link: '/cart', employee: false },
    { nome: 'Home', icone: 'home', link: 'employee/home', employee: true },
    { nome: 'Cadastro', icone: 'assignment_ind', link: 'employee/maintenance', employee: true },
    { nome: 'Crud', icone: 'create', link: 'employee/crud', employee: true },
    { nome: 'Receita', icone: 'attach_money', link: 'report/income', employee: true },
    { nome: 'Clientes', icone: 'people', link: 'report/customer', employee: true },
    { nome: 'Loyal', icone: 'loyalty', link: 'report/loyalcustomer', employee: true },
  ]

  toggleDrawer(): void {
    const drawer = this.drawerNavigation.nativeElement;
    drawer.classList.toggle('translate-x-0');
    drawer.classList.toggle('-translate-x-full');
  }

  closeDrawer(): void {
    const drawer = this.drawerNavigation.nativeElement;
    drawer.classList.remove('translate-x-0');
    drawer.classList.add('-translate-x-full');
  }

  isLanguagePopoverVisible = false;
  isThemePopoverVisible = false;

  toggleLanguagePopover() {
    this.isLanguagePopoverVisible = !this.isLanguagePopoverVisible;
  }

  toggleThemePopover() {
    this.isThemePopoverVisible = !this.isThemePopoverVisible;
  }

  quantidadeItensNoCarrinho: number = 0;
}
