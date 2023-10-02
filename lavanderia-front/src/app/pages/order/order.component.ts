import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface IStatusOrder {
  id: number;
  title: string;
  description: string;
  statusBtn: string;
  date: Date;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent {
  selectedStatus: string = 'all';
  statusOptions: string[] = ['Aberto', 'Cancelado', 'Rejeitado'];

  pedidos: IStatusOrder[] = [
    {
      id: 3,
      title: 'Pedido 3',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, nam tempore odio consequuntur optio cumque eum reprehenderit, hic alias autem temporibus veniam facere labore qui, magni suscipit ab repudiandae voluptate',
       date: new Date('2023-10-01 15:43'),
        statusBtn: 'Rejeitado',        
    },
    {
      id: 2,
      title: 'Pedido 2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, nam tempore odio consequuntur optio cumque eum reprehenderit, hic alias autem temporibus veniam facere labore qui, magni suscipit ab repudiandae voluptate',
        date: new Date('2023-09-30 09:56'),
        statusBtn: 'Aberto',    
    },
    {
      id: 1,
      title: 'Pedido 1',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, nam tempore odio consequuntur optio cumque eum reprehenderit, hic alias autem temporibus veniam facere labore qui, magni suscipit ab repudiandae voluptate',
        date: new Date('2023-09-29 11:27'),
        statusBtn: 'Cancelado',       
    },
  ];

  get filteredPedidos() {
    if (this.selectedStatus === 'all') {
      return this.pedidos;
    } else {
      return this.pedidos.filter(
        (pedido) => pedido.statusBtn === this.selectedStatus,
      );
    }
  }
  constructor(private router: Router) {}

  showDetailsOrder(id: number) {
    this.router.navigate(['/order', id]);
  }
}
