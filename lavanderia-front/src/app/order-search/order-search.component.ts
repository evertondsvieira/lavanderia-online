import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment';
import { PedidoCarrinho } from '../pages/order/order.component'

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
})
export class OrderSearchComponent {
  searchOrderId: string = '';
  searchResults: any[] = [];
  apiUrl = environment.apiUrl;
  pedidoId!: PedidoCarrinho['id'];
  pedidoEncontrado: PedidoCarrinho | null = null;
  erroAoBuscarPedido: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  buscarPedido(): void {
    this.erroAoBuscarPedido = null;

    if (this.pedidoId) {
      this.http
        .get<PedidoCarrinho>(this.apiUrl + `order/${this.pedidoId}`)
        .subscribe({
          next: (data: PedidoCarrinho) => {
            if (data) {
              this.pedidoEncontrado = data;
              console.log('Dados do pedido:', data);
            } else {
              this.erroAoBuscarPedido = 'Pedido não encontrado.';
            }
          },
          error: (error: any) => {
            console.error('Erro ao buscar os dados do pedido:', error);
            this.erroAoBuscarPedido = 'Ocorreu um erro ao buscar o pedido.';
          },
        });
    } else {
      console.error('ID do pedido não fornecido.');
      this.erroAoBuscarPedido = 'ID do pedido não fornecido.';
    }
  }
}