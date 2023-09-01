import { Component } from '@angular/core';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
})
export class DateFilterComponent {
  showCustomDateRange: boolean = false;

  openModal() {
    const modal = document.getElementById('modal');
    modal?.classList.remove('hidden');
  }

  closeModal() {
    const modal = document.getElementById('modal');
    modal?.classList.add('hidden');
  }

  toggleCustom() {
    this.showCustomDateRange = !this.showCustomDateRange;
  }
}
