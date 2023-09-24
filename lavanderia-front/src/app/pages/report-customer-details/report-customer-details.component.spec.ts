import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCustomerDetailsComponent } from './report-customer-details.component';

describe('ReportCustomerDetailsComponent', () => {
  let component: ReportCustomerDetailsComponent;
  let fixture: ComponentFixture<ReportCustomerDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportCustomerDetailsComponent]
    });
    fixture = TestBed.createComponent(ReportCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
