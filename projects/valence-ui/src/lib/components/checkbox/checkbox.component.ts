import { Component, forwardRef, input, model, computed, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'ox-checkbox',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div 
      class="ox-checkbox" 
      [class.ox-checkbox-checked]="checked()" 
      [class.ox-checkbox-disabled]="disabled()"
      [ngClass]="colorClass()"
      (click)="toggle($event)">
      <div class="ox-checkbox-box">
        @if (checked()) {
          <ox-icon name="check" size="0.75rem" [strokeWidth]="3" class="ox-checkbox-icon"></ox-icon>
        }
      </div>
      @if (label()) {
        <span class="ox-checkbox-label">{{ label() }}</span>
      }
    </div>
  `,
  styleUrl: './checkbox.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  label = input<string>();
  disabled = input<boolean>(false);
  checked = model<boolean>(false);
  color = input<string>('primary');
  severity = input<string>('');

  effectiveColor = computed(() => this.severity() || this.color() || 'primary');
  colorClass = computed(() => 'ox-checkbox--' + this.effectiveColor());

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  toggle(event: Event) {
    if (this.disabled()) return;
    
    const newValue = !this.checked();
    this.checked.set(newValue);
    this.onChange(newValue);
    this.onTouched();
  }

  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // handled by signals input
  }
}
