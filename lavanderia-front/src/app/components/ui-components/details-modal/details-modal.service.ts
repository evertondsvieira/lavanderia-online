import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../product/product.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/utils/AuthService';

@Injectable({
  providedIn: 'root'
})
export class DetailsModalService {

  private cartItemsSubject = new BehaviorSubject<IProduct[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService
  ) {}
  calculateTotalValue(): number {
    return this.cartItemsSubject.value.reduce(
      (total, product) => total + product.valor * product.quantidade,
      0,
    );
  }
  calculateDeliveryDate(): string {
    const currentDate = new Date();
    const maxPrazo = Math.max(
      ...this.cartItemsSubject.value.map((product) => parseInt(product.prazo, 10))
    );
  
    const deliveryDate = new Date(currentDate.setDate(currentDate.getDate() + maxPrazo));
    return deliveryDate.toLocaleString();
  }

}
