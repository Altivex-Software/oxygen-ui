import { Component, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'val-hint, [valHint]',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'val-form-field-hint',
    '[class.val-form-field-hint--end]': 'align() === "end"'
  }
})
export class FormFieldHintComponent {
  align = input<'start' | 'end'>('start');
}
