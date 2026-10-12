import { Component, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ox-hint, [oxHint]',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'ox-form-field-hint',
    '[class.ox-form-field-hint--end]': 'align() === "end"'
  }
})
export class FormFieldHintComponent {
  align = input<'start' | 'end'>('start');
}
