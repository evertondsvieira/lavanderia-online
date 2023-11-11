import * as html2pdf from 'html2pdf.js';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IReport } from '../report-customer/report-customer.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment';

@Component({
  selector: 'app-report-customer-details',
  templateUrl: './report-customer-details.component.html',
})
export class ReportCustomerDetailsComponent implements OnInit {
  @ViewChild('pdfContent') pdfContent!: ElementRef;
  pdfDataUri: string | null = null;
  pdfConvertido = false;
  apiUrl = environment.apiUrl;
  selectedReport: IReport | null = null;
  reports: IReport[] = []

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const customerId = +params['id'];
  
      this.http.get<IReport>(`${this.apiUrl}user/${customerId}`).subscribe({
        next: (data: IReport) => {
          this.selectedReport = data;
        },
        error: (error: any) => {
          console.error('Erro ao buscar os dados:', error);
        },
      });
    });
  }

  convertToPDF(report: IReport) {
    this.selectedReport = report;
    this.pdfConvertido = true;
    const content = this.pdfContent.nativeElement;
    const options = {
      margin: 10,
      filename: `${report.nome}.pdf`,
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
