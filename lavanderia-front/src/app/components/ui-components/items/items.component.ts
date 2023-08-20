import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface IItem {
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
      imageSrc: 'assets/lavagem-a-seco.png',
      title: 'Lavagem a seco',
      description: 'Descrição do Item 2',
    },
    {
      id: 3,
      imageSrc: 'assets/passar-roupa.png',
      title: 'Passar roupa',
      description: 'Descrição do Item 3',
    },
    {
      id: 4,
      imageSrc: 'assets/lavagem-tenis.png',
      title: 'Lavagem tênis e calçados',
      description: 'Descrição do Item 4',
    },
  ];

  constructor(private router: Router) {}

  verDetalhes(id: number) {
    this.router.navigate(['/order', id]);
  }
}
