import { Component, Directive, input, booleanAttribute, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'val-label, [valLabel]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
    @if (required()) {
      <span class="val-form-field-required-marker" aria-hidden="true">*</span>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'val-form-field-label',
    '[class.val-form-field-label--required]': 'required()'
  }
})
export class FormFieldLabelComponent {
  required = input<boolean, unknown>(false, { transform: booleanAttribute });
}
