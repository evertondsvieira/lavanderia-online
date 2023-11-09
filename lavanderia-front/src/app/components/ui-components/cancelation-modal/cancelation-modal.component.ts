import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-cancelation-modal',
  templateUrl: './cancelation-modal.component.html',
  styleUrls: ['./cancelation-modal.component.css']
})
export class CancelationModalComponent {
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
