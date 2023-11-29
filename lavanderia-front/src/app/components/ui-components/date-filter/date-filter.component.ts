import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ReportIncomeComponent } from 'src/app/pages/report-income/report-income.component';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
})
export class DateFilterComponent {
  showCustomDateRange: boolean = false;
  @Input() startDate: string | null = null;
  @Input() endDate: string | null = null;
  @Input() reportIncomeComponent: ReportIncomeComponent | undefined;
  @Output() filterApplied = new EventEmitter<{ startDate: string | null; endDate: string | null; }>();

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

  applyFilter() {  
    this.filterApplied.emit({ startDate: this.startDate, endDate: this.endDate });
  
    if (this.reportIncomeComponent) {  
      this.reportIncomeComponent.applyFilter();
    }

    this.closeModal()
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  filterToday() {
    const today = new Date().toISOString().split('T')[0];
    this.startDate = today;
    this.endDate = today;
    this.applyFilter();
  }

  filterAll() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
    this.startDate = this.formatDate(firstDayOfMonth);
    this.endDate = this.formatDate(lastDayOfMonth);
    this.applyFilter();
  }
}
