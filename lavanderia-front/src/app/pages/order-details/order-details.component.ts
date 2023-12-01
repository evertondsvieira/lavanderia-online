import { Component } from '@angular/core';
import { ItemPedido, PedidoCarrinho } from '../order/order.component';
import { environment } from 'src/app/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
})
export class OrderDetailsComponent {
  isConfirmationModalOpen: boolean = false;
  apiUrl = environment.apiUrl;
  pedidos: PedidoCarrinho[] = [];
  itemPedido: ItemPedido[] = [];
  showErrorAlert: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private datePipe: DatePipe) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');

    this.http.get<PedidoCarrinho>(this.apiUrl + 'order/' + orderId).subscribe({
      next: (data: PedidoCarrinho) => {
        this.pedidos = [data]; 
      },
      error: (error: any) => {
        console.error('Erro ao buscar os dados:', error);
        this.showErrorAlert = true;

        setTimeout(() => {
        this.showErrorAlert = false;
         }, 5000);
      },
    });
  }
  
  onConfirmPayment(order: PedidoCarrinho): void {
    const orderId = this.route.snapshot.paramMap.get('id')
    const userId = order.userId
    const formattedDate = moment(new Date()).format('DD/MM/YYYY - HH:mm');

    if (order && order.id && order.userId) {
      const requestBody = { ...order, dataPagamento: formattedDate, status: 'PAGO' }
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
          this.showErrorAlert = true;

        setTimeout(() => {
        this.showErrorAlert = false;
         }, 5000);
        },
      });
    } else {
      console.error('Invalid order or user ID');
      this.showErrorAlert = true;

        setTimeout(() => {
        this.showErrorAlert = false;
         }, 5000);
    }
  }

  isDisplayPaymentDate(status: string): boolean {
    const excludedStatus = ["EM ABERTO", "AGUARDANDO PAGAMENTO", "RECOLHIDO"];
    return !excludedStatus.includes(status);
  }

  selectedOrderToChangeStatus: PedidoCarrinho | null = null

  openConfirmationModal(order: PedidoCarrinho): void {
    this.selectedOrderToChangeStatus = order
  }

  onCancelClick(): void {
    this.selectedOrderToChangeStatus = null;
  }

  parseDateString(dateString: string): Date {
    const [day, month, yearAndTime] = dateString.split('/');
    const [year, time] = yearAndTime.split(', ');
    const [hours, minutes, seconds] = time.split(':');

    return new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
  }

  
}
