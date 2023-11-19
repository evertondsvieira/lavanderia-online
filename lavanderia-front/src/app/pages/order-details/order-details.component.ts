import { Component } from '@angular/core';
import { ItemPedido, PedidoCarrinho } from '../order/order.component';
import { environment } from 'src/app/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
})
export class OrderDetailsComponent {
  isConfirmationModalOpen: boolean = false;
  apiUrl = environment.apiUrl;
  pedidos: PedidoCarrinho[] = [];
  itemPedido: ItemPedido[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

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
  
  onConfirmPayment(): void {
    const orderId = this.route.snapshot.paramMap.get('id');

    this.http.put(this.apiUrl + `order/${orderId}`, { status: 'PAGO' }).subscribe({
      next: () => {
        this.ngOnInit(); 
      },
      error: (error: any) => {
        console.error('Erro ao confirmar o pagamento:', error);
      },
    });
    this.isConfirmationModalOpen = false;
  }
  
  openConfirmationModal(): void {
    this.isConfirmationModalOpen = true;
  }

  onCancelClick(): void {
    this.isConfirmationModalOpen = false;
    console.log('Compra cancelada');
  }

  onConfirmClick(): void {
    this.isConfirmationModalOpen = false;
    console.log('Compra finalizada');
  }
}
