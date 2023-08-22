import { Component } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
})
export class PopoverComponent {
  isPopoverVisible = false;

  togglePopover() {
    this.isPopoverVisible = !this.isPopoverVisible;
  }
}
