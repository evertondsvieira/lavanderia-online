import { Component, Input } from '@angular/core';
import { CartService } from './cart.service';
import { IProduct } from '../product/product.component';
import { environment } from 'src/app/environment';
import { HttpClient } from '@angular/common/http';
import { PedidoCarrinho } from 'src/app/pages/order/order.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent {
  @Input() detalhesPedido!: string;
  products: IProduct[] = [];
  apiUrl = environment.apiUrl
  order: PedidoCarrinho[] =[];
  selectedOrderToChangeStatus = this.order;
  showErrorAlert:boolean = false;

  constructor(private cartService: CartService) {
    this.products = this.cartService.getCartItems();
  }

  calculateTotalValue(): number {
    return this.products.reduce(
      (total, product) => total + product.valor * product.quantidade,
      0,
    );
  }

  increaseQuantity(index: number): void {
    this.products[index].quantidade++;
  }

  decreaseQuantity(index: number): void {
    if (this.products[index].quantidade > 0) {
      this.products[index].quantidade--;
    }
  }

  isConfirmationModalOpen: boolean = false;

  
  openConfirmationModal():void {
    this.isConfirmationModalOpen = true;
  }

  onCancelClick(): void {
    this.isConfirmationModalOpen = false;
  }

  onConfirmClick(): void {
    this.isConfirmationModalOpen = false;
    this.cartService.createOrder(this.detalhesPedido);
  }

  onRejectClick(): void {
    this.isConfirmationModalOpen = false;
    this.cartService.RejectOrder(this.detalhesPedido);
  }

  removeCartItem(index: number): void {
    this.cartService.removeCartItem(index);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  calculateDeliveryDate(): string {
    return this.cartService.calculateDeliveryDate();
  }
  
}

