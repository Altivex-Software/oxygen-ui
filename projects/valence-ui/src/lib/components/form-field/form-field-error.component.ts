import { Component, input, inject, ViewEncapsulation, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { ValIconName } from '../icon/icon.types';

@Component({
  selector: 'val-error, val-field-error, [valError]',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <span class="val-form-field-error-icon-wrapper" aria-hidden="true">
      <val-icon [name]="icon() || 'alert-circle'" size="0.875rem"></val-icon>
    </span>
    <span class="val-form-field-error-message">
      <ng-content></ng-content>
    </span>
  `,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'val-form-field-error val-animate-fade-in-down',
    'role': 'alert',
    'aria-live': 'polite'
  }
})
export class FormFieldErrorComponent {
  icon = input<ValIconName>('alert-circle');
  errorName = input<string>();
}
