import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../product/product.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/utils/AuthService';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<IProduct[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService
  ) {}

  addToCart(product: IProduct): void {
    const currentItems = this.cartItemsSubject.value;
    this.cartItemsSubject.next([...currentItems, product]);
  }

  getCartItems(): IProduct[] {
    return this.cartItemsSubject.value;
  }

  removeCartItem(index: number): void {
    const currentItems = this.cartItemsSubject.value;
    if (index >= 0 && index < currentItems.length) {
      currentItems.splice(index, 1);
      this.cartItemsSubject.next(currentItems);
    }
  }

  createOrder(detalhesPedido: string): void {
    const userId = this.authService.getUserId();
    
    const items = this.cartItemsSubject.value.map((product) => {
      return {
        item: {
          id: product.id,
          nome: product.nome,
          quantidade: product.quantidade,
          valor: product.valor,
          imgUrl: product.imgUrl,
          prazo: product.prazo,
        },
        quantidade: product.quantidade
      };
    });

    const order = {
      usuario: { id: userId },
      nome: 'Pedido do Carrinho',
      data: new Date().toISOString(),
      descricao: detalhesPedido,
      status: 'EM ABERTO',
      valor: this.calculateTotalValue().toString(),
      prazo: '2023-11-15', 
      itemsPedido: items,
    };

    this.http.post(`${this.apiUrl}order`, order).subscribe({
      next: () => {
        this.clearCart()
        this.router.navigate(['order'])
      },
      error: (error) => {
        console.error('Erro ao criar o pedido:', error);
      }
    });
  }

  calculateTotalValue(): number {
    return this.cartItemsSubject.value.reduce(
      (total, product) => total + product.valor * product.quantidade,
      0,
    );
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}
