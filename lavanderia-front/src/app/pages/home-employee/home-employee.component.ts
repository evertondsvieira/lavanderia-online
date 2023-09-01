import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface IStatusOrder {
  id: number;
  title: string;
  description: string;
  statusBtn: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './home-employee.component.html',
})
export class HomeEmployeeComponent {
  selectedStatus: string = 'all';
  statusOptions: string[] = ['Aberto', 'Cancelado', 'Rejeitado'];

  pedidos: IStatusOrder[] = [
    {
      id: 1,
      title: 'Pedido 1 - Joaquina',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, nam tempore odio consequuntur optio cumque eum reprehenderit, hic alias autem temporibus veniam facere labore qui, magni suscipit ab repudiandae voluptate',
      statusBtn: 'Mudar status para recolhido',
    },
    {
      id: 2,
      title: 'Pedido 2 - Joana',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, nam tempore odio consequuntur optio cumque eum reprehenderit, hic alias autem temporibus veniam facere labore qui, magni suscipit ab repudiandae voluptate',
      statusBtn: 'Mudar status para recolhido',
    },
    {
      id: 3,
      title: 'Pedido 3 - José',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, nam tempore odio consequuntur optio cumque eum reprehenderit, hic alias autem temporibus veniam facere labore qui, magni suscipit ab repudiandae voluptate',
      statusBtn: 'Mudar status para recolhido',
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
