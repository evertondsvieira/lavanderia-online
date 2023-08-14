import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './buttons.component.html',
})
export class ButtonsComponent {
  @Input() success = false;
}
