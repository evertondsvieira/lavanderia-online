import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment';
import { PedidoCarrinho } from '../order/order.component';

@Component({
  selector: 'app-order',
  templateUrl: './home-employee.component.html',
})
export class HomeEmployeeComponent implements OnInit {
  apiUrl = environment.apiUrl;
  selectedStatus: string = 'all';
  listaVazia: boolean = false
  pedidos: PedidoCarrinho[] = []
  showErrorAlert: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<PedidoCarrinho[]>(this.apiUrl + 'order').subscribe({
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

  updateStatus(newStatus: string, order: PedidoCarrinho): void {
    const orderId = order.id
    const userId = order.userId

    if (order && order.id && order.userId) {
      const requestBody = { ...order, status: newStatus }
      const requestUrl = `${this.apiUrl}order/${orderId}/user/${userId}`
  
      this.http.put<PedidoCarrinho>(requestUrl, requestBody).subscribe({
        next: (data: PedidoCarrinho) => {
          this.pedidos = [data]
          this.cancelStatusChange()
          this.ngOnInit()
        },
        error: (error: any) => {
          console.error('Error in HTTP request:', error)
          this.showErrorAlert = true;

        setTimeout(() => {
        this.showErrorAlert = false;
         }, 5000);
        }
      })
    } else {
      console.error('Invalid order or user ID')
      this.showErrorAlert = true;

        setTimeout(() => {
        this.showErrorAlert = false;
         }, 5000);
    }
  }

  showDetailsOrder(id: number) {
    this.router.navigate(['/order', id]);
  }

  selectedStatusToChange: PedidoCarrinho | null = null;

  openConfirmationModal(status: PedidoCarrinho) {
    this.selectedStatusToChange = status;
  }

  confirmStatusChange(order: PedidoCarrinho) {
    this.updateStatus('RECOLHIDO', order)
  }
  
  cancelStatusChange() {
    this.selectedStatusToChange = null;
  }
}
