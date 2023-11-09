import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './inputs.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputsComponent),
      multi: true,
    },
  ],
})

export class InputsComponent implements ControlValueAccessor {
  @Input() icon: string | null = null;
  @Input() size: 'xs' | 'sm' | 'lg' | 'default' = 'default';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  fieldValue: string = '';

  constructor() {}

  writeValue(value: any) {
    this.fieldValue = value || '';
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  updateValue(value: string) {
    this.fieldValue = value;
    this.onChange(value);
  }

  onBlur() {
    this.onTouched();
  }
}
