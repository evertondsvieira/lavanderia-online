import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLoyalCustomerComponent } from './report-loyal-customer.component';

describe('ReportLoyalCustomerComponent', () => {
  let component: ReportLoyalCustomerComponent;
  let fixture: ComponentFixture<ReportLoyalCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportLoyalCustomerComponent]
    });
    fixture = TestBed.createComponent(ReportLoyalCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
