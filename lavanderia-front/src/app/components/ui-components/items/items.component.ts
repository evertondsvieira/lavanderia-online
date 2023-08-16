import { Component } from '@angular/core';

interface IItem {
  id: number
  imageSrc: string
  title: string
  description: string
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
})

export class ItemsComponent {
  items: IItem[] = [
    {
      id: 1,
      imageSrc: 'assets/lavagem.png',
      title: 'Item 1',
      description: 'Descrição do Item 1'
    },
    {
      id: 2,
      imageSrc: 'assets/lavagem.png',
      title: 'Item 2',
      description: 'Descrição do Item 2'
    },
    {
      id: 3,
      imageSrc: 'assets/lavagem.png',
      title: 'Item 3',
      description: 'Descrição do Item 2'
    },
    {
      id: 4,
      imageSrc: 'assets/lavagem.png',
      title: 'Item 4',
      description: 'Descrição do Item 2'
    },
  ];
}

