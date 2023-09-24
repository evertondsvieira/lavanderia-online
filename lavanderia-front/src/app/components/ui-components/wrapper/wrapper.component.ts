import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
})
export class WrapperComponent {
  isHidden: boolean = true;
  @Input()
  name!: string;

  toggleContent() {
    this.isHidden = !this.isHidden;
  }
}
