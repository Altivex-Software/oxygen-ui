import { Component, input, model, computed, contentChild, viewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValAccordionHeaderDirective } from './accordion-header.directive';
import { IconComponent } from '../../icon/icon.component';

export type AccordionColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type AccordionVariantPrefix = 'outline' | 'ghost';
export type AccordionVariant = AccordionColor | `${AccordionVariantPrefix}-${AccordionColor}`;

@Component({
  selector: 'val-accordion-item',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.scss',
  host: {
    '[style]': 'hostStyles()'
  }
})
export class AccordionItemComponent {
  private static nextId = 0;
  private readonly uniqueId = `val-accordion-item-${AccordionItemComponent.nextId++}`;

  title = input<string>('');
  expanded = model<boolean>(false);
  color = input<AccordionVariant>();
  headingLevel = input<number>(3);
  itemId = input<string>(this.uniqueId);
  boxShadow = input<'sm' | 'md' | 'none'>('none');
  disabled = input<boolean>(false);

  customHeader = contentChild(ValAccordionHeaderDirective);

  headerButton = viewChild<ElementRef<HTMLButtonElement>>('headerButton');

  headerId = computed(() => `${this.itemId()}-header`);
  panelId = computed(() => `${this.itemId()}-panel`);

  shadowValue = computed(() => {
    if (this.boxShadow() === 'none') return 'none';
    return `var(--shadow-${this.boxShadow()})`;
  });

  hostStyles = computed(() => ({
    '--val-accordion-item-shadow': this.shadowValue(),
    'z-index': this.expanded() ? '1' : '0',
    'position': 'relative',
    'opacity': this.disabled() ? '0.6' : '1',
    'pointer-events': this.disabled() ? 'none' : 'auto'
  }));

  headerClasses = computed(() => {
    return [
      'val-accordion-item__header',
      this.color() ? `val-accordion-item__header--${this.color()}` : '',
      this.disabled() ? 'val-accordion-item__header--disabled' : ''
    ].filter(Boolean).join(' ');
  });

  toggle(): void {
    if (this.disabled()) return;
    this.expanded.update(v => !v);
  }

  focusHeader(): void {
    this.headerButton()?.nativeElement.focus();
  }
}
