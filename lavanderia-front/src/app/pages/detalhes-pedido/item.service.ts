import { Injectable } from '@angular/core';

interface IItem {
  id: number;
  imageSrc: string;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: IItem[] = []

  getItemById(id: number): IItem | undefined {
    return this.items.find(item => item.id === id);
  }
}
