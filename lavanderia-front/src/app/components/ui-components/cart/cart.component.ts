import { Component, Input, ViewChild } from '@angular/core';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent {
  @Input() detalhesPedido: string | undefined;

  products: { name: string; price: number; quantity: number }[] = [
    { name: 'Camiseta', price: 1.0, quantity: 0 },
  ];

  calculateTotalValue(): number {
    return this.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );
  }

  increaseQuantity(index: number): void {
    this.products[index].quantity++;
    this.calculateTotalValue();
  }
  
  decreaseQuantity(index: number): void {
    if (this.products[index].quantity >= 0) {
      this.products[index].quantity--;
      this.calculateTotalValue();
    }
  }

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
