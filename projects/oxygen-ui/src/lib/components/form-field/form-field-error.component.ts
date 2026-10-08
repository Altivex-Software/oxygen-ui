import { Component, input, inject, ViewEncapsulation, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { OxIconName } from '../icon/icon.types';

@Component({
  selector: 'ox-error, ox-field-error, [oxError]',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <span class="ox-form-field-error-icon-wrapper" aria-hidden="true">
      <ox-icon [name]="icon() || 'alert-circle'" size="0.875rem"></ox-icon>
    </span>
    <span class="ox-form-field-error-message">
      <ng-content></ng-content>
    </span>
  `,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'ox-form-field-error ox-animate-fade-in-down',
    'role': 'alert',
    'aria-live': 'polite'
  }
})
export class FormFieldErrorComponent {
  icon = input<OxIconName>('alert-circle');
  errorName = input<string>();
}
