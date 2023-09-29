import * as html2pdf from 'html2pdf.js';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IReport } from '../report-customer/report-customer.component';

@Component({
  selector: 'app-report-loyal-customer',
  templateUrl: './report-loyal-customer.component.html',
})
export class ReportLoyalCustomerComponent {
  @ViewChild('pdfContent') pdfContent!: ElementRef;
  pdfDataUri: string | null = null;
  pdfConvertido = false;

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
  ];

  convertToPDF() {
    this.pdfConvertido = true;
    const content = this.pdfContent.nativeElement;
    const options = {
      margin: 10,
      filename: `Relatorio.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'landscape' },
    };

    html2pdf()
      .from(content)
      .set(options)
      .output()
      .then((pdf: string) => {
        this.pdfDataUri = 'data:application/pdf;base64,' + btoa(pdf);
        console.log('PDF generated successfully');
      })
      .catch((error: unknown) => {
        console.error(error);
        console.log('PDF generation failed');
      });
  }
}
