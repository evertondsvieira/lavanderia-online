import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './buttons.component.html',
})
export class ButtonsComponent {
  @Input() success = false;
  @Output() buttonClick = new EventEmitter<void>()

  onClick() {
    this.buttonClick.emit();
  }
}
