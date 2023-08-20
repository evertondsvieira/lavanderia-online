import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './inputs.component.html',
})
export class InputsComponent {
  @Input() icon: string | null = null;
  @Input() size: 'xs' | 'sm' | 'lg' | 'default' = 'default';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
}
