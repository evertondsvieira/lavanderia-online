import { Component } from '@angular/core';

export interface Order {
  id: number;
  status: string;
  date: Date;
}

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
})
export class OrderViewComponent {
  orders: Order[] = [
    { id: 1, status: 'EM ABERTO', date: new Date() },
    { id: 2, status: 'REJEITADO', date: new Date() },
    { id: 3, status: 'RECOLHIDO', date: new Date('2023-08-01') },
    { id: 4, status: 'AGUARDANDO PAGAMENTO', date: new Date('2023-08-05') },
    { id: 5, status: 'PAGO', date: new Date('2023-08-10') },
    { id: 6, status: 'FINALIZADO', date: new Date('2023-08-15') },
    // ... adicione mais pedidos aqui
  ];

  getColor(status: string): string {
    switch (status) {
      case 'EM ABERTO':
        return 'bg-yellow-300';
      case 'REJEITADO':
      case 'CANCELADO':
        return 'bg-red-500';
      case 'RECOLHIDO':
        return 'bg-gray-400';
      case 'AGUARDANDO PAGAMENTO':
        return 'bg-blue-300';
      case 'PAGO':
        return 'bg-orange-300';
      case 'FINALIZADO':
        return 'bg-green-300';
      default:
        return 'bg-black';
    }
  }

  onRecolhimentoConfirmed(order: Order): void {
    // Lógica para confirmar recolhimento
  }

  onLavagemConfirmed(order: Order): void {
    // Lógica para confirmar lavagem
  }

  onFinalizacaoConfirmed(order: Order): void {
    // Lógica para finalizar pedido
  }
}
