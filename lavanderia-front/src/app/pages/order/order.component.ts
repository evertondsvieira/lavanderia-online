import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment';
import { AuthService } from 'src/app/utils/AuthService';

interface Usuario {
  id: number;
}

export interface ItemPedido {
  item: {
    id: number;
    nome: string;
    valor: number;
    descricao: string;
    imgUrl: string;
    prazo: string;
    quantidade: number;
  }
  quantidade: number;
}

export interface PedidoCarrinho {
  id: number;
  nome: string;
  data: string;
  status: string;
  valor: number;
  prazo: string;
  usuario: Usuario;
  userId: Number;
  itemsPedido: ItemPedido[];
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  apiUrl = environment.apiUrl;
  pedidos: PedidoCarrinho[] = [];
  selectedStatus: string = 'all';
  selectedOrderToChangeStatus: PedidoCarrinho | null = null;
  statusOptions: string[] = ['EM ABERTO', 'CANCELADO', 'REJEITADO'];

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();

    this.http
      .get<PedidoCarrinho[]>(this.apiUrl + `order/user/${userId}`)
      .subscribe({
        next: (data: PedidoCarrinho[]) => {
          this.pedidos = data.sort((a, b) => b.id - a.id)
        },
        error: (error: any) => {
          console.error('Erro ao buscar os dados:', error)
        },
      });
  }

  get filteredPedidos() {
    if (this.selectedStatus === 'all') {
      return this.pedidos;
    } else {
      return this.pedidos.filter(
        (pedido) => pedido.status === this.selectedStatus,
      );
    }
  }

  openConfirmationModal(pedido: PedidoCarrinho) {
    this.selectedOrderToChangeStatus = pedido;
  }

  confirmStatusChange(pedido: PedidoCarrinho) {
    if (pedido) {
      if (pedido.status === 'Em aberto') {
        pedido.status = 'Pago';
        this.selectedOrderToChangeStatus = null;
      }
    }
  }

  confirmStatusCancel(pedido: PedidoCarrinho) {
    if (pedido) {
      if (pedido.status === 'Em aberto') {
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
