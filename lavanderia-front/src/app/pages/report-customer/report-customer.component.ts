import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface IReport {
  id: number,
  name: string;
  email: string;
  cpf: string;
  phone: number;
  cep: number;
  uf: string;
  city: string;
  neighborhood: string;
  street: string;
  order: { id: number, date: string, deliveryDate: string, value: number, status: string }[]
}

@Component({
  selector: 'app-report-customer',
  templateUrl: './report-customer.component.html',
})
export class ReportCustomerComponent { 
  reports: IReport[] = [
    {
      id: 1,
      name: 'João da Silva',
      email: 'joao@example.com',
      cpf: '123.456.789-00',
      phone: 123456789,
      cep: 12345678,
      uf: 'SP',
      city: 'São Paulo',
      neighborhood: 'Centro',
      street: 'Avenida Paulista',
      order: [
        { id: 1, date: "24/09/2023", deliveryDate: "24/09/2023", value: 30, status: "Finalizado" },
        { id: 2, date: "24/09/2023", deliveryDate: "24/09/2023", value: 30, status: "Finalizado" },
        { id: 3, date: "24/09/2023", deliveryDate: "24/09/2023", value: 30, status: "Finalizado" },
      ]
    },
    {
      id: 2,
      name: 'Maria Oliveira',
      email: 'maria@example.com',
      cpf: '987.654.321-00',
      phone: 123456789,
      cep: 54321876,
      uf: 'RJ',
      city: 'Rio de Janeiro',
      neighborhood: 'Copacabana',
      street: 'Rua Nossa Senhora de Copacabana',
      order: [
        { id: 1, date: "24/09/2023", deliveryDate: "24/09/2023", value: 30, status: "Finalizado" },
        { id: 2, date: "24/09/2023", deliveryDate: "24/09/2023", value: 30, status: "Finalizado" },
      ]
    },
    {
      id: 3,
      name: 'Carlos Souza',
      email: 'carlos@example.com',
      cpf: '111.222.333-44',
      phone: 123456789,
      cep: 98765432,
      uf: 'MG',
      city: 'Belo Horizonte',
      neighborhood: 'Savassi',
      street: 'Avenida Getúlio Vargas',
      order: [{ id: 3, date: "24/09/2023", deliveryDate: "24/09/2023", value: 100, status: "Finalizado" }]
    },
  ];

  constructor(private router: Router) {}
  
  showDetails(report: any) {
    const customerId = report.id;
    this.router.navigate(['/report/customer/', customerId]);
  }
}
