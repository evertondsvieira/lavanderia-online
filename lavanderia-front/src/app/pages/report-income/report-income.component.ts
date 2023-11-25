import * as html2pdf from 'html2pdf.js';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { environment } from 'src/app/environment';
import { HttpClient } from '@angular/common/http';

export interface IReportResponse {
  inicio: Date;
  fim: Date;
  receitaTotal: number;
}

@Component({
  selector: 'app-report-income',
  templateUrl: './report-income.component.html',
})
export class ReportIncomeComponent implements OnInit  {
  @ViewChild('pdfContent') pdfContent!: ElementRef;
  pdfDataUri: string | null = null;
  pdfConvertido = false;
  apiUrl = environment.apiUrl;
  reports: IReportResponse[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<IReportResponse | IReportResponse[]>(this.apiUrl + 'recipe/report').subscribe({
      next: (data: IReportResponse | IReportResponse[]) => {
        if (Array.isArray(data)) {
          this.reports = data;
        } else if (typeof data === 'object' && data !== null) {
          this.reports = [data];
        } else {
          console.error('API response format is not recognized:', data);
        }
      },
      error: (error: any) => {
        console.error('Erro ao buscar os dados:', error);
      },
    });
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
