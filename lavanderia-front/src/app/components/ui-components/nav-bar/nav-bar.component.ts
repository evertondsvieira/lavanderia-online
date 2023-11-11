import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  @ViewChild('drawerNavigation')
  drawerNavigation!: ElementRef;

  navItems = [
    { nome: 'Home', icone: 'home', link: 'user/home' },
    { nome: 'Pedidos', icone: 'article', link: '/order' },
    { nome: 'Serviços', icone: 'local_laundry_service', link: '/services' },
    { nome: 'Carrinho', icone: 'shopping_cart', link: '/cart' },
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
