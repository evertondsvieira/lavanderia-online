import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalhesPedidoService } from './detalhes-pedido.service'; // Importe o serviço

@Component({
  selector: 'app-detalhes-pedido',
  templateUrl: './detalhes-pedido.component.html',
})
export class DetalhesPedidoComponent implements OnInit {
  itemId: number | null = null;
  detalhes: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private detalhesPedidoService: DetalhesPedidoService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.itemId = id;
      this.detalhes = this.detalhesPedidoService.getDetalhesById(id);
    });
  }
}
