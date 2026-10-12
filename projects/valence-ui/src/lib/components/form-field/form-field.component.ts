import { 
  Component, 
  input, 
  contentChild, 
  contentChildren, 
  computed, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgControl } from '@angular/forms';
import { FormFieldLabelComponent } from './form-field-label.component';
import { FormFieldHintComponent } from './form-field-hint.component';
import { FormFieldErrorComponent } from './form-field-error.component';
import { FormFieldPrefixDirective, FormFieldSuffixDirective } from './form-field-affix.directive';
import { VAL_FORM_FIELD_CONTROL, ValFormFieldControl } from './form-field-control.token';
import { IconComponent } from '../icon/icon.component';

export type FormFieldAppearance = 'outline' | 'filled' | 'standard';
export type FormFieldSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'val-form-field',
  standalone: true,
  imports: [
    CommonModule, 
    IconComponent
  ],
  template: `
    <!-- Top Label -->
    @if (label()) {
      <label class="val-form-field-label" [class.val-form-field-label--required]="required()">
        <span>{{ label() }}</span>
        @if (required()) {
          <span class="val-form-field-required-marker" aria-hidden="true">*</span>
        }
      </label>
    } @else {
      <ng-content select="val-label, [valLabel]"></ng-content>
    }

    <!-- Middle Control Container -->
    <div 
      class="val-form-field-control-wrapper"
      [class.val-form-field-control-wrapper--disabled]="isDisabled()">
      
      <!-- Prefix Affix -->
      <ng-content select="[valPrefix]"></ng-content>

      <!-- Main Input / Control -->
      <ng-content></ng-content>

      <!-- Suffix Affix -->
      <ng-content select="[valSuffix]"></ng-content>
    </div>

    <!-- Bottom Subscript (Hints & Errors) -->
    <div class="val-form-field-subscript">
      @if (isInvalid()) {
        @if (error()) {
          <div class="val-form-field-error val-animate-fade-in-down" role="alert" aria-live="polite">
            <span class="val-form-field-error-icon-wrapper" aria-hidden="true">
              <val-icon name="alert-circle" size="0.875rem"></val-icon>
            </span>
            <span class="val-form-field-error-message">{{ error() }}</span>
          </div>
        } @else {
          <ng-content select="val-error, val-field-error, [valError]"></ng-content>
        }
      } @else {
        @if (hint()) {
          <div class="val-form-field-hint">
            <span>{{ hint() }}</span>
          </div>
        } @else {
          <ng-content select="val-hint, [valHint]"></ng-content>
        }
      }
    </div>
  `,
  styleUrl: './form-field.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'val-form-field',
    '[class.val-form-field--outline]': 'appearance() === "outline"',
    '[class.val-form-field--filled]': 'appearance() === "filled"',
    '[class.val-form-field--standard]': 'appearance() === "standard"',
    '[class.val-form-field--sm]': 'size() === "sm"',
    '[class.val-form-field--md]': 'size() === "md"',
    '[class.val-form-field--lg]': 'size() === "lg"',
    '[class.val-form-field--disabled]': 'isDisabled()',
    '[class.val-form-field--invalid]': 'isInvalid()'
  }
})
export class FormFieldComponent {
  label = input<string>();
  hint = input<string>();
  error = input<string>();
  appearance = input<FormFieldAppearance>('outline');
  size = input<FormFieldSize>('md');
  disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
  required = input<boolean, unknown>(false, { transform: booleanAttribute });
  invalid = input<boolean, unknown>(false, { transform: booleanAttribute });

  // Query nested NgControl or custom ValFormFieldControl
  ngControl = contentChild(NgControl);
  customControl = contentChild(VAL_FORM_FIELD_CONTROL);

  isDisabled = computed(() => {
    return this.disabled() || !!this.ngControl()?.disabled || !!this.customControl()?.disabled;
  });

  isInvalid = computed(() => {
    if (this.invalid()) return true;
    if (this.error()) return true;
    
    const ctrl = this.ngControl();
    if (ctrl) {
      return !!(ctrl.invalid && (ctrl.touched || ctrl.dirty));
    }

    const custom = this.customControl();
    if (custom) {
      return custom.errorState;
    }

    return false;
  });
}
