import { Component, input, computed, ViewEncapsulation, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'val-password',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    @if (label() && variant() !== 'fieldset' && !floatLabel()) {
      <label [for]="id()" class="val-input-label">
        {{ label() }}
        @if (required()) {
          <span class="val-input-required">*</span>
        }
      </label>
    }

    <div class="val-input-container">
      @if (label() && (variant() === 'fieldset' || floatLabel())) {
        <label [for]="id()" class="val-input-label">
          {{ label() }}
          @if (required()) {
            <span class="val-input-required">*</span>
          }
        </label>
      }
      <input
        [id]="id()"
        [type]="showPassword() ? 'text' : 'password'"
        [value]="value()"
        [placeholder]="(floatLabel() && !hasValue()) ? '' : placeholder()"
        [disabled]="disabled()"
        [required]="required()"
        class="val-input-field val-password-field"
        (input)="onInput($event)"
        (blur)="onBlur()"
      />
      <button 
        type="button" 
        class="val-password-toggle"
        (click)="togglePassword()"
        [disabled]="disabled()"
        aria-label="Toggle password visibility">
        @if (showPassword()) {
          <val-icon name="eye-off" size="1.125rem"></val-icon>
        } @else {
          <val-icon name="eye" size="1.125rem"></val-icon>
        }
      </button>
    </div>

    @if (error()) {
      <div class="val-input-error" role="alert">{{ error() }}</div>
    } @else if (hint()) {
      <div class="val-input-hint">{{ hint() }}</div>
    }
  `,
  styleUrl: './password.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.val-input-wrapper--disabled]': 'disabled()',
    '[class.val-input-wrapper--error]': '!!error()',
    '[class.val-input-wrapper--float]': 'floatLabel()',
    '[class.val-input-wrapper--has-value]': 'hasValue()',
    '[class]': '"val-input-wrapper val-input-wrapper--" + size() + " val-input-wrapper--" + variant()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true
    }
  ]
})
export class PasswordComponent implements ControlValueAccessor {
  id = input<string>(`val-password-${Math.random().toString(36).substr(2, 9)}`);
  label = input<string>();
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  hint = input<string>();
  error = input<string>();
  size = input<'sm' | 'md' | 'lg'>('md');
  variant = input<'default' | 'fieldset' | 'oneLine'>('default');
  floatLabel = input<boolean>(false);

  value = signal<string>('');
  showPassword = signal<boolean>(false);

  hasValue = computed(() => !!this.value());

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  togglePassword() {
    if (this.disabled()) return;
    this.showPassword.update(v => !v);
  }

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
