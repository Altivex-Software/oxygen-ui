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

export interface SelectButtonOption<T = any> {
  label?: string;
  value: T;
  icon?: string;
  disabled?: boolean;
  [key: string]: any;
}

@Component({
  selector: 'ox-select-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="ox-select-button" 
      [class.ox-select-button-disabled]="disabled()"
      role="group">
      @for (opt of options(); track $index) {
        <button
          type="button"
          class="ox-select-button-item"
          [class.ox-select-button-item-active]="isSelected(getOptionValue(opt))"
          [class.ox-select-button-item-disabled]="disabled() || isOptionDisabled(opt)"
          [disabled]="disabled() || isOptionDisabled(opt)"
          (click)="selectOption(getOptionValue(opt))">
          @if (getOptionIcon(opt)) {
            <span class="ox-select-button-icon">{{ getOptionIcon(opt) }}</span>
          }
          @if (getOptionLabel(opt)) {
            <span class="ox-select-button-label">{{ getOptionLabel(opt) }}</span>
          }
        </button>
      }
    </div>
  `,
  styles: [`
    .ox-select-button {
      display: inline-flex;
      background: var(--bg-surface-subtle, #f1f5f9);
      border: 1px solid var(--border-color, #e2e8f0);
      border-radius: var(--radius-md, 8px);
      padding: 3px;
      gap: 2px;
      user-select: none;
    }

    .ox-select-button-disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .ox-select-button-item {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 6px 14px;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary, #64748b);
      background: transparent;
      border: none;
      border-radius: var(--radius-sm, 6px);
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      outline: none;
    }

    .ox-select-button-item:hover:not(.ox-select-button-item-disabled):not(.ox-select-button-item-active) {
      color: var(--text-primary, #1e293b);
      background: rgba(255, 255, 255, 0.6);
    }

    .ox-select-button-item-active {
      color: var(--primary-color, #4f46e5);
      background: var(--bg-surface, #ffffff);
      font-weight: 600;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
    }

    .ox-select-button-item-disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .ox-select-button-icon {
      font-size: 1rem;
      display: inline-flex;
      align-items: center;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectButtonComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SelectButtonComponent implements ControlValueAccessor {
  options = input<SelectButtonOption[] | any[]>([]);
  optionLabel = input<string>('label');
  optionValue = input<string>('value');
  optionIcon = input<string>('icon');
  optionDisabled = input<string>('disabled');
  multiple = input<boolean>(false);
  unselectable = input<boolean>(true);
  disabled = model<boolean>(false);

  selectionChange = output<any>();

  value = signal<any>(null);

  private onChange: (val: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(val: any): void {
    this.value.set(val);
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

  getOptionLabel(opt: any): string {
    if (typeof opt === 'string' || typeof opt === 'number') return String(opt);
    return opt[this.optionLabel()] ?? opt.label ?? '';
  }

  getOptionValue(opt: any): any {
    if (typeof opt === 'string' || typeof opt === 'number') return opt;
    return this.optionValue() && opt[this.optionValue()] !== undefined ? opt[this.optionValue()] : (opt.value ?? opt);
  }

  getOptionIcon(opt: any): string | undefined {
    if (typeof opt === 'object' && opt !== null) {
      return opt[this.optionIcon()] ?? opt.icon;
    }
    return undefined;
  }

  isOptionDisabled(opt: any): boolean {
    if (typeof opt === 'object' && opt !== null) {
      return Boolean(opt[this.optionDisabled()] ?? opt.disabled);
    }
    return false;
  }

  isSelected(val: any): boolean {
    const current = this.value();
    if (this.multiple()) {
      return Array.isArray(current) && current.includes(val);
    }
    return current === val;
  }

  selectOption(val: any): void {
    if (this.disabled()) return;

    if (this.multiple()) {
      let current: any[] = Array.isArray(this.value()) ? [...this.value()] : [];
      if (current.includes(val)) {
        current = current.filter(v => v !== val);
      } else {
        current.push(val);
      }
      this.value.set(current);
      this.onChange(current);
      this.selectionChange.emit(current);
    } else {
      let next = val;
      if (this.value() === val && this.unselectable()) {
        next = null;
      }
      this.value.set(next);
      this.onChange(next);
      this.selectionChange.emit(next);
    }
    this.onTouched();
  }
}
