import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utils/AuthService';

interface INaveItems {
  nome: string
  icone: string
  link: string
  role: string
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  @ViewChild('drawerNavigation')
  drawerNavigation!: ElementRef;

  navItems: INaveItems[] = [
    { nome: 'Home', icone: 'home', link: 'user/home', role: 'usuario' },
    { nome: 'Pedidos', icone: 'article', link: '/order', role: 'usuario' },
    { nome: 'Serviços', icone: 'local_laundry_service', link: '/services', role: 'usuario' },
    { nome: 'Carrinho', icone: 'shopping_cart', link: '/cart', role: 'usuario' },
    { nome: 'Home', icone: 'home', link: 'employee/home', role: 'funcionario' },
    { nome: 'Cadastro', icone: 'assignment_ind', link: 'employee/maintenance', role: 'funcionario' },
    { nome: 'Crud', icone: 'create', link: 'employee/crud', role: 'funcionario' },
    { nome: 'Receita', icone: 'attach_money', link: 'report/income', role: 'funcionario' },
    { nome: 'Clientes', icone: 'people', link: 'report/customer', role: 'funcionario' },
    { nome: 'Loyal', icone: 'loyalty', link: 'report/loyalcustomer', role: 'funcionario' },
  ]

  constructor(private authService: AuthService, private router: Router) {}

  getFilteredNavItems(): INaveItems[] {
    const userRole = this.authService.getCurrentUser()?.role
    if (userRole) {
      return this.navItems.filter(item => item.role === userRole)
    }
    return [];
  }

  toggleDrawer(): void {
    const drawer = this.drawerNavigation.nativeElement
    drawer.classList.toggle('translate-x-0')
    drawer.classList.toggle('-translate-x-full')
  }

  closeDrawer(): void {
    const drawer = this.drawerNavigation.nativeElement
    drawer.classList.remove('translate-x-0')
    drawer.classList.add('-translate-x-full')
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isLanguagePopoverVisible = false
  isThemePopoverVisible = false

  toggleLanguagePopover() {
    this.isLanguagePopoverVisible = !this.isLanguagePopoverVisible
  }

  toggleThemePopover() {
    this.isThemePopoverVisible = !this.isThemePopoverVisible
  }

  quantidadeItensNoCarrinho: number = 0
}
