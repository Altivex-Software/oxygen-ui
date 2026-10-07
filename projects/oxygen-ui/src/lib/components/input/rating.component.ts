import { Component, input, model, forwardRef, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'ox-rating',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="oxy-rating" [class.oxy-rating--disabled]="disabled()">
      @for (star of [1, 2, 3, 4, 5].slice(0, max()); track star) {
        <button 
          type="button" 
          class="oxy-star" 
          [class.oxy-star--active]="star <= (hoverValue() || value())"
          [disabled]="disabled()"
          (mouseenter)="onMouseEnter(star)"
          (mouseleave)="onMouseLeave()"
          (click)="onSelect(star)">
          <ox-icon name="star" size="1.5rem"></ox-icon>
        </button>
      }
    </div>
  `,
  styleUrl: './rating.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true
    }
  ]
})
export class RatingComponent implements ControlValueAccessor {
  max = input<number>(5);
  disabled = input<boolean>(false);
  value = model<number>(0);
  
  hoverValue = signal<number>(0);

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  onSelect(val: number) {
    if (this.disabled()) return;
    const newValue = this.value() === val ? 0 : val;
    this.value.set(newValue);
    this.onChange(newValue);
    this.onTouched();
  }

  onMouseEnter(val: number) {
    if (this.disabled()) return;
    this.hoverValue.set(val);
  }

  onMouseLeave() {
    this.hoverValue.set(0);
  }

  writeValue(value: number): void {
    this.value.set(value || 0);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
