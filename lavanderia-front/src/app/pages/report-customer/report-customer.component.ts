import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment';

export interface IReport {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: number;
  cep: number;
  uf: string;
  cidade: string;
  bairro: string;
  rua: string;
  pedidos: {
    id: number;
    data: string;
    prazo: string;
    valor: number;
    status: string;
  }[];
}

@Component({
  selector: 'app-report-customer',
  templateUrl: './report-customer.component.html',
})
export class ReportCustomerComponent {
  reports: IReport[] = []
  apiUrl = environment.apiUrl;
  showErrorAlert: boolean = false;

  constructor(
    private http: HttpClient, 
    private router: Router,
  ) {}

  formatarCPF(cpf: string): string {
    if (cpf === null) {
      return ''
    }
  
    const cpfFormatado = `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9)}`
  
    return cpfFormatado;
  }

  ngOnInit(): void {
    this.http.get<IReport[]>(this.apiUrl + 'user').subscribe({
      next: (data: IReport[]) => {
        const formattedData = data.map(report => ({
          ...report,
          cpf: this.formatarCPF(report.cpf),
        }));
        const sortedData = formattedData.sort((a, b) => a.id - b.id);
        this.reports = sortedData;
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

  showDetails(report: any) {
    const customerId = report.id;
    this.router.navigate(['/report/customer/', customerId]);
  }
}
