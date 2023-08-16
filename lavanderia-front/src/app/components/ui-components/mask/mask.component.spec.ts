import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskComponent } from './mask.component';

describe('MaskComponent', () => {
  let component: MaskComponent;
  let fixture: ComponentFixture<MaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaskComponent]
    });
    fixture = TestBed.createComponent(MaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
