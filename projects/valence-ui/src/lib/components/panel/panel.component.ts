import { Component, input, signal, TemplateRef, computed } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export type PanelVariant = 'outlined' | 'flat' | 'seamless';
export type PanelHeaderPosition = 'start' | 'center' | 'end';

@Component({
  selector: 'val-panel',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet, IconComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  host: {
    '[class.val-panel]': 'true',
    '[class.val-panel--outlined]': 'variant() === "outlined"',
    '[class.val-panel--flat]': 'variant() === "flat"',
    '[class.val-panel--seamless]': 'variant() === "seamless"',
    '[class.val-panel--disabled]': 'disabled()',
    '[attr.aria-disabled]': 'disabled()',
    '[class.val-panel--header-start]': 'headerPosition() === "start"',
    '[class.val-panel--header-center]': 'headerPosition() === "center"',
    '[class.val-panel--header-end]': 'headerPosition() === "end"',
    '[style.--val-panel-border-style]': 'borderStyle()',
    '[style.--val-panel-box-shadow]': 'shadowValue()'
  }
})
export class PanelComponent {
  header = input<string>();
  headerTemplate = input<TemplateRef<any>>(); // Custom header content
  variant = input<PanelVariant>('outlined');
  disabled = input<boolean>(false);
  headerPosition = input<PanelHeaderPosition>('start');
  toggleable = input<boolean>(false);
  iconTemplate = input<TemplateRef<any>>(); // Custom toggle icon
  borderStyle = input<'solid' | 'dashed' | 'dotted' | 'double'>('solid');
  boxShadow = input<'sm' | 'md' | 'lg' | 'none'>('none');
  scrollable = input<boolean>(false);
  scrollDirection = input<'x' | 'y' | 'both'>('y');
  scrollHeight = input<string>('300px');
  scrollWidth = input<string>('100%');
  
  collapsed = signal<boolean>(false);

  protected shadowValue = computed(() => {
    if (this.boxShadow() === 'none') return 'none';
    return `var(--shadow-${this.boxShadow()})`;
  });

  private static nextId = 0;
  private readonly uniqueId = `val-panel-${PanelComponent.nextId++}`;

  protected headerId = computed(() => `${this.uniqueId}-header`);
  protected contentId = computed(() => `${this.uniqueId}-content`);

  toggle() {
    if (this.toggleable() && !this.disabled()) {
      this.collapsed.update((c: boolean) => !c);
    }
  }
}
