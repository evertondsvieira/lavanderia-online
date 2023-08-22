import { Injectable } from '@angular/core';

interface IDetalhesPedido {
  id: number;
  detalhes: string;
}

@Injectable({
  providedIn: 'root',
})
export class DetalhesPedidoService {
  private detalhes: IDetalhesPedido[] = [
    { id: 1, detalhes: 'aa' },
    { id: 2, detalhes: 'bb' },
  ];

  getDetalhesById(id: number): string | undefined {
    const detalhesPedido = this.detalhes.find((item) => item.id === id);
    return detalhesPedido?.detalhes;
  }
}
