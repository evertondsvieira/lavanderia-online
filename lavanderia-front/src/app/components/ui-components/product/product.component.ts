import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { CartService } from '../cart/cart.service';

export interface IProduct {
  title: string;
  description?: string;
  value: number;
  imagemSrc: string;
  quantity: number
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  products: IProduct[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  showAlert: boolean = false;

  adicionarAoCarrinho(product: IProduct) {
    const cartItem = {
      title: product.title,
      value: product.value,
      imagemSrc: product.imagemSrc,
      description: product.description,
      quantity: 1,
    };

    this.cartService.addToCart(cartItem);
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
    console.log('Produto adicionado ao carrinho:', product);
  }
}
