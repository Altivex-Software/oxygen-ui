import { Component, input, signal, ViewEncapsulation, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'val-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="val-input-wrapper" 
         [class.val-input-wrapper--disabled]="disabled()"
         [class.val-input-wrapper--error]="!!error()"
         [ngClass]="'val-input-wrapper--' + size()">
      
      @if (label()) {
        <label [for]="id()" class="val-input-label">
          {{ label() }}
          @if (required()) {
            <span class="val-input-required">*</span>
          }
        </label>
      }

      <div class="val-input-container">
        <textarea
          [id]="id()"
          [value]="value()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [required]="required()"
          [rows]="rows()"
          class="val-textarea-field"
          (input)="onInput($event)"
          (blur)="onBlur()"
        ></textarea>
      </div>

      @if (error()) {
        <div class="val-input-error" role="alert">{{ error() }}</div>
      } @else if (hint()) {
        <div class="val-input-hint">{{ hint() }}</div>
      }
    </div>
  `,
  styleUrl: './textarea.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})
export class TextareaComponent implements ControlValueAccessor {
  id = input<string>(`val-textarea-${Math.random().toString(36).substr(2, 9)}`);
  label = input<string>();
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  rows = input<number>(3);
  hint = input<string>();
  error = input<string>();
  size = input<'sm' | 'md' | 'lg'>('md');

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
    const input = event.target as HTMLTextAreaElement;
    this.value.set(input.value);
    this.onChange(input.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
