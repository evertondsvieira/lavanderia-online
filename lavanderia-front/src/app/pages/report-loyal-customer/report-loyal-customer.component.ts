import * as html2pdf from 'html2pdf.js';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IReport } from '../report-customer/report-customer.component';
import { environment } from 'src/app/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-report-loyal-customer',
  templateUrl: './report-loyal-customer.component.html',
})
export class ReportLoyalCustomerComponent {
  @ViewChild('pdfContent') pdfContent!: ElementRef;
  apiUrl = environment.apiUrl;
  pdfDataUri: string | null = null;
  pdfConvertido = false;

  reports: IReport[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadLoyalCustomers();
  }

  loadLoyalCustomers() {
    this.getAllUsers().subscribe({
      next: (loyalUsers: IReport[]) => {
        this.reports = loyalUsers;
      },
      error: (error: any) => {
        console.error('Erro ao buscar usuários fiéis:', error);
      },
    });
  }

  getAllUsers() {
    return this.http.get<IReport[]>(`${this.apiUrl}user/top-loyal`);
  }

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
      })
      .catch((error: unknown) => {
        console.error(error);
      });
  }
}
