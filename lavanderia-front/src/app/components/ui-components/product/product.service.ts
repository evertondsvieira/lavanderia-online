import { Injectable } from '@angular/core';
import { IProduct } from './product.component';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: IProduct[] = [
    {
      title: 'Camiseta Masculina',
      description: "Generate Lorem Ipsum placeholder text",
      value: 1,
      quantity: 1,
      imagemSrc: 'https://static.netshoes.com.br/produtos/camiseta-ssb-brand-masculina-lisa-basica-100-algodao/16/70P-0003-016/70P-0003-016_zoom1.jpg?ts=1636498346&ims=544x',
    },
    {
      title: 'Calça Jeans',
      description: 'Generate Lorem Ipsum placeholder text',
      value: 1.3,
      quantity: 1,
      imagemSrc: 'https://cdnv2.moovin.com.br/bizzstore/imagens/produtos/det/img_0676.jpg',
    },
  ];

  getProducts(): IProduct[] {
    return this.products;
  }
}
