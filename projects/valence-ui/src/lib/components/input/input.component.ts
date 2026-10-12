import { Component, input, computed, ViewEncapsulation, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { ValIconName } from '../icon/icon.types';

export type InputFocusColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

let nextId = 0;

@Component({
  selector: 'val-input',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'val-input-wrapper',
    '[class.val-input-wrapper--disabled]': 'disabled()',
    '[class.val-input-wrapper--readonly]': 'readonly()',
    '[class.val-input-wrapper--error]': '!!error()',
    '[class.val-input-wrapper--float]': 'floatLabel()',
    '[class.val-input-wrapper--has-value]': 'hasValue()',
    '[class]': '"val-input-wrapper--" + size() + " val-input-wrapper--" + variant()',
    '[style.--val-input-focus-color]': 'computedFocusColor()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  id = input<string>(`val-input-${nextId++}`);
  label = input<string>();
  type = input<'text' | 'password' | 'email' | 'number' | 'tel' | 'url'>('text');
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  hint = input<string>();
  error = input<string>();
  required = input<boolean>(false);
  size = input<'sm' | 'md' | 'lg'>('md');
  variant = input<'default' | 'fieldset' | 'oneLine'>('default');
  floatLabel = input<boolean>(false);
  focusColor = input<InputFocusColor>();
  icon = input<ValIconName | string>();

  hasLabel = computed(() => !!this.label());
  hasValue = computed(() => !!this.value());

  // Computed para convertir el color del foco a variable CSS
  computedFocusColor = computed(() => {
    const color = this.focusColor();
    if (!color) return undefined;
    
    const colorMap: Record<InputFocusColor, string> = {
      primary: 'var(--val-primary)',
      secondary: 'var(--val-secondary)',
      success: 'var(--val-success)',
      danger: 'var(--val-danger)',
      warning: 'var(--val-warning)',
      info: 'var(--val-info)'
    };
    
    return colorMap[color];
  });

  // Control value accessor
  value = signal<string>('');
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // El estado disabled se maneja a través del input signal
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value.set(input.value);
    this.onChange(input.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
