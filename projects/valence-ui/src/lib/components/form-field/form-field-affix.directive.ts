import { Directive } from '@angular/core';

@Directive({
  selector: '[valPrefix]',
  standalone: true,
  host: {
    'class': 'val-form-field-prefix'
  }
})
export class FormFieldPrefixDirective {}

@Directive({
  selector: '[valSuffix]',
  standalone: true,
  host: {
    'class': 'val-form-field-suffix'
  }
})
export class FormFieldSuffixDirective {}
