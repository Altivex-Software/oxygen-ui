import { Component, forwardRef, input, model, ChangeDetectionStrategy, ViewEncapsulation, signal, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'ox-input-mask',
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass],
  template: `
    <div 
      class="ox-input-mask" 
      [class.ox-input-mask-disabled]="disabled()"
      [ngClass]="[
        'ox-input-mask-' + size(),
        'ox-input-mask-' + variant(),
        'ox-input-mask-' + severity()
      ]">
      
      @if (variant() === 'fieldset' && label()) {
        <label class="ox-input-mask-fieldset-label">{{ label() }}</label>
      }

      <div class="ox-input-mask-container">
        <input 
          #inputEl
          type="text" 
          class="ox-input-mask-field" 
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [value]="displayValue()"
          (input)="onInput($event)"
          (keydown)="onKeydown($event)"
          (focus)="onFocus($event)"
          (blur)="onBlur($event)">
      </div>
    </div>
  `,
  styleUrl: './input-mask.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMaskComponent),
      multi: true
    }
  ]
})
export class InputMaskComponent implements ControlValueAccessor {
  @ViewChild('inputEl') inputEl!: ElementRef<HTMLInputElement>;
  
  mask = input.required<string>();
  slotChar = input<string>('_');
  autoClear = input<boolean>(true);
  
  label = input<string>();
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  size = input<'sm' | 'md' | 'lg'>('md');
  variant = input<'default' | 'filled' | 'outlined' | 'fieldset' | 'oneLine'>('default');
  severity = input<'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'>('primary');
  
  value = model<string>('');
  
  displayValue = signal<string>('');
  isFocused = signal<boolean>(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    this.updateDisplayValue(this.value() || '');
  }

  isMaskChar(char: string): boolean {
    return char === '9' || char === 'a' || char === '*';
  }

  isValidChar(char: string, maskChar: string): boolean {
    if (maskChar === '9') return /[0-9]/.test(char);
    if (maskChar === 'a') return /[A-Za-z]/.test(char);
    if (maskChar === '*') return /[A-Za-z0-9]/.test(char);
    return false;
  }

  formatValue(val: string): string {
    const maskStr = this.mask();
    const slot = this.slotChar();
    
    let formatted = '';
    let valIndex = 0;
    
    for (let i = 0; i < maskStr.length; i++) {
      const mChar = maskStr[i];
      
      if (this.isMaskChar(mChar)) {
        if (valIndex < val.length) {
          let char = val[valIndex];
          while (valIndex < val.length && !this.isValidChar(char, mChar)) {
            valIndex++;
            char = val[valIndex];
          }
          if (valIndex < val.length) {
            formatted += char;
            valIndex++;
          } else {
            formatted += slot;
          }
        } else {
          formatted += slot;
        }
      } else {
        formatted += mChar;
        if (valIndex < val.length && val[valIndex] === mChar) {
          valIndex++;
        }
      }
    }
    
    return formatted;
  }

  getRawValue(formatted: string): string {
    const maskStr = this.mask();
    const slot = this.slotChar();
    let raw = '';
    
    for (let i = 0; i < maskStr.length; i++) {
      if (this.isMaskChar(maskStr[i]) && i < formatted.length) {
        if (formatted[i] !== slot) {
          raw += formatted[i];
        }
      }
    }
    return raw;
  }

  updateDisplayValue(rawVal: string) {
    if (!rawVal && !this.isFocused()) {
      this.displayValue.set('');
      return;
    }
    const formatted = this.formatValue(rawVal);
    this.displayValue.set(formatted);
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let rawVal = this.getRawValue(input.value);
    
    const formatted = this.formatValue(rawVal);
    
    this.displayValue.set(formatted);
    
    // Update input value immediately to maintain cursor position better
    input.value = formatted;
    
    const rawToEmit = this.getRawValue(formatted);
    this.value.set(rawToEmit);
    this.onChange(rawToEmit);
  }

  onKeydown(event: KeyboardEvent) {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
  }

  onFocus(event: Event) {
    this.isFocused.set(true);
    if (!this.displayValue()) {
      this.updateDisplayValue('');
    }
  }

  onBlur(event: Event) {
    this.isFocused.set(false);
    this.onTouched();
    
    const raw = this.getRawValue(this.displayValue());
    if (this.autoClear() && raw.length === 0) {
      this.displayValue.set('');
    }
  }

  writeValue(value: string): void {
    this.value.set(value || '');
    this.updateDisplayValue(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
