import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../product/product.component';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<IProduct[]
  >([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  addToCart(product: IProduct): void {
    const currentItems = this.cartItemsSubject.getValue();
    this.cartItemsSubject.next([...currentItems, product]);
  }

  getCartItems(): IProduct[] {
    return this.cartItemsSubject.getValue();
  }

  removeCartItem(index: number): void {
    const currentItems = this.cartItemsSubject.getValue();
    if (index >= 0 && index < currentItems.length) {
      currentItems.splice(index, 1);
      this.cartItemsSubject.next(currentItems);
    }
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}
