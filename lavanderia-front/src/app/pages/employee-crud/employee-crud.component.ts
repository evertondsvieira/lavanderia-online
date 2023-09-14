import { Component } from '@angular/core';

export interface ClothingItem {
  name: string;
  imageUrl: string;
  price: string;
  deliveryTime: string;
}


@Component({
  selector: 'app-employee-crud',
  templateUrl: './employee-crud.component.html',
})
export class EmployeeCrudComponent {
  clothingItems: ClothingItem[] = [
    {
      name: 'Camiseta',
      imageUrl: 'https://static.netshoes.com.br/produtos/camiseta-ssb-brand-masculina-lisa-basica-100-algodao/16/70P-0003-016/70P-0003-016_zoom1.jpg?ts=1636498346&ims=544x',
      price: 'R$ 5.00',
      deliveryTime: '4 horas'
    },
    {
      name: 'Camiseta',
      imageUrl: 'https://static.netshoes.com.br/produtos/camiseta-ssb-brand-masculina-lisa-basica-100-algodao/16/70P-0003-016/70P-0003-016_zoom1.jpg?ts=1636498346&ims=544x',
      price: 'R$ 5.00',
      deliveryTime: '4 horas'
    },
    {
      name: 'Camiseta',
      imageUrl: 'https://static.netshoes.com.br/produtos/camiseta-ssb-brand-masculina-lisa-basica-100-algodao/16/70P-0003-016/70P-0003-016_zoom1.jpg?ts=1636498346&ims=544x',
      price: 'R$ 5.00',
      deliveryTime: '4 horas'
    },
    {
      name: 'Camiseta',
      imageUrl: 'https://static.netshoes.com.br/produtos/camiseta-ssb-brand-masculina-lisa-basica-100-algodao/16/70P-0003-016/70P-0003-016_zoom1.jpg?ts=1636498346&ims=544x',
      price: 'R$ 5.00',
      deliveryTime: '4 horas'
    },
    {
      name: 'Camiseta',
      imageUrl: 'https://static.netshoes.com.br/produtos/camiseta-ssb-brand-masculina-lisa-basica-100-algodao/16/70P-0003-016/70P-0003-016_zoom1.jpg?ts=1636498346&ims=544x',
      price: 'R$ 5.00',
      deliveryTime: '4 horas'
    },
    {
      name: 'Camiseta',
      imageUrl: 'https://static.netshoes.com.br/produtos/camiseta-ssb-brand-masculina-lisa-basica-100-algodao/16/70P-0003-016/70P-0003-016_zoom1.jpg?ts=1636498346&ims=544x',
      price: 'R$ 5.00',
      deliveryTime: '4 horas'
    },
    {
      name: 'Camiseta',
      imageUrl: 'https://static.netshoes.com.br/produtos/camiseta-ssb-brand-masculina-lisa-basica-100-algodao/16/70P-0003-016/70P-0003-016_zoom1.jpg?ts=1636498346&ims=544x',
      price: 'R$ 5.00',
      deliveryTime: '4 horas'
    },
  ]
}
