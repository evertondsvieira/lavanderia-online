import { Component } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
})
export class OrderDetailsComponent {
  isConfirmationModalOpen: boolean = false;

  openConfirmationModal(): void {
    this.isConfirmationModalOpen = true;
  }

  onCancelClick(): void {
    this.isConfirmationModalOpen = false;
    console.log('Compra cancelada');
  }

  onConfirmClick(): void {
    this.isConfirmationModalOpen = false;
    console.log('Compra finalizada');
  }
}
