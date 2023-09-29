import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMaintenanceComponent } from './employee-maintenance.component';

describe('EmployeeMaintenanceComponent', () => {
  let component: EmployeeMaintenanceComponent;
  let fixture: ComponentFixture<EmployeeMaintenanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeMaintenanceComponent]
    });
    fixture = TestBed.createComponent(EmployeeMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
