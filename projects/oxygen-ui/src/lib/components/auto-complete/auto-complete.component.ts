import { Component, forwardRef, input, model, ChangeDetectionStrategy, ViewEncapsulation, signal, computed, ElementRef, ViewChild, output, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { IconComponent } from '../icon/icon.component';

export interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'ox-autocomplete',
  standalone: true,
  imports: [CommonModule, OverlayModule, FormsModule, NgClass, IconComponent],
  template: `
    <div 
      #container
      class="ox-autocomplete" 
      [class.ox-autocomplete-open]="isOpen()" 
      [class.ox-autocomplete-disabled]="disabled()"
      [ngClass]="[
        'ox-autocomplete-' + size(),
        'ox-autocomplete-' + variant(),
        'ox-autocomplete-' + severity()
      ]">
      
      @if (variant() === 'fieldset' && label()) {
        <label class="ox-autocomplete-fieldset-label">{{ label() }}</label>
      }

      <div class="ox-autocomplete-input-container">
        <input 
          #inputEl
          type="text" 
          class="ox-autocomplete-input" 
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [ngModel]="inputValue()"
          (ngModelChange)="onInputChange($event)"
          (focus)="onInputFocus($event)"
          (click)="onInputFocus($event)"
          (blur)="onInputBlur()"
          (keydown)="onKeydown($event)">
          
        @if (dropdown()) {
          <button type="button" class="ox-autocomplete-dropdown-btn" (click)="toggleDropdown($event)" tabindex="-1">
            <ox-icon name="chevron-down" size="0.875rem"></ox-icon>
          </button>
        }
      </div>

      <ng-template 
        cdkConnectedOverlay 
        [cdkConnectedOverlayOrigin]="container" 
        [cdkConnectedOverlayOpen]="isOpen()"
        [cdkConnectedOverlayMinWidth]="containerWidth"
        [cdkConnectedOverlayOffsetY]="4"
        (overlayOutsideClick)="close($event)">
        
        <div class="ox-autocomplete-panel ox-elevation-2">
          <ul class="ox-autocomplete-items">
            @for (option of suggestions(); track $index) {
              <li 
                class="ox-autocomplete-item" 
                (click)="selectOption(option, $event)">
                {{ resolveFieldData(option) }}
              </li>
            } @empty {
              <li class="ox-autocomplete-empty-message">{{ emptyMessage() }}</li>
            }
          </ul>
        </div>
      </ng-template>
    </div>
  `,
  styleUrl: './auto-complete.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoCompleteComponent),
      multi: true
    }
  ]
})
export class AutoCompleteComponent implements ControlValueAccessor {
  @ViewChild('container') container!: ElementRef;
  @ViewChild('inputEl') inputEl!: ElementRef<HTMLInputElement>;
  
  suggestions = input<any[]>([]);
  field = input<string>();
  label = input<string>();
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  dropdown = input<boolean>(false);
  emptyMessage = input<string>('No results found');
  size = input<'sm' | 'md' | 'lg'>('md');
  variant = input<'default' | 'filled' | 'outlined' | 'fieldset' | 'oneLine'>('default');
  severity = input<'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'>('primary');
  
  completeMethod = output<AutoCompleteCompleteEvent>();
  
  value = model<any>(null);
  
  isOpen = signal(false);
  inputValue = signal<string>('');
  containerWidth = 0;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  resolveFieldData(data: any): string {
    if (data === null || data === undefined) return '';
    if (typeof data === 'string') return data;
    const f = this.field();
    return f && data[f] !== undefined ? String(data[f]) : String(data);
  }

  onInputChange(event: string) {
    this.inputValue.set(event);
    this.containerWidth = this.container.nativeElement.offsetWidth;
    this.isOpen.set(true);
    
    // Clear value if user types something different from selected object
    if (this.value() && this.resolveFieldData(this.value()) !== event) {
      this.value.set(null);
      this.onChange(null);
    }
    
    this.completeMethod.emit({
      originalEvent: new Event('input'),
      query: event
    });
  }

  onInputFocus(event: Event) {
    this.onTouched();
    this.containerWidth = this.container.nativeElement.offsetWidth;
    this.isOpen.set(true);
    this.cdr.markForCheck();
    
    this.completeMethod.emit({
      originalEvent: event,
      query: this.inputValue() || ''
    });
  }

  onInputBlur() {
    // Timeout to allow click on option to fire first
    setTimeout(() => {
      this.isOpen.set(false);
    }, 150);
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  private cdr = inject(ChangeDetectorRef);

  toggleDropdown(event: Event) {
    event.stopPropagation();
    if (this.disabled()) return;
    
    if (this.isOpen()) {
      this.close();
    } else {
      this.inputEl.nativeElement.focus();
      this.containerWidth = this.container.nativeElement.offsetWidth;
      this.isOpen.set(true);
      this.cdr.markForCheck();
      this.completeMethod.emit({
        originalEvent: event,
        query: this.inputValue()
      });
    }
  }

  close(event?: MouseEvent) {
    if (event) {
      const target = event.target as HTMLElement;
      if (target && this.container.nativeElement.contains(target)) {
        return;
      }
    }
    this.isOpen.set(false);
    this.cdr.markForCheck();
  }

  selectOption(option: any, event: Event) {
    event.stopPropagation();
    this.value.set(option);
    this.inputValue.set(this.resolveFieldData(option));
    this.onChange(option);
    this.close();
  }

  writeValue(value: any): void {
    this.value.set(value);
    this.inputValue.set(this.resolveFieldData(value));
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handled by input signal if implemented
  }
}
