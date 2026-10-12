import { Component, input, computed, signal, TemplateRef } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export type FieldsetVariant = 'outlined' | 'flat' | 'seamless';

@Component({
  selector: 'val-fieldset',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet, IconComponent],
  templateUrl: './fieldset.component.html',
  styleUrl: './fieldset.component.scss',
  host: {
    '[class.val-fieldset]': 'true',
    '[class.val-fieldset--outlined]': 'variant() === "outlined"',
    '[class.val-fieldset--flat]': 'variant() === "flat"',
    '[class.val-fieldset--seamless]': 'variant() === "seamless"',
    '[class.val-fieldset--disabled]': 'disabled()',
    '[attr.aria-disabled]': 'disabled()',
    '[class.val-fieldset--legend-start]': 'legendPosition() === "start"',
    '[class.val-fieldset--legend-center]': 'legendPosition() === "center"',
    '[class.val-fieldset--legend-end]': 'legendPosition() === "end"',
    '[style.--val-fieldset-border-style]': 'borderStyle()'
  }
})
export class FieldsetComponent {
  legend = input<string>();
  legendTemplate = input<TemplateRef<any>>();
  variant = input<FieldsetVariant>('outlined');
  disabled = input<boolean>(false);
  legendPosition = input<'start' | 'center' | 'end'>('start');
  borderStyle = input<'solid' | 'dashed' | 'dotted' | 'double'>('solid');
  toggleable = input<boolean>(false);
  iconTemplate = input<TemplateRef<any>>(); // Custom toggle icon
  
  collapsed = signal<boolean>(false);

  toggle() {
    if (this.toggleable()) {
      this.collapsed.update((c: boolean) => !c);
    }
  }
}
