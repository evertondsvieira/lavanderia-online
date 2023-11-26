import { Component } from '@angular/core';
import { ItemPedido, PedidoCarrinho } from '../order/order.component';
import { environment } from 'src/app/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/utils/AuthService';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
})
export class OrderDetailsComponent {
  isConfirmationModalOpen: boolean = false;
  apiUrl = environment.apiUrl;
  pedidos: PedidoCarrinho[] = [];
  itemPedido: ItemPedido[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
  
    this.http.get<PedidoCarrinho>(this.apiUrl + 'order/' + orderId).subscribe({
      next: (data: PedidoCarrinho) => {
        this.pedidos = [data]; 
      },
      error: (error: any) => {
        console.error('Erro ao buscar os dados:', error);
      },
    });
  }
  
  onConfirmPayment(order: PedidoCarrinho): void {
    const orderId = this.route.snapshot.paramMap.get('id')
    const userId = order.userId

    if (order && order.id && order.userId) {
      const requestBody = { ...order, status: 'PAGO' }
      const requestUrl = `${this.apiUrl}order/${orderId}/user/${userId}`

      this.http.put<PedidoCarrinho>(requestUrl, requestBody).subscribe({
        next: (data: PedidoCarrinho) => {
          const index = this.pedidos.findIndex(pedido => pedido.id === data.id);
          if (index !== -1) {
            this.pedidos[index] = data;
          }
          this.selectedOrderToChangeStatus = null;
          this.ngOnInit()
        },
        error: (error: any) => {
          console.log('Error in HTTP response:', error);
        },
      });
    } else {
      console.error('Invalid order or user ID');
    }
  }

  selectedOrderToChangeStatus: PedidoCarrinho | null = null

  openConfirmationModal(order: PedidoCarrinho): void {
    this.selectedOrderToChangeStatus = order
  }

  onCancelClick(): void {
    this.selectedOrderToChangeStatus = null;
  }
}
