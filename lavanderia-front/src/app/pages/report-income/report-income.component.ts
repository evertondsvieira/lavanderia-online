import * as html2pdf from 'html2pdf.js';
import { Component, ElementRef, ViewChild } from '@angular/core';

export interface IReport {
  dateS: Date;
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

  reports: IReport[] = [
    {
      dateS: new Date('2023-08-27'),
      dateE: new Date(),
      income: 'R$ 3000',
      total: 'R$ 5000',
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
