import { Component, input, TemplateRef, viewChild, Directive, inject, contentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValIconName } from '../icon/icon.types';

@Directive({
  selector: 'ng-template[valTabHeader]',
  standalone: true
})
export class ValTabHeaderDirective {
  templateRef = inject(TemplateRef);
}

let nextId = 0;

@Component({
  selector: 'val-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-template #tabContent>
      <ng-content></ng-content>
    </ng-template>
  `,
  styles: []
})
export class TabComponent {
  id = input<string>(`val-tab-${nextId++}`);
  label = input<string>(''); // Make optional if template is used
  icon = input<ValIconName | string>();
  disabled = input<boolean>(false);

  content = viewChild.required<TemplateRef<any>>('tabContent');
  headerTemplate = contentChild(ValTabHeaderDirective);
}
