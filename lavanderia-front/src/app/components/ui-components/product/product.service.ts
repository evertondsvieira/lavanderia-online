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
      value: 'R$ 1.00',
      imagemSrc: 'https://static.netshoes.com.br/produtos/camiseta-ssb-brand-masculina-lisa-basica-100-algodao/16/70P-0003-016/70P-0003-016_zoom1.jpg?ts=1636498346&ims=544x',
    },
    {
      title: 'Camiseta Masculina',
      description: 'Generate Lorem Ipsum placeholder text',
      value: 'R$ 0.49',
      imagemSrc: 'https://static.netshoes.com.br/produtos/camiseta-ssb-brand-masculina-lisa-basica-100-algodao/16/70P-0003-016/70P-0003-016_zoom1.jpg?ts=1636498346&ims=544x',
    },
  ];

  getProducts(): IProduct[] {
    return this.products;
  }
}
