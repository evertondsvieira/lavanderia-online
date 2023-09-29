import * as html2pdf from 'html2pdf.js';
import { Component, ElementRef, ViewChild } from '@angular/core';

export interface IReport {
  dateS: Date,
  dateE: Date;
  income: string;
  total: string;
}

@Component({
  selector: 'app-report-income',
  templateUrl: './report-income.component.html',
})
export class ReportIncomeComponent { 
  @ViewChild('pdfContent') pdfContent!: ElementRef;
  pdfDataUri: string | null = null;
  pdfConvertido = false;

  report: IReport[] = [
    {
      dateS: new Date('2023-08-27'),
      dateE: new Date(),
      income: '3000 R$',
      total: '5000 R$'
    },
  ];

  // constructor(private router: Router) {}
  // formatDate(date: Date): string {
  //   const options: Intl.DateTimeFormatOptions = {
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit',
  //   };
  //   return date.toLocaleDateString('en-US', options);
  // }

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
      .outputPdf()
      .then((pdf: string) => {
        this.pdfDataUri = 'data:application/pdf;base64,' + btoa(pdf);
      })
      .catch((error: unknown) => {
        console.error('Error during PDF generation:', error);
      });
  }
}  

