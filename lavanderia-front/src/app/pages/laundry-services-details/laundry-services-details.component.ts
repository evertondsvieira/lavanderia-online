import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LaundryDetailsService } from './laundry-service-details.service';

@Component({
  selector: 'app-laundry-services-details',
  templateUrl: './laundry-services-details.component.html',
})
export class LaundryServicesDetailsComponent implements OnInit {
  itemId: number | null = null;
  details: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private LaundryDetailsService: LaundryDetailsService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.itemId = id;
      this.details = this.LaundryDetailsService.getDetailsById(id);
    });
  }
}
