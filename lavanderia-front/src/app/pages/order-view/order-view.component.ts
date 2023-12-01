import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/app/environment';
import { PedidoCarrinho } from '../order/order.component';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
})
export class OrderViewComponent {
  apiUrl = environment.apiUrl
  pedidos: PedidoCarrinho[] = []
  startDate: string | null = null;
  endDate: string | null = null;
  showErrorAlert: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<PedidoCarrinho[]>(this.apiUrl + 'order').subscribe({
      next: (data: PedidoCarrinho[]) => {
        const sortedData = data.sort((a, b) => a.id - b.id)
        this.pedidos = sortedData
      },
      error: (error: any) => {
        console.error('Erro ao buscar os dados:', error)
        this.showErrorAlert = true;

        setTimeout(() => {
        this.showErrorAlert = false;
         }, 5000);
      },
    })
  }

  getParams(): { [key: string]: string } {
    const params: { [key: string]: string } = {};
    if (this.startDate) {
      params['startDate'] = this.startDate;
    }
    if (this.endDate) {
      params['endDate'] = this.endDate;
    }
    return params;
  }
  
  arrayToDate(dateArray: number[]): Date {
    if (dateArray.length < 3) {
      throw new Error('Array de data inválido');
    }

    const [year, month, day] = dateArray;

    return new Date(year, month - 1, day);
  }

  formatDate(date: Date): string {
    const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const formattedDay = date.getDate().toString().padStart(2, '0');
    const formattedYear = date.getFullYear();

    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
  }

  formatDateAndLog(data: number[]): string {
    const formattedDate = this.formatDate(this.arrayToDate(data));
    return formattedDate;
  }

  updateDateRange(dateRange: {
    startDate: string | null;
    endDate: string | null;
  }) {
    this.startDate = dateRange.startDate;
    this.endDate = dateRange.endDate;
    this.applyFilter();
  }

  applyFilter(): void {
    this.http
      .get<PedidoCarrinho[]>(this.apiUrl + 'order/search', {
        params: this.getParams(),
      })
      .subscribe({
        next: (data: PedidoCarrinho[]) => {
          this.pedidos = data;
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
          window.location.reload()
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

  palette: { [key: string]: string } = {
    'EM ABERTO': 'bg-yellow-300',
    'REJEITADO': 'bg-red-500',
    'CANCELADO': 'bg-red-500',
    'RECOLHIDO': 'bg-gray-400',
    'AGUARDANDO PAGAMENTO': 'bg-blue-300',
    'PAGO': 'bg-orange-300',
    'FINALIZADO': 'bg-green-300', 
  }

  getColor(status: string): string {
    return this.palette[status] || 'bg-white'
  }

  statusTransitions: Record<string, string> = {
    'EM ABERTO': 'RECOLHIDO',
    'RECOLHIDO': 'AGUARDANDO PAGAMENTO',
    'AGUARDANDO PAGAMENTO': 'PAGO',
    'PAGO': 'FINALIZADO',
  }
  
  confirmStatusChange(order: PedidoCarrinho) {
    const newStatus = this.getNextStatus(order.status)
    this.handleStatusChange(newStatus, order)
  }

  getNextStatus(currentStatus: string): string {
    const statusTransitions: Record<string, string> = {
      'EM ABERTO': 'RECOLHIDO',
      'RECOLHIDO': 'AGUARDANDO PAGAMENTO',
      'AGUARDANDO PAGAMENTO': 'PAGO',
      'PAGO': 'FINALIZADO',
    }

    return statusTransitions[currentStatus]
  }

  handleStatusChange(newStatus: string, order: PedidoCarrinho): void {
    if (newStatus) {
      this.updateStatus(newStatus, order)
    } else {
      console.error('Invalid status transition')
      this.showErrorAlert = true;

        setTimeout(() => {
        this.showErrorAlert = false;
         }, 5000);
    }
  }

  onRecolhimentoConfirmed(order: PedidoCarrinho): void {
    this.updateStatus('RECOLHIDO', order)
  }
  
  onLavagemConfirmed(order: PedidoCarrinho): void {
    this.updateStatus('AGUARDANDO PAGAMENTO', order)
  }
  
  onFinalizacaoConfirmed(order: PedidoCarrinho): void {
    this.updateStatus('PAGO', order)
  }

  onFinal(order: PedidoCarrinho): void {
    this.updateStatus('FINALIZADO', order)
  }

  selectedOrderToChangeStatus: PedidoCarrinho | null = null

  openConfirmationModal(order: PedidoCarrinho) {
    this.selectedOrderToChangeStatus = order
  }

  cancelStatusChange() {
    this.selectedOrderToChangeStatus = null
  }
}
