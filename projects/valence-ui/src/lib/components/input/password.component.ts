import { Component, input, computed, ViewEncapsulation, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'ox-password',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    @if (label() && variant() !== 'fieldset' && !floatLabel()) {
      <label [for]="id()" class="oxy-input-label">
        {{ label() }}
        @if (required()) {
          <span class="oxy-input-required">*</span>
        }
      </label>
    }

    <div class="oxy-input-container">
      @if (label() && (variant() === 'fieldset' || floatLabel())) {
        <label [for]="id()" class="oxy-input-label">
          {{ label() }}
          @if (required()) {
            <span class="oxy-input-required">*</span>
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
        class="oxy-input-field oxy-password-field"
        (input)="onInput($event)"
        (blur)="onBlur()"
      />
      <button 
        type="button" 
        class="oxy-password-toggle"
        (click)="togglePassword()"
        [disabled]="disabled()"
        aria-label="Toggle password visibility">
        @if (showPassword()) {
          <ox-icon name="eye-off" size="1.125rem"></ox-icon>
        } @else {
          <ox-icon name="eye" size="1.125rem"></ox-icon>
        }
      </button>
    </div>

    @if (error()) {
      <div class="oxy-input-error" role="alert">{{ error() }}</div>
    } @else if (hint()) {
      <div class="oxy-input-hint">{{ hint() }}</div>
    }
  `,
  styleUrl: './password.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.oxy-input-wrapper--disabled]': 'disabled()',
    '[class.oxy-input-wrapper--error]': '!!error()',
    '[class.oxy-input-wrapper--float]': 'floatLabel()',
    '[class.oxy-input-wrapper--has-value]': 'hasValue()',
    '[class]': '"oxy-input-wrapper oxy-input-wrapper--" + size() + " oxy-input-wrapper--" + variant()',
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
  id = input<string>(`oxy-password-${Math.random().toString(36).substr(2, 9)}`);
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
