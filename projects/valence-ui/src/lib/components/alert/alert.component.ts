import { Component, input, output, signal, computed } from '@angular/core';
import { ValenceSeverity } from '../../lib-core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { ValIconName } from '../icon/icon.types';

export type AlertVariant = 'filled' | 'outlined' | 'flat' | 'glass';

@Component({
  selector: 'val-alert',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  host: {
    '[class.val-alert]': 'true',
    '[class.val-alert--success]': 'severity() === "success"',
    '[class.val-alert--info]': 'severity() === "info"',
    '[class.val-alert--warning]': 'severity() === "warn"',
    '[class.val-alert--danger]': 'severity() === "error"',
    '[class.val-alert--filled]': 'variant() === "filled"',
    '[class.val-alert--outlined]': 'variant() === "outlined"',
    '[class.val-alert--flat]': 'variant() === "flat"',
    '[class.val-alert--glass]': 'variant() === "glass"',
    '[class.val-alert--hidden]': '!isVisible()',
    '[attr.role]': 'severity() === "error" ? "alert" : "status"',
    '[attr.aria-live]': 'severity() === "error" ? "assertive" : "polite"'
  }
})
export class AlertComponent {
  severity = input<ValenceSeverity>('info');
  variant = input<AlertVariant>('flat');
  title = input<string>();
  icon = input<ValIconName>();
  showIcon = input<boolean>(true);
  closable = input<boolean>(false);
  
  onClose = output<void>();
  
  isVisible = signal<boolean>(true);

  effectiveIcon = computed<ValIconName>(() => {
    if (this.icon()) return this.icon()!;
    switch (this.severity()) {
      case 'success': return 'check-circle';
      case 'warn': return 'alert-triangle';
      case 'error': return 'alert-circle';
      case 'info':
      default:
        return 'info';
    }
  });

  close() {
    this.isVisible.set(false);
    this.onClose.emit();
  }
}
