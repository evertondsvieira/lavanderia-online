import { Component, Input } from '@angular/core';

interface IStatus {
  title: string;
  description: string;
  statusBtn: string;
}

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
})
export class StatusComponent {
  pedidos: IStatus[] = [
    {
      title: 'Pedido 2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, nam tempore odio consequuntur optio cumque eum reprehenderit, hic alias autem temporibus veniam facere labore qui, magni suscipit ab repudiandae voluptate',
      statusBtn: 'Aberto',
    },
    {
      title: 'Pedido 1',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, nam tempore odio consequuntur optio cumque eum reprehenderit, hic alias autem temporibus veniam facere labore qui, magni suscipit ab repudiandae voluptate',
      statusBtn: 'Fechado',
    },
  ];
}
