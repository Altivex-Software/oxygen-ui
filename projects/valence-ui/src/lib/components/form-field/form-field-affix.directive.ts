import { Directive } from '@angular/core';

@Directive({
  selector: '[oxPrefix]',
  standalone: true,
  host: {
    'class': 'ox-form-field-prefix'
  }
})
export class FormFieldPrefixDirective {}

@Directive({
  selector: '[oxSuffix]',
  standalone: true,
  host: {
    'class': 'ox-form-field-suffix'
  }
})
export class FormFieldSuffixDirective {}
