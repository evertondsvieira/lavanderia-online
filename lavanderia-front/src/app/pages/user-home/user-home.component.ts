import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment';
import { IStatusOrder } from '../order/order.component';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
})
export class UserHomeComponent implements OnInit {
  apiUrl = environment.apiUrl;
  pedidosAbertos: IStatusOrder[] = [];
  isConfirmationModalOpen: boolean = false

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<IStatusOrder[]>(this.apiUrl + 'order').subscribe({
      next: (pedidos: IStatusOrder[]) => {
        this.pedidosAbertos = pedidos.filter(
          (pedido) => pedido.status === 'EM ABERTO',
        );
      },
      error: (error: any) => {
        console.log('Erro ao buscar os dados', error);
      },
    });
  }

  onOpenModal(): void {
    this.isConfirmationModalOpen = true;
  }
  
  onCancelClick(): void {
    this.isConfirmationModalOpen = false;
  }

  onCancelOrder(): void {
    this.isConfirmationModalOpen = false;
    console.log('Pedido cancelado');
  }
}
