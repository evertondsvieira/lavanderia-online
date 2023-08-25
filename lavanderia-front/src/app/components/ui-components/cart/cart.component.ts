import { Component, Input } from '@angular/core';
import { CartService } from './cart.service';
import { IProduct } from '../product/product.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent {
  @Input() detalhesPedido: string | undefined;

  products: IProduct[] = [];

  constructor(private cartService: CartService) {
    this.products = this.cartService.getCartItems();
  }

  calculateTotalValue(): number {
    return this.products.reduce(
      (total, product) => total + product.value * product.quantity,
      0,
    );
  }

  increaseQuantity(index: number): void {
    this.products[index].quantity++;
  }

  decreaseQuantity(index: number): void {
    if (this.products[index].quantity > 0) {
      this.products[index].quantity--;
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

  removeCartItem(index: number): void {
    this.cartService.removeCartItem(index);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
