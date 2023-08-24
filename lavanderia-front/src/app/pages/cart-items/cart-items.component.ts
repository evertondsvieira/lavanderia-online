import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LaundryDetailsService } from '../laundry-services-details/laundry-service-details.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
})
export class CartItemsComponent implements OnInit {
  itemId: number | null = null;
  detalhes: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private LaundryDetailsService: LaundryDetailsService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.itemId = id;
      this.detalhes = this.LaundryDetailsService.getDetailsById(id);
    });
  }
}