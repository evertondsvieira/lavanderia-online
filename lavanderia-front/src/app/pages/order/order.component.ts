import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface IStatusOrder {
  id: number;
  title: string;
  description: string;
  statusBtn: string;
  status:string;
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
      title: 'Pedido 3', date: new Date('2023-10-01 15:43'), statusBtn: 'Rejeitado', status: 'Rejeitado',           
       description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, nam tempore odio consequuntur optio cumque eum reprehenderit, hic alias autem temporibus veniam facere labore qui, magni suscipit ab repudiandae voluptate',
    },
    {
      id: 2, title: 'Pedido 2', date: new Date('2023-09-30 09:56'), statusBtn: 'Aberto', status: 'Aberto',
       description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, nam tempore odio consequuntur optio cumque eum reprehenderit, hic alias autem temporibus veniam facere labore qui, magni suscipit ab repudiandae voluptate',     
    },
    {
      id: 1, title: 'Pedido 1', date: new Date('2023-09-29 11:27'), statusBtn: 'Cancelado', status: 'Cancelado',    
       description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, nam tempore odio consequuntur optio cumque eum reprehenderit, hic alias autem temporibus veniam facere labore qui, magni suscipit ab repudiandae voluptate',
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

  selectedOrderToChangeStatus: IStatusOrder | null = null;

  openConfirmationModal(pedido: IStatusOrder) {
    this.selectedOrderToChangeStatus = pedido;
  }

  confirmStatusChange(pedido: IStatusOrder) {
    if (pedido) {
      if (pedido.status === 'Aberto'){
        pedido.status = 'Pago';
      this.selectedOrderToChangeStatus = null;
    }
  }
}

  cancelStatusChange() {
    this.selectedOrderToChangeStatus = null;
  }

  constructor(private router: Router) {}

  showDetailsOrder(id: number) {
    this.router.navigate(['/order', id]);
  }
}
