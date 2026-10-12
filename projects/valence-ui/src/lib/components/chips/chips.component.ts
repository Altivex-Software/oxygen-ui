import { 
  Component, 
  forwardRef, 
  input, 
  output, 
  model, 
  signal, 
  ChangeDetectionStrategy, 
  ViewEncapsulation,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'ox-chips',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div 
      class="ox-chips"
      [class.ox-chips-focused]="isFocused()"
      [class.ox-chips-disabled]="disabled()"
      (click)="focusInput()">
      
      <ul class="ox-chips-list">
        @for (chip of value(); track $index) {
          <li class="ox-chip-item">
            <span class="ox-chip-label" (click)="onChipClick(chip, $index, $event)">
              {{ chip }}
            </span>
            @if (!disabled()) {
              <button 
                type="button" 
                class="ox-chip-remove" 
                (click)="removeChip($index, $event)"
                aria-label="Remove chip">
                <ox-icon name="x" size="0.75rem"></ox-icon>
              </button>
            }
          </li>
        }

        <li class="ox-chips-input-token">
          <input 
            #inputEl
            type="text" 
            class="ox-chips-input"
            [placeholder]="value().length === 0 ? placeholder() : ''"
            [disabled]="disabled()"
            [(ngModel)]="inputValue"
            (keydown)="onKeyDown($event)"
            (focus)="onFocus()"
            (blur)="onBlur()" />
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .ox-chips {
      display: inline-block;
      width: 100%;
      min-height: 40px;
      padding: 4px 8px;
      border: 1px solid var(--border-color, #cbd5e1);
      border-radius: var(--radius-md, 8px);
      background-color: var(--bg-surface, #ffffff);
      transition: border-color 0.2s, box-shadow 0.2s;
      cursor: text;
      box-sizing: border-box;
    }

    .ox-chips:hover:not(.ox-chips-disabled) {
      border-color: var(--primary-400, #818cf8);
    }

    .ox-chips-focused {
      border-color: var(--primary-color, #4f46e5);
      box-shadow: 0 0 0 3px var(--primary-100, rgba(79, 70, 229, 0.15));
    }

    .ox-chips-disabled {
      background-color: var(--bg-disabled, #f1f5f9);
      cursor: not-allowed;
      opacity: 0.7;
    }

    .ox-chips-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .ox-chip-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 10px;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary, #1e293b);
      background: var(--primary-50, #eef2ff);
      border: 1px solid var(--primary-200, #c7d2fe);
      border-radius: 9999px;
      transition: background-color 0.15s;
    }

    .ox-chip-item:hover {
      background: var(--primary-100, #e0e7ff);
    }

    .ox-chip-label {
      cursor: default;
      user-select: none;
    }

    .ox-chip-remove {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin: 0;
      border: none;
      background: transparent;
      color: var(--text-secondary, #64748b);
      cursor: pointer;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      transition: color 0.15s, background-color 0.15s;
    }

    .ox-chip-remove:hover {
      color: var(--danger-color, #ef4444);
      background-color: rgba(239, 68, 68, 0.1);
    }

    .ox-chip-remove-icon {
      width: 14px;
      height: 14px;
    }

    .ox-chips-input-token {
      flex: 1 1 auto;
      display: inline-flex;
      min-width: 80px;
    }

    .ox-chips-input {
      width: 100%;
      border: none;
      outline: none;
      background: transparent;
      font-size: 0.875rem;
      color: var(--text-primary, #1e293b);
      padding: 4px 0;
      font-family: inherit;
    }

    .ox-chips-input::placeholder {
      color: var(--text-muted, #94a3b8);
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ChipsComponent implements ControlValueAccessor {
  placeholder = input<string>('Add tags...');
  disabled = model<boolean>(false);
  max = input<number | null>(null);
  allowDuplicate = input<boolean>(false);
  separator = input<string>(',');
  addOnBlur = input<boolean>(true);

  chipAdded = output<string>();
  chipRemoved = output<{ chip: string; index: number }>();
  chipClicked = output<{ chip: string; index: number }>();

  @ViewChild('inputEl') inputEl?: ElementRef<HTMLInputElement>;

  value = signal<string[]>([]);
  inputValue = '';
  isFocused = signal<boolean>(false);

  private onChange: (val: string[]) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(val: string[] | null): void {
    this.value.set(Array.isArray(val) ? [...val] : []);
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

  focusInput(): void {
    if (!this.disabled()) {
      this.inputEl?.nativeElement.focus();
    }
  }

  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    this.isFocused.set(false);
    this.onTouched();
    if (this.addOnBlur() && this.inputValue.trim()) {
      this.addChip(this.inputValue.trim());
      this.inputValue = '';
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    if (event.key === 'Enter' || (this.separator() && event.key === this.separator())) {
      event.preventDefault();
      const val = this.inputValue.trim();
      if (val) {
        this.addChip(val);
        this.inputValue = '';
      }
    } else if (event.key === 'Backspace' && !this.inputValue && this.value().length > 0) {
      this.removeChip(this.value().length - 1);
    }
  }

  addChip(chipText: string): void {
    if (this.max() !== null && this.value().length >= this.max()!) {
      return;
    }

    if (!this.allowDuplicate() && this.value().includes(chipText)) {
      return;
    }

    const next = [...this.value(), chipText];
    this.value.set(next);
    this.onChange(next);
    this.chipAdded.emit(chipText);
  }

  removeChip(index: number, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (this.disabled()) return;

    const removed = this.value()[index];
    const next = this.value().filter((_, i) => i !== index);
    this.value.set(next);
    this.onChange(next);
    this.chipRemoved.emit({ chip: removed, index });
  }

  onChipClick(chip: string, index: number, event: Event): void {
    event.stopPropagation();
    this.chipClicked.emit({ chip, index });
  }
}
