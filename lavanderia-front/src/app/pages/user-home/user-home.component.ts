import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment';
import { PedidoCarrinho } from '../order/order.component';
import { AuthService } from 'src/app/utils/AuthService';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
})
export class UserHomeComponent implements OnInit {
  apiUrl = environment.apiUrl;
  pedidos: PedidoCarrinho[] = [];
  nome = this.authService.getUserName()
  showErrorAlert: boolean = false;

  constructor(private http: HttpClient, private authService: AuthService) {}
  
  ngOnInit(): void {
    const userId = this.authService.getUserId();

    this.http.get<PedidoCarrinho[]>(this.apiUrl + `order/user/${userId}`).subscribe({
      next: (pedidos: PedidoCarrinho[]) => {
        this.pedidos = pedidos.filter(
          (pedido) => pedido.status === 'EM ABERTO',
        );
      },
      error: (error: any) => {
        console.log('Erro ao buscar os dados', error);
        this.showErrorAlert = true;

        setTimeout(() => {
        this.showErrorAlert = false;
         }, 5000);
      },
    });
  }

  onCancelOrder(order: PedidoCarrinho): void {
    const orderId = order.id
    const userId = order.userId

    if (order && order.id && order.userId) {
      const requestBody = { ...order, status: 'CANCELADO' }
      const requestUrl = `${this.apiUrl}order/${orderId}/user/${userId}`

      this.http.put<PedidoCarrinho>(requestUrl, requestBody).subscribe({
        next: (data: PedidoCarrinho) => {
          const index = this.pedidos.findIndex(pedido => pedido.id === data.id);
          if (index !== -1) {
            this.pedidos[index] = data;
          }
          this.selectedOrderToChangeStatus = null;
        },
        error: (error: any) => {
          console.log('Error in HTTP response:', error);
          this.showErrorAlert = true;

    setTimeout(() => {
      this.showErrorAlert = false;
    }, 5000);
        },
      });
    } else {
      console.error('Invalid order or user ID');
    }
  }

  selectedOrderToChangeStatus: PedidoCarrinho | null = null

  openConfirmationModal(order: PedidoCarrinho) {
    this.selectedOrderToChangeStatus = order
  }

  cancelStatusChange() {
    this.selectedOrderToChangeStatus = null
  }  
}
