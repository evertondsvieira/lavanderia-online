import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { environment } from 'src/app/environment';
import { HttpClient } from '@angular/common/http';

export interface IProduct {
  id: number;
  nome: string;
  descricao?: string;
  valor: number;
  imgUrl: string;
  quantidade: number
  prazo: string
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  apiUrl = environment.apiUrl
  products: IProduct[] = []

  constructor(private http: HttpClient, private cartService: CartService) {}
  
  ngOnInit(): void {
    this.http.get<IProduct[]>(this.apiUrl + 'item').subscribe({
      next: (data: IProduct[]) => {
        this.products = data.sort((a, b) => a.id - b.id);
      },
      error: (error: any) => {
        console.error('Erro ao buscar os dados:', error);
      },
    });
  }

  showAlert: boolean = false;

  adicionarAoCarrinho(product: IProduct) {
    const cartItem = {
      id: product.id,
      nome: product.nome,
      valor: product.valor,
      imgUrl: product.imgUrl,
      prazo: product.prazo,
      quantidade: 1,
    };

    this.cartService.addToCart(cartItem);
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }
}
