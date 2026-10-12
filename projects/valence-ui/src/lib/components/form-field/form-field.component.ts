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
import { OX_FORM_FIELD_CONTROL, OxFormFieldControl } from './form-field-control.token';
import { IconComponent } from '../icon/icon.component';

export type FormFieldAppearance = 'outline' | 'filled' | 'standard';
export type FormFieldSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ox-form-field',
  standalone: true,
  imports: [
    CommonModule, 
    IconComponent
  ],
  template: `
    <!-- Top Label -->
    @if (label()) {
      <label class="ox-form-field-label" [class.ox-form-field-label--required]="required()">
        <span>{{ label() }}</span>
        @if (required()) {
          <span class="ox-form-field-required-marker" aria-hidden="true">*</span>
        }
      </label>
    } @else {
      <ng-content select="ox-label, [oxLabel]"></ng-content>
    }

    <!-- Middle Control Container -->
    <div 
      class="ox-form-field-control-wrapper"
      [class.ox-form-field-control-wrapper--disabled]="isDisabled()">
      
      <!-- Prefix Affix -->
      <ng-content select="[oxPrefix]"></ng-content>

      <!-- Main Input / Control -->
      <ng-content></ng-content>

      <!-- Suffix Affix -->
      <ng-content select="[oxSuffix]"></ng-content>
    </div>

    <!-- Bottom Subscript (Hints & Errors) -->
    <div class="ox-form-field-subscript">
      @if (isInvalid()) {
        @if (error()) {
          <div class="ox-form-field-error ox-animate-fade-in-down" role="alert" aria-live="polite">
            <span class="ox-form-field-error-icon-wrapper" aria-hidden="true">
              <ox-icon name="alert-circle" size="0.875rem"></ox-icon>
            </span>
            <span class="ox-form-field-error-message">{{ error() }}</span>
          </div>
        } @else {
          <ng-content select="ox-error, ox-field-error, [oxError]"></ng-content>
        }
      } @else {
        @if (hint()) {
          <div class="ox-form-field-hint">
            <span>{{ hint() }}</span>
          </div>
        } @else {
          <ng-content select="ox-hint, [oxHint]"></ng-content>
        }
      }
    </div>
  `,
  styleUrl: './form-field.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'ox-form-field',
    '[class.ox-form-field--outline]': 'appearance() === "outline"',
    '[class.ox-form-field--filled]': 'appearance() === "filled"',
    '[class.ox-form-field--standard]': 'appearance() === "standard"',
    '[class.ox-form-field--sm]': 'size() === "sm"',
    '[class.ox-form-field--md]': 'size() === "md"',
    '[class.ox-form-field--lg]': 'size() === "lg"',
    '[class.ox-form-field--disabled]': 'isDisabled()',
    '[class.ox-form-field--invalid]': 'isInvalid()'
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

  // Query nested NgControl or custom OxFormFieldControl
  ngControl = contentChild(NgControl);
  customControl = contentChild(OX_FORM_FIELD_CONTROL);

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
