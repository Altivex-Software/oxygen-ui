import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[valAccordionHeader]',
  standalone: true
})
export class ValAccordionHeaderDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
