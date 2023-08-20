import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent implements AfterViewInit {
  dropdownPopoverShow = false;
  selectedFilter: string = ''; // Campo para armazenar o filtro selecionado
  @ViewChild('btnDropdownRef', { static: false }) btnDropdownRef!: ElementRef;
  @ViewChild('popoverDropdownRef', { static: false })
  popoverDropdownRef!: ElementRef;

  dropdown: string[] = ['Aberto', 'Fechado', 'Em entrega'];

  constructor() {}

  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: 'bottom-start',
      },
    );
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.dropdownPopoverShow = !this.dropdownPopoverShow;
  }

  applyFilter(filter: string) {
    this.selectedFilter = filter;
    this.dropdownPopoverShow = false;
  }
}
