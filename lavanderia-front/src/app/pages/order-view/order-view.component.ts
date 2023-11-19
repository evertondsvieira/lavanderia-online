import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/app/environment';
import { PedidoCarrinho } from '../order/order.component';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
})
export class OrderViewComponent {
  apiUrl = environment.apiUrl
  pedidos: PedidoCarrinho[] = []

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<PedidoCarrinho[]>(this.apiUrl + 'order').subscribe({
      next: (data: PedidoCarrinho[]) => {
        this.pedidos = data;
        console.log(this.pedidos)
      },
      error: (error: any) => {
        console.error('Erro ao buscar os dados:', error)
      },
    });
  }

  palette: { [key: string]: string } = {
    'EM ABERTO': 'bg-yellow-300',
    'REJEITADO': 'bg-red-500',
    'CANCELADO': 'bg-red-500',
    'RECOLHIDO': 'bg-gray-400',
    'AGUARDANDO PAGAMENTO': 'bg-blue-300',
    'PAGO': 'bg-orange-300',
    'FINALIZADO': 'bg-green-300', 
  }

  getColor(status: string): string {
    return this.palette[status] || 'bg-white';
  }

  statusTransitions: Record<string, string> = {
    'EM ABERTO': 'RECOLHIDO',
    'RECOLHIDO': 'AGUARDANDO PAGAMENTO',
    'AGUARDANDO PAGAMENTO': 'PAGO',
    'PAGO': 'FINALIZADO',
  };
  
  confirmStatusChange(order: PedidoCarrinho) {
    if (order && this.statusTransitions.hasOwnProperty(order.status)) {
      order.status = this.statusTransitions[order.status];
      this.selectedOrderToChangeStatus = null;
    }
  }

  onRecolhimentoConfirmed(order: PedidoCarrinho): void {
  }

  onLavagemConfirmed(order: PedidoCarrinho): void {
  }

  onFinalizacaoConfirmed(order: PedidoCarrinho): void {
  }

  selectedOrderToChangeStatus: PedidoCarrinho | null = null;

  openConfirmationModal(order: PedidoCarrinho) {
    this.selectedOrderToChangeStatus = order;
  }

  cancelStatusChange() {
    this.selectedOrderToChangeStatus = null;
  }
}
