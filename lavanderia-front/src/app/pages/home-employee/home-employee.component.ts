import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment';
import { IStatusOrder } from '../order/order.component';

@Component({
  selector: 'app-order',
  templateUrl: './home-employee.component.html',
})
export class HomeEmployeeComponent {
  apiUrl = environment.apiUrl;
  selectedStatus: string = 'all';
  listaVazia: boolean = false
  pedidos: IStatusOrder[] = []

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<IStatusOrder[]>(this.apiUrl + 'order').subscribe({
      next: (pedidos: IStatusOrder[]) => {
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

  selectedStatusToChange: IStatusOrder | null = null;

  openConfirmationModal(status: IStatusOrder) {
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
