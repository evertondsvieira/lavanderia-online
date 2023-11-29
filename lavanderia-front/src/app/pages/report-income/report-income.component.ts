import * as html2pdf from 'html2pdf.js';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { environment } from 'src/app/environment';
import { HttpClient } from '@angular/common/http';

export interface IReportResponse {
  inicio: any;
  fim: any;
  receitaTotal: number;
}

@Component({
  selector: 'app-report-income',
  templateUrl: './report-income.component.html',
})
export class ReportIncomeComponent {
  @ViewChild('pdfContent') pdfContent!: ElementRef;
  pdfDataUri: string | null = null;
  pdfConvertido = false;
  apiUrl = environment.apiUrl;
  reports: IReportResponse[] = [];
  startDate: string | null = null;
  endDate: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const fistDayOfTheMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    this.startDate = fistDayOfTheMonth.toISOString();

    const lastDayOfTheMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    this.endDate = lastDayOfTheMonth.toISOString()

    const params = {
      startDate: this.startDate.slice(0, 10),
      endDate: this.endDate.slice(0, 10),
    };
  
    this.http.get<IReportResponse>(this.apiUrl + 'recipe/report', { params })
      .subscribe({
        next: (data: IReportResponse) => {
          this.reports = [data]
        },
        error: (error: any) => {
          console.error('Erro ao buscar os dados:', error)
        }
      })
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

  applyFilter(): void {
    this.http
      .get<IReportResponse>(this.apiUrl + 'recipe/report', {
        params: this.getParams(),
      })
      .subscribe({
        next: (data: IReportResponse) => {
          this.reports = [data];
        },
        error: (error: any) => {
          console.error('Erro ao buscar os dados:', error);
        },
      });
  }

  updateDateRange(dateRange: {
    startDate: string | null;
    endDate: string | null;
  }) {
    this.startDate = dateRange.startDate;
    this.endDate = dateRange.endDate;
    this.applyFilter();
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
