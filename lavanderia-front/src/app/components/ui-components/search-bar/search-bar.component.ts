import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  @Input() size: 'sm' | 'default' = 'default';
  @Input() icon: string = '';
  @Input() placeholder: string = '';
}
