import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment';
import { IStatusOrder } from '../order/order.component';
import { AuthService } from 'src/app/utils/AuthService';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
})
export class UserHomeComponent implements OnInit {
  apiUrl = environment.apiUrl;
  pedidosAbertos: IStatusOrder[] = [];
  isConfirmationModalOpen: boolean = false
  orderIdToCancel: number | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}
  
  ngOnInit(): void {
    const userId = this.authService.getUserId();

    this.http.get<IStatusOrder[]>(this.apiUrl + `order/user/${userId}`).subscribe({
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

  onCancelOrder(): void {
    if (this.orderIdToCancel !== null) {
      const userId = this.authService.getUserId();
  
      this.http.put(this.apiUrl + `order/${this.orderIdToCancel}/user/${userId}`, { status: 'CANCELADO' })
        .subscribe({
          next: () => {
            window.location.reload();
          },
          error: (error: any) => {
            console.log('Erro ao cancelar o pedido', error);
          },
        });
  
      this.isConfirmationModalOpen = false;
      this.orderIdToCancel = null;
    }
  }
  
  onOpenModal(id: number): void {
    this.orderIdToCancel = id;
    this.isConfirmationModalOpen = true;
  }

  onCancelClick(): void {
    this.isConfirmationModalOpen = false;
  }
}
