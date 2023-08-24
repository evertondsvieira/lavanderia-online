import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryServicesDetailsComponent } from './laundry-services-details.component';

describe('LaundryServicesDetailsComponent', () => {
  let component: LaundryServicesDetailsComponent;
  let fixture: ComponentFixture<LaundryServicesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaundryServicesDetailsComponent]
    });
    fixture = TestBed.createComponent(LaundryServicesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
