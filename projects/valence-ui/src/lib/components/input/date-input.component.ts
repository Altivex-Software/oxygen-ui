import { Component, input, forwardRef, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'val-date-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="val-input-wrapper" 
         [class.val-input-wrapper--disabled]="disabled()"
         [class.val-input-wrapper--error]="!!error()"
         [class.val-input-wrapper--float]="floatLabel()"
         [class.val-input-wrapper--has-value]="!!value()"
         [ngClass]="[
           'val-input-wrapper--' + size(),
           variant() === 'fieldset' ? 'val-input-wrapper--fieldset' : '',
           variant() === 'oneLine' ? 'val-input-wrapper--oneLine' : ''
         ]">
      
      @if (label()) {
        <label [for]="id()" class="val-input-label">
          {{ label() }}
          @if (required()) {
            <span class="val-input-required">*</span>
          }
        </label>
      }

      <div class="val-input-container">
        <input
          [id]="id()"
          type="date"
          [value]="value()"
          [disabled]="disabled()"
          [required]="required()"
          [min]="min()"
          [max]="max()"
          class="val-input-field"
          (input)="onInput($event)"
          (blur)="onBlur()"
        />
      </div>

      @if (error()) {
        <div class="val-input-error" role="alert">{{ error() }}</div>
      } @else if (hint()) {
        <div class="val-input-hint">{{ hint() }}</div>
      }
    </div>
  `,
  styleUrl: './date-input.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    }
  ]
})
export class DateInputComponent implements ControlValueAccessor {
  id = input<string>(`val-date-${Math.random().toString(36).substr(2, 9)}`);
  label = input<string>();
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  min = input<string>();
  max = input<string>();
  hint = input<string>();
  error = input<string>();
  size = input<'sm' | 'md' | 'lg'>('md');
  floatLabel = input<boolean>(false);
  variant = input<'default' | 'fieldset' | 'oneLine'>('default');

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

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value.set(input.value);
    this.onChange(input.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
