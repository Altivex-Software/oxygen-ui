import { Component, input, computed } from '@angular/core';
import { ValenceSeverity, ValenceSize, ValenceColor } from '../../lib-core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'filled' | 'outlined' | 'flat';

@Component({
  selector: 'val-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  host: {
    '[class]': 'hostClasses()',
    '[class.val-badge--pill]': 'pill()',
    '[class.val-badge--dot]': 'dot()',
    '[attr.role]': 'dot() ? null : "status"',
    '[attr.aria-label]': 'ariaLabel() || (dot() ? null : value()?.toString())',
    '[attr.aria-hidden]': 'dot() && !ariaLabel() ? "true" : null'
  }
})
export class BadgeComponent {
  value = input<string | number>();
  severity = input<ValenceSeverity | ValenceColor>('primary');
  variant = input<BadgeVariant>('filled');
  size = input<ValenceSize>('md');
  pill = input<boolean>(false);
  dot = input<boolean>(false);
  overlay = input<boolean>(false);
  ariaLabel = input<string | null>(null, { alias: 'aria-label' });

  hostClasses = computed(() => {
    return [
      'val-badge',
      `val-badge--${this.severity()}`,
      `val-badge--${this.variant()}`,
      `val-badge--${this.size()}`,
      this.overlay() ? 'val-badge--overlay' : ''
    ].filter(c => !!c).join(' ');
  });
}
