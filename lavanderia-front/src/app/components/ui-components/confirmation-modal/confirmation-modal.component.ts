import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
})
export class ConfirmationModalComponent {
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private cartService: CartService) {}

  onConfirmClick(): void {
    this.confirm.emit();
  }

  onCancelClick(): void {
    this.cancel.emit();
    this.cartService.clearCart();
  }
}
