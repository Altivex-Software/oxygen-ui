import { Component, Directive, input, booleanAttribute, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ox-label, [oxLabel]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
    @if (required()) {
      <span class="ox-form-field-required-marker" aria-hidden="true">*</span>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'ox-form-field-label',
    '[class.ox-form-field-label--required]': 'required()'
  }
})
export class FormFieldLabelComponent {
  required = input<boolean, unknown>(false, { transform: booleanAttribute });
}
