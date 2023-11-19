import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment';
import { PedidoCarrinho } from '../order/order.component';

@Component({
  selector: 'app-order',
  templateUrl: './home-employee.component.html',
})
export class HomeEmployeeComponent {
  apiUrl = environment.apiUrl;
  selectedStatus: string = 'all';
  listaVazia: boolean = false
  pedidos: PedidoCarrinho[] = []

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
      },
    });
  }

  showDetailsOrder(id: number) {
    this.router.navigate(['/order', id]);
  }

  selectedStatusToChange: PedidoCarrinho | null = null;

  openConfirmationModal(status: PedidoCarrinho) {
    this.selectedStatusToChange = status;
  }

  confirmStatusChange() {
    if (this.selectedStatusToChange) { 
      const index = this.pedidos.indexOf(this.selectedStatusToChange);
      if (index !== -1) {       
        this.pedidos.splice(index, 1);
        this.listaVazia = this.pedidos.length === 0
      }
      this.selectedStatusToChange = null;
    }
  }
  
  cancelStatusChange() {
    this.selectedStatusToChange = null;
  }
}
