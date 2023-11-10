import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment';

export interface IStatusOrder {
  id: number;
  nome: string;
  descricao: string;
  status: string;
  data: string;
  prazo: string
  valor: string
  items: {
    nome: string,
    valor: string,
    imgUrl: string
  }[]
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  apiUrl = environment.apiUrl;
  pedidos: IStatusOrder[] = [];
  selectedStatus: string = 'all';
  selectedOrderToChangeStatus: IStatusOrder | null = null;
  statusOptions: string[] = ['Em andamento', 'Cancelado', 'Rejeitado'];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<IStatusOrder[]>(this.apiUrl + 'order').subscribe({
      next: (data: IStatusOrder[]) => {
        this.pedidos = data;
        console.log(this.pedidos)
      },
      error: (error: any) => {
        console.error('Erro ao buscar os dados:', error);
      },
    });
  }

  get filteredPedidos() {
    if (this.selectedStatus === 'all') {
      return this.pedidos;
    } else {
      return this.pedidos.filter(
        (pedido) => pedido.status === this.selectedStatus
      );
    }
  }

  openConfirmationModal(pedido: IStatusOrder) {
    this.selectedOrderToChangeStatus = pedido;
  }

  confirmStatusChange(pedido: IStatusOrder) {
    if (pedido) {
      if (pedido.status === 'Em andamento') {
        pedido.status = 'Pago';
        this.selectedOrderToChangeStatus = null;
      }
    }
  }

  confirmStatusCancel(pedido: IStatusOrder) {
    if (pedido) {
      if (pedido.status === 'Em andamento'){
        pedido.status = 'Cancelado';
      this.selectedOrderToChangeStatus = null;
    }
  }
  }

  cancelStatusChange() {
    this.selectedOrderToChangeStatus = null;
  }

  showDetailsOrder(id: number) {
    this.router.navigate(['/order', id]);
  }
}
