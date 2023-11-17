import { Component } from '@angular/core';
import { IStatusOrder } from '../order/order.component';
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
  pedidos: IStatusOrder[] = [];

  numeroDoPedido: string = '';

  pesquisarPedido(): void { //Lógica para busca de pedidos por número
    if (this.numeroDoPedido.trim() !== '') {
      this.http.get<IStatusOrder>(this.apiUrl + 'order/' + this.numeroDoPedido).subscribe({
        next: (data: IStatusOrder) => {
          this.pedidos = [];
          data.items = Object.values(data.items);
          this.pedidos.push(data);
        },
        error: (error: any) => {
          console.error('Erro ao buscar os dados:', error);
        },
      });
    }
  }

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');

    this.http.get<IStatusOrder>(this.apiUrl + 'order/' + orderId).subscribe({
      next: (data: IStatusOrder) => {
        data.items = Object.values(data.items)
  
        this.pedidos = [data]
      },
      error: (error: any) => {
        console.error('Erro ao buscar os dados:', error)
      }
    })
  }

  onConfirmPayment(): void {
    const orderId = this.route.snapshot.paramMap.get('id');

    this.http.put(this.apiUrl + `order/${orderId}`, { status: 'PAGO' }).subscribe({
      next: () => {
        window.location.reload();
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
