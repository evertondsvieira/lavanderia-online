import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryServicesComponent } from './laundry-services.component';

describe('LaundryServicesComponent', () => {
  let component: LaundryServicesComponent;
  let fixture: ComponentFixture<LaundryServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaundryServicesComponent]
    });
    fixture = TestBed.createComponent(LaundryServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
