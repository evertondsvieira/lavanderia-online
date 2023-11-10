import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../product/product.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<IProduct[]
  >([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

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

  createOrder(detalhesPedido: string): void {
    const items = this.cartItemsSubject.getValue().map((product) => {
      return {
        nome: product.nome,
        quantidade: product.quantidade,
        valor: product.valor,
        imgUrl: product.imgUrl,
        prazo: product.prazo,
      };
    });

    const order = {
      nome: 'Pedido do Carrinho',
      data: new Date().toISOString(),
      descricao: detalhesPedido,
      status: 'Pendente',
      valor: this.calculateTotalValue().toString(),
      prazo: '2023-11-15', 
      items: items,
    };

    this.http.post(this.apiUrl + 'order', order).subscribe(
      (response) => {
        console.log('Pedido criado com sucesso:', response);
        this.clearCart();
      },
      (error) => {
        console.error('Erro ao criar o pedido:', error);
      }
    );
  }

  calculateTotalValue(): number {
    return this.cartItemsSubject.getValue().reduce(
      (total, product) => total + product.valor * product.quantidade,
      0,
    );
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}
