import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelationModalComponent } from './cancelation-modal.component';

describe('CancelationModalComponent', () => {
  let component: CancelationModalComponent;
  let fixture: ComponentFixture<CancelationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelationModalComponent]
    });
    fixture = TestBed.createComponent(CancelationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
