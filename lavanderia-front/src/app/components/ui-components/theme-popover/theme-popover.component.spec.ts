import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemePopoverComponent } from './theme-popover.component';

describe('ThemePopoverComponent', () => {
  let component: ThemePopoverComponent;
  let fixture: ComponentFixture<ThemePopoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemePopoverComponent]
    });
    fixture = TestBed.createComponent(ThemePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
