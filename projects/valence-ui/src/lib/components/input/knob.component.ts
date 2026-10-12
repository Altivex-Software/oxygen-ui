import { Component, input, model, forwardRef, ViewEncapsulation, computed, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'val-knob',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="val-knob-container" 
         [class.val-knob--disabled]="disabled()"
         [ngClass]="'val-knob--' + variant()"
         [style.width.px]="size()"
         (mousedown)="onMouseDown($event)"
         (wheel)="onWheel($event)">
      
      <svg viewBox="0 0 100 100" class="val-knob-svg">
        <!-- Background Track -->
        <circle 
          cx="50" cy="50" r="40" 
          class="val-knob-track"
          [style.stroke]="rangeColor()"
          [style.stroke-width]="strokeWidth()"
          stroke-dasharray="251.2"
          stroke-dashoffset="0" />
        
        <!-- Progress Bar -->
        <circle 
          cx="50" cy="50" r="40" 
          class="val-knob-progress"
          [style.stroke]="valueColor()"
          [style.stroke-width]="strokeWidth()"
          [style.stroke-dashoffset]="dashOffset()"
          stroke-dasharray="251.2" />
        
        <!-- Center Knob -->
        @if (variant() === 'default') {
          <circle cx="50" cy="50" r="32" class="val-knob-center" />
        }
        
        <!-- Indicator Dot -->
        @if (variant() !== 'outline') {
          <g [style.transform]="rotateIndicator()" style="transform-origin: 50% 50%">
            <circle cx="50" cy="18" r="4" class="val-knob-indicator" [style.fill]="valueColor()" />
          </g>
        }

        <!-- Value Text -->
        <text 
          x="50" y="55" 
          text-anchor="middle" 
          class="val-knob-text">
          {{ value() }}{{ unit() }}
        </text>
      </svg>
      
      @if (label()) {
        <span class="val-knob-label">{{ label() }}</span>
      }
    </div>
  `,
  styleUrl: './knob.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KnobComponent),
      multi: true
    }
  ]
})
export class KnobComponent implements ControlValueAccessor {
  min = input<number>(0);
  max = input<number>(100);
  step = input<number>(1);
  unit = input<string>('');
  label = input<string>();
  disabled = input<boolean>(false);
  size = input<number>(100);
  variant = input<'default' | 'flat' | 'outline'>('default');
  strokeWidth = input<number>(8);
  valueColor = input<string>('#3b82f6');
  rangeColor = input<string>('#e5e7eb');
  
  value = model<number>(0);

  dashOffset = computed(() => {
    const range = this.max() - this.min();
    const percentage = (this.value() - this.min()) / range;
    return 251.2 * (1 - percentage);
  });

  rotateIndicator = computed(() => {
    const range = this.max() - this.min();
    const percentage = (this.value() - this.min()) / range;
    const degrees = percentage * 360;
    return `rotate(${degrees}deg)`;
  });

  private isDragging = false;
  private startY = 0;
  private startValue = 0;

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  onMouseDown(event: MouseEvent) {
    if (this.disabled()) return;
    this.isDragging = true;
    this.startY = event.clientY;
    this.startValue = this.value();
    
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (event: MouseEvent) => {
    if (!this.isDragging) return;
    
    const deltaY = this.startY - event.clientY;
    const range = this.max() - this.min();
    const sensitivity = 2; // Adjust for faster/slower movement
    const newValue = Math.round(this.startValue + (deltaY / sensitivity) * this.step());
    
    this.updateValue(newValue);
  };

  onMouseUp = () => {
    this.isDragging = false;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.onTouched();
  };

  onWheel(event: WheelEvent) {
    if (this.disabled()) return;
    event.preventDefault();
    const delta = event.deltaY > 0 ? -this.step() : this.step();
    this.updateValue(this.value() + delta);
  }

  private updateValue(val: number) {
    const clamped = Math.max(this.min(), Math.min(this.max(), val));
    this.value.set(clamped);
    this.onChange(clamped);
  }

  writeValue(value: number): void {
    const safeVal = typeof value === 'number' ? value : 0;
    this.value.set(Math.max(this.min(), Math.min(this.max(), safeVal)));
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
