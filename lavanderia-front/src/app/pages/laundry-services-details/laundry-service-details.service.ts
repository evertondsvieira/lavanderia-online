import { Injectable } from '@angular/core';

interface ILaundryServiceDetails {
  id: number;
  details: string;
}

@Injectable({
  providedIn: 'root',
})
export class LaundryDetailsService {
  private details: ILaundryServiceDetails[] = [
    { id: 1, details: 'aa' },
    { id: 2, details: 'bb' },
  ];

  getDetailsById(id: number): string | undefined {
    const laundryDetails = this.details.find((item) => item.id === id);
    return laundryDetails?.details;
  }
}
