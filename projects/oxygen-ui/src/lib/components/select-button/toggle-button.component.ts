import { 
  Component, 
  forwardRef, 
  input, 
  output, 
  model, 
  signal, 
  ChangeDetectionStrategy, 
  ViewEncapsulation 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ox-toggle-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      class="ox-toggle-button"
      [class.ox-toggle-button-checked]="checked()"
      [class.ox-toggle-button-disabled]="disabled()"
      [disabled]="disabled()"
      (click)="toggle()">
      @if (currentIcon()) {
        <span class="ox-toggle-button-icon">{{ currentIcon() }}</span>
      }
      @if (currentLabel()) {
        <span class="ox-toggle-button-label">{{ currentLabel() }}</span>
      }
    </button>
  `,
  styles: [`
    .ox-toggle-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 16px;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary, #1e293b);
      background: var(--bg-surface, #ffffff);
      border: 1px solid var(--border-color, #cbd5e1);
      border-radius: var(--radius-md, 8px);
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      user-select: none;
      outline: none;
    }

    .ox-toggle-button:hover:not(.ox-toggle-button-disabled):not(.ox-toggle-button-checked) {
      background: var(--bg-surface-subtle, #f8fafc);
      border-color: var(--primary-300, #a5b4fc);
    }

    .ox-toggle-button-checked {
      color: #ffffff;
      background: var(--primary-color, #4f46e5);
      border-color: var(--primary-color, #4f46e5);
      box-shadow: 0 2px 4px rgba(79, 70, 229, 0.25);
    }

    .ox-toggle-button-checked:hover:not(.ox-toggle-button-disabled) {
      background: var(--primary-600, #4338ca);
      border-color: var(--primary-600, #4338ca);
    }

    .ox-toggle-button-disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .ox-toggle-button-icon {
      font-size: 1rem;
      display: inline-flex;
      align-items: center;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleButtonComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ToggleButtonComponent implements ControlValueAccessor {
  onLabel = input<string>('Yes');
  offLabel = input<string>('No');
  onIcon = input<string>('');
  offIcon = input<string>('');
  disabled = model<boolean>(false);

  change = output<boolean>();

  checked = signal<boolean>(false);

  private onChange: (val: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(val: boolean | null): void {
    this.checked.set(Boolean(val));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  currentLabel(): string {
    return this.checked() ? this.onLabel() : this.offLabel();
  }

  currentIcon(): string {
    return this.checked() ? this.onIcon() : this.offIcon();
  }

  toggle(): void {
    if (this.disabled()) return;
    const next = !this.checked();
    this.checked.set(next);
    this.onChange(next);
    this.change.emit(next);
    this.onTouched();
  }
}
