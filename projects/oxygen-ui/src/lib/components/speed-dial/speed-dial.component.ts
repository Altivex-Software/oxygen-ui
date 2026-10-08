import { 
  Component, 
  input, 
  output, 
  signal, 
  computed, 
  ChangeDetectionStrategy, 
  ViewEncapsulation,
  ElementRef,
  HostListener,
  inject,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { OxIconName } from '../icon/icon.types';

export type SpeedDialTooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';

export interface SpeedDialItem {
  icon?: OxIconName | string;
  label?: string;
  tooltip?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  command?: (event: { originalEvent: Event; item: SpeedDialItem }) => void;
  disabled?: boolean;
  styleClass?: string;
}

export type SpeedDialType = 'linear' | 'circle' | 'semi-circle' | 'quarter-circle';
export type SpeedDialDirection = 'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right';

@Component({
  selector: 'ox-speed-dial',
  standalone: true,
  imports: [CommonModule, IconComponent],
  host: {
    '[class]': 'hostClasses()'
  },
  template: `
    <!-- Primary Floating Action Button (FAB) -->
    <button 
      type="button" 
      class="ox-speed-dial-button"
      [class.ox-speed-dial-button-opened]="visible()"
      [class]="buttonClass()"
      [ngStyle]="buttonStyle()"
      [disabled]="disabled()"
      (click)="toggle($event)"
      [attr.aria-expanded]="visible()"
      [attr.aria-label]="ariaLabel()">
      <span 
        class="ox-speed-dial-icon" 
        [class.ox-speed-dial-icon-rotate]="rotateAnimation() && visible()">
        @if (visible() && activeIcon()) {
          <ox-icon [name]="$any(activeIcon())" size="1.25rem"></ox-icon>
        } @else if (icon()) {
          <ox-icon [name]="$any(icon())" size="1.25rem"></ox-icon>
        } @else {
          <ox-icon name="plus" size="1.25rem"></ox-icon>
        }
      </span>
    </button>

    <!-- Action Items List -->
    @if (visible()) {
      <ul 
        class="ox-speed-dial-list ox-speed-dial-list-visible" 
        role="menu">
        @for (item of model(); track $index) {
          <li 
            class="ox-speed-dial-action-item"
            role="none"
            [style.transform]="getItemTransform($index)"
            [style.transition-delay]="getItemTransitionDelay($index)">
            
            <!-- Floating Label (if enabled) -->
            @if (showLabels() && item.label) {
              <span class="ox-speed-dial-action-label" (click)="onItemClick(item, $event)">
                {{ item.label }}
              </span>
            }

            <button 
              type="button" 
              class="ox-speed-dial-action"
              [class.ox-speed-dial-action-disabled]="item.disabled"
              [class]="item.styleClass || ''"
              [disabled]="item.disabled"
              [attr.aria-label]="item.tooltip || item.label || ''"
              (click)="onItemClick(item, $event)">
              @if (item.icon) {
                <ox-icon [name]="$any(item.icon)" size="1.125rem" class="ox-speed-dial-action-icon"></ox-icon>
              }

              <!-- Tooltip on hover if labels are not shown -->
              @if (!showLabels() && (item.tooltip || item.label)) {
                <span 
                  class="ox-speed-dial-tooltip ox-speed-dial-tooltip-{{ getTooltipPosition(item) }}">
                  {{ item.tooltip || item.label }}
                </span>
              }
            </button>
          </li>
        }
      </ul>
    }

    <!-- Optional Backdrop Mask Overlay -->
    @if (mask() && visible()) {
      <div class="ox-speed-dial-mask" (click)="close()"></div>
    }
  `,
  styleUrl: './speed-dial.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeedDialComponent {
  private el = inject(ElementRef);

  model = input<SpeedDialItem[]>([]);
  type = input<SpeedDialType>('linear');
  direction = input<SpeedDialDirection>('up');
  radius = input<number>(100);
  icon = input<string>('');
  activeIcon = input<string>('');
  disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
  mask = input<boolean, unknown>(false, { transform: booleanAttribute });
  showLabels = input<boolean, unknown>(false, { transform: booleanAttribute });
  rotateAnimation = input<boolean, unknown>(true, { transform: booleanAttribute });
  hideOnClickOutside = input<boolean, unknown>(true, { transform: booleanAttribute });
  tooltipPosition = input<SpeedDialTooltipPosition>('auto');
  styleClass = input<string>('');
  buttonClass = input<string>('');
  buttonStyle = input<Record<string, any> | undefined>(undefined);
  ariaLabel = input<string>('Acciones Rápidas');

  onVisibleChange = output<boolean>();
  onClick = output<MouseEvent>();

  visible = signal<boolean>(false);

  hostClasses = computed(() => {
    return [
      'ox-speed-dial',
      `ox-speed-dial-${this.type()}`,
      `ox-speed-dial-${this.direction()}`,
      this.visible() ? 'ox-speed-dial-opened' : '',
      this.disabled() ? 'ox-speed-dial-disabled' : '',
      this.styleClass()
    ].filter(Boolean).join(' ');
  });

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.hideOnClickOutside() && this.visible()) {
      if (!this.el.nativeElement.contains(event.target)) {
        this.close();
      }
    }
  }

  @HostListener('window:keydown.escape', ['$event'])
  onEscape(event: any): void {
    if (this.visible()) {
      this.close();
    }
  }

  toggle(event: MouseEvent): void {
    if (this.disabled()) return;
    this.visible.update(v => !v);
    this.onVisibleChange.emit(this.visible());
    this.onClick.emit(event);
  }

  open(): void {
    if (!this.visible()) {
      this.visible.set(true);
      this.onVisibleChange.emit(true);
    }
  }

  close(): void {
    if (this.visible()) {
      this.visible.set(false);
      this.onVisibleChange.emit(false);
    }
  }

  onItemClick(item: SpeedDialItem, event: MouseEvent): void {
    if (item.disabled) return;
    if (item.command) {
      item.command({ originalEvent: event, item });
    }
    this.close();
  }

  getTooltipPosition(item: SpeedDialItem): string {
    if (item.tooltipPosition) {
      return item.tooltipPosition;
    }
    const pos = this.tooltipPosition();
    if (pos !== 'auto') {
      return pos;
    }
    // Smart auto position based on direction to avoid covering sibling buttons
    if (this.direction() === 'up' || this.direction() === 'down') {
      return 'left';
    }
    return 'top';
  }

  getItemTransitionDelay(index: number): string {
    const delay = this.visible() ? index * 0.04 : 0;
    return `${delay}s`;
  }

  getItemTransform(index: number): string {
    if (this.type() === 'linear') {
      return '';
    }

    // Radial / Circle / Semi-Circle Math
    const total = this.model().length;
    let angle = 0;
    const r = this.radius();

    if (this.type() === 'circle') {
      const step = 360 / total;
      angle = index * step - 90;
    } else if (this.type() === 'semi-circle') {
      const step = 180 / (total - 1 || 1);
      if (this.direction() === 'up') angle = 180 + index * step;
      else if (this.direction() === 'down') angle = index * step;
      else if (this.direction() === 'left') angle = 90 + index * step;
      else if (this.direction() === 'right') angle = 270 + index * step;
    } else if (this.type() === 'quarter-circle') {
      const step = 90 / (total - 1 || 1);
      if (this.direction() === 'up-left') angle = 180 + index * step;
      else if (this.direction() === 'up-right') angle = 270 + index * step;
      else if (this.direction() === 'down-left') angle = 90 + index * step;
      else if (this.direction() === 'down-right') angle = index * step;
    }

    const rad = (angle * Math.PI) / 180;
    const x = Math.round(r * Math.cos(rad));
    const y = Math.round(r * Math.sin(rad));

    return `translate3d(${x}px, ${y}px, 0) scale(1)`;
  }
}
