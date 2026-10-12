import { Component, input, output, signal, computed } from '@angular/core';
import { OxygenSeverity } from '../../lib-core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { OxIconName } from '../icon/icon.types';

export type AlertVariant = 'filled' | 'outlined' | 'flat' | 'glass';

@Component({
  selector: 'ox-alert',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  host: {
    '[class.ox-alert]': 'true',
    '[class.ox-alert--success]': 'severity() === "success"',
    '[class.ox-alert--info]': 'severity() === "info"',
    '[class.ox-alert--warning]': 'severity() === "warn"',
    '[class.ox-alert--danger]': 'severity() === "error"',
    '[class.ox-alert--filled]': 'variant() === "filled"',
    '[class.ox-alert--outlined]': 'variant() === "outlined"',
    '[class.ox-alert--flat]': 'variant() === "flat"',
    '[class.ox-alert--glass]': 'variant() === "glass"',
    '[class.ox-alert--hidden]': '!isVisible()',
    '[attr.role]': 'severity() === "error" ? "alert" : "status"',
    '[attr.aria-live]': 'severity() === "error" ? "assertive" : "polite"'
  }
})
export class AlertComponent {
  severity = input<OxygenSeverity>('info');
  variant = input<AlertVariant>('flat');
  title = input<string>();
  icon = input<OxIconName>();
  showIcon = input<boolean>(true);
  closable = input<boolean>(false);
  
  onClose = output<void>();
  
  isVisible = signal<boolean>(true);

  effectiveIcon = computed<OxIconName>(() => {
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
