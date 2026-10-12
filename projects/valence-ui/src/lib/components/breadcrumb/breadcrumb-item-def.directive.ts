import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[valBreadcrumbItem]',
  standalone: true
})
export class ValBreadcrumbItemDef {
  constructor(public template: TemplateRef<any>) {}
}
