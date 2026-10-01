import { Component, forwardRef, input, model, ChangeDetectionStrategy, ViewEncapsulation, signal, computed, ElementRef, ViewChild, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { BadgeComponent } from '../badge/badge.component';

export interface MultiSelectOption<T = unknown> {
  label: string;
  value: T;
  disabled?: boolean;
}

@Component({
  selector: 'ox-multi-select',
  standalone: true,
  imports: [CommonModule, OverlayModule, FormsModule, NgClass],
  template: `
    <div 
      #container
      class="ox-multi-select" 
      [class.ox-multi-select-open]="isOpen()" 
      [class.ox-multi-select-disabled]="disabled()"
      [ngClass]="[
        'ox-multi-select-' + size(),
        'ox-multi-select-' + variant(),
        'ox-multi-select-' + severity()
      ]"
      (click)="toggle()">
      
      @if (variant() === 'fieldset' && label()) {
        <label class="ox-multi-select-fieldset-label">{{ label() }}</label>
      }

      <div class="ox-multi-select-label-container">
        @if (selectedOptions().length > 0) {
          <div class="ox-multi-select-chips">
            @for (opt of selectedOptions(); track opt.value) {
              <div class="ox-chip" (click)="removeOption(opt, $event)">
                <span class="ox-chip-text">{{ opt.label }}</span>
                <svg viewBox="0 0 20 20" fill="currentColor" class="ox-chip-remove">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </div>
            }
          </div>
        } @else {
          <span class="ox-multi-select-placeholder">{{ placeholder() }}</span>
        }
      </div>
      
      <div class="ox-multi-select-trigger">
        <svg viewBox="0 0 20 20" fill="currentColor" class="ox-multi-select-trigger-icon">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </div>

      <ng-template 
        cdkConnectedOverlay 
        [cdkConnectedOverlayOrigin]="container" 
        [cdkConnectedOverlayOpen]="isOpen()"
        [cdkConnectedOverlayMinWidth]="containerWidth"
        [cdkConnectedOverlayOffsetY]="4"
        (overlayOutsideClick)="close($event)">
        
        <div class="ox-multi-select-panel ox-elevation-2">
          @if (filter()) {
            <div class="ox-multi-select-filter-container" (click)="$event.stopPropagation()">
              <input 
                type="text" 
                class="ox-multi-select-filter-input" 
                [placeholder]="filterPlaceholder()"
                [(ngModel)]="filterValue"
                (input)="onFilterChange()">
            </div>
          }
          <ul class="ox-multi-select-items">
            @for (option of filteredOptions(); track option.value) {
              <li 
                class="ox-multi-select-item" 
                [class.ox-multi-select-item-selected]="isSelected(option)"
                [class.ox-multi-select-item-disabled]="option.disabled"
                (click)="selectOption(option, $event)">
                
                <div class="ox-multi-select-checkbox" [class.ox-multi-select-checkbox-selected]="isSelected(option)">
                  @if (isSelected(option)) {
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                    </svg>
                  }
                </div>
                {{ option.label }}
              </li>
            } @empty {
              <li class="ox-multi-select-empty-message">{{ emptyMessage() }}</li>
            }
          </ul>
        </div>
      </ng-template>
    </div>
  `,
  styleUrl: './multi-select.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true
    }
  ]
})
export class MultiSelectComponent<T = unknown> implements ControlValueAccessor {
  @ViewChild('container') container!: ElementRef;
  
  options = input<MultiSelectOption<T>[]>([]);
  label = input<string>();
  placeholder = input<string>('Select options');
  disabled = input<boolean>(false);
  filter = input<boolean>(false);
  filterPlaceholder = input<string>('Search...');
  emptyMessage = input<string>('No results found');
  size = input<'sm' | 'md' | 'lg'>('md');
  variant = input<'default' | 'filled' | 'outlined' | 'fieldset' | 'oneLine'>('default');
  severity = input<'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'>('primary');
  
  value = model<any[]>([]);
  
  isOpen = signal(false);
  filterValue = signal('');
  containerWidth = 0;

  filteredOptions = computed(() => {
    const term = this.filterValue().toLowerCase();
    if (!term) return this.options();
    return this.options().filter(o => o.label.toLowerCase().includes(term));
  });

  selectedOptions = computed(() => {
    const currentVal = this.value();
    if (!Array.isArray(currentVal) || currentVal.length === 0) return [];
    return this.options().filter(o => currentVal.some(val => JSON.stringify(val) === JSON.stringify(o.value)));
  });

  private onChange: (value: any[]) => void = () => {};
  private onTouched: () => void = () => {};

  private cdr = inject(ChangeDetectorRef);

  toggle() {
    if (this.disabled()) return;
    if (!this.isOpen()) {
      this.containerWidth = this.container.nativeElement.offsetWidth;
    }
    this.isOpen.update(v => !v);
    this.cdr.markForCheck();
  }

  close(event?: MouseEvent) {
    if (event) {
      const target = event.target as HTMLElement;
      if (target && this.container.nativeElement.contains(target)) {
        return;
      }
    }
    this.isOpen.set(false);
    this.filterValue.set('');
    this.cdr.markForCheck();
  }

  selectOption(option: MultiSelectOption<T>, event: Event) {
    event.stopPropagation();
    if (option.disabled) return;
    
    let currentVal = this.value();
    if (!Array.isArray(currentVal)) currentVal = [];
    
    const index = currentVal.findIndex((v: any) => JSON.stringify(v) === JSON.stringify(option.value));
    if (index === -1) {
      currentVal = [...currentVal, option.value];
    } else {
      currentVal = currentVal.filter((_: any, i: number) => i !== index);
    }
    
    this.value.set(currentVal);
    this.onChange(currentVal);
    this.onTouched();
  }

  removeOption(option: MultiSelectOption<T>, event: Event) {
    event.stopPropagation();
    if (this.disabled()) return;
    
    let currentVal = this.value();
    if (!Array.isArray(currentVal)) return;
    
    currentVal = currentVal.filter((v: any) => JSON.stringify(v) !== JSON.stringify(option.value));
    this.value.set(currentVal);
    this.onChange(currentVal);
    this.onTouched();
  }

  isSelected(option: MultiSelectOption<T>): boolean {
    const currentVal = this.value();
    if (!Array.isArray(currentVal)) return false;
    return currentVal.some(val => JSON.stringify(val) === JSON.stringify(option.value));
  }

  onFilterChange() {}

  writeValue(value: T[]): void {
    this.value.set(value || []);
  }

  registerOnChange(fn: (value: T[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
