import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { IProduct } from '../product/product.component';
import { PedidoCarrinho } from 'src/app/pages/order/order.component';
import { environment } from 'src/app/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
})
export class DetailsModalComponent {
  apiUrl = environment.apiUrl;
  @Input() detalhesPedido!: string;
  products: IProduct[] = [];
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() reject = new EventEmitter<void>();
  selectedOrderToChangeStatus: PedidoCarrinho | null = null
  pedidos: PedidoCarrinho[] = [];

  constructor(private cartService: CartService, private http: HttpClient) {
    this.products = this.cartService.getCartItems();
  }

  onConfirmClick(): void {
    this.confirm.emit();
  }

  onCancelClick(): void {
    this.cancel.emit();
  }

  onRejectClick(): void{
    this.reject.emit();
    this.cartService.clearCart();
  }

  calculateTotalValue(): number {
    return this.products.reduce(
      (total, product) => total + product.valor * product.quantidade,
      0,
    );
  }
  
  calculateDeliveryDate(): string {
    return this.cartService.calculateDeliveryDate();
  }

}

