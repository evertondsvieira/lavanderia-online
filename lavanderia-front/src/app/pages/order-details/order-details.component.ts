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

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
  
    this.http.get<IStatusOrder>(this.apiUrl + 'order/' + orderId).subscribe({
      next: (data: IStatusOrder) => {
        // Convert items from object to array
        data.items = Object.values(data.items);
  
        this.pedidos = [data]; // Wrap data in an array
        console.log(this.pedidos);
      },
      error: (error: any) => {
        console.error('Erro ao buscar os dados:', error);
      },
    });
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
