import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';

export interface IProduct {
  title: string;
  description: string;
  value: string;
  imagemSrc: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  showAlert: boolean = false;
  alertProduct: IProduct | null = null;

  adicionarAoCarrinho(product: IProduct) {
    this.showAlert = true

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
    console.log('Produto adicionado ao carrinho:', product)
  }

  fecharAlerta() {
    this.showAlert = false;
  }
}
