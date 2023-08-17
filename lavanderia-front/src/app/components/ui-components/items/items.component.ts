import { Component } from '@angular/core';

interface IItem {
  id: number;
  imageSrc: string;
  title: string;
  description: string;
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
      title: 'Lavagem e Secagem regular',
      description: 'Descrição do Item 1',
    },
    {
      id: 2,
      imageSrc: 'assets/lavagem.png',
      title: 'Lavagem a seco',
      description: 'Descrição do Item 2',
    },
    {
      id: 3,
      imageSrc: 'assets/lavagem.png',
      title: 'Passar roupa',
      description: 'Descrição do Item 3',
    },
    {
      id: 4,
      imageSrc: 'assets/lavagem.png',
      title: 'Lavagem tênis e calçados',
      description: 'Descrição do Item 4',
    },
  ];
}
