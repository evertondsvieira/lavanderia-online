import * as html2pdf from 'html2pdf.js';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IReport } from '../report-customer/report-customer.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-customer-details',
  templateUrl: './report-customer-details.component.html',
})
export class ReportCustomerDetailsComponent implements OnInit {
  @ViewChild('pdfContent') pdfContent!: ElementRef;
  pdfDataUri: string | null = null;
  pdfConvertido = false;

  selectedReport: IReport | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const customerId = +params['id'];
      this.selectedReport = this.reports.find(
        (report) => report.id === customerId,
      )!;
    });
  }

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
        {
          id: 1,
          date: '24/09/2023',
          deliveryDate: '24/09/2023',
          value: 30,
          status: 'Finalizado',
        },
        {
          id: 2,
          date: '24/09/2023',
          deliveryDate: '24/09/2023',
          value: 30,
          status: 'Finalizado',
        },
        {
          id: 3,
          date: '24/09/2023',
          deliveryDate: '24/09/2023',
          value: 30,
          status: 'Finalizado',
        },
        {
          id: 4,
          date: '24/09/2023',
          deliveryDate: '24/09/2023',
          value: 30,
          status: 'Finalizado',
        },
      ],
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
        {
          id: 1,
          date: '24/09/2023',
          deliveryDate: '24/09/2023',
          value: 30,
          status: 'Finalizado',
        },
        {
          id: 2,
          date: '24/09/2023',
          deliveryDate: '24/09/2023',
          value: 30,
          status: 'Finalizado',
        },
        {
          id: 3,
          date: '24/09/2023',
          deliveryDate: '24/09/2023',
          value: 30,
          status: 'Finalizado',
        },
      ],
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
      order: [
        {
          id: 1,
          date: '24/09/2023',
          deliveryDate: '24/09/2023',
          value: 100,
          status: 'Finalizado',
        },
        {
          id: 2,
          date: '24/09/2023',
          deliveryDate: '24/09/2023',
          value: 100,
          status: 'Finalizado',
        },
      ],
    },
    {
      id: 4,
      name: 'Pedro Silva',
      email: 'pedro@example.com',
      cpf: '555.666.777-88',
      phone: 987654321,
      cep: 12345678,
      uf: 'SP',
      city: 'São Paulo',
      neighborhood: 'Vila Madalena',
      street: 'Rua Augusta',
      order: [
        {
          id: 1,
          date: '25/09/2023',
          deliveryDate: '25/09/2023',
          value: 75,
          status: 'Pendente',
        },
      ],
    },
    {
      id: 5,
      name: 'Ana Santos',
      email: 'ana@example.com',
      cpf: '777.888.999-11',
      phone: 999999999,
      cep: 54321098,
      uf: 'PE',
      city: 'Recife',
      neighborhood: 'Boa Viagem',
      street: 'Rua da Aurora',
      order: [
        {
          id: 1,
          date: '27/09/2023',
          deliveryDate: '27/09/2023',
          value: 120,
          status: 'Entregue',
        },
      ],
    },
  ];

  convertToPDF(report: IReport) {
    this.selectedReport = report;
    this.pdfConvertido = true;
    const content = this.pdfContent.nativeElement;
    const options = {
      margin: 10,
      filename: `${report.name}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'landscape' },
    };

    html2pdf()
      .from(content)
      .set(options)
      .outputPdf()
      .then((pdf: string) => {
        this.pdfDataUri = 'data:application/pdf;base64,' + btoa(pdf);
      })
      .catch((error: unknown) => console.error(error));
  }
}
