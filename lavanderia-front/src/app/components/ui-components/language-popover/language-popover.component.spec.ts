import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagePopoverComponent } from './language-popover.component';

describe('LanguagePopoverComponent', () => {
  let component: LanguagePopoverComponent;
  let fixture: ComponentFixture<LanguagePopoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguagePopoverComponent]
    });
    fixture = TestBed.createComponent(LanguagePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
