import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  @ViewChild('drawerNavigation')
  drawerNavigation!: ElementRef;

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
}