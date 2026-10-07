import { 
  Component, 
  input, 
  output, 
  signal, 
  computed, 
  ChangeDetectionStrategy, 
  ViewEncapsulation,
  ElementRef,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { OxIconName } from '../icon/icon.types';

export interface SpeedDialItem {
  icon?: OxIconName | string;
  label?: string;
  tooltip?: string;
  command?: (event: { originalEvent: Event; item: SpeedDialItem }) => void;
  disabled?: boolean;
  styleClass?: string;
}

@Component({
  selector: 'ox-speed-dial',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div 
      class="ox-speed-dial ox-speed-dial-{{ direction() }}"
      [class.ox-speed-dial-opened]="visible()"
      [class.ox-speed-dial-disabled]="disabled()"
      [class]="styleClass()">
      
      <!-- Primary FAB Button -->
      <button 
        type="button" 
        class="ox-speed-dial-button ox-elevation-2"
        [disabled]="disabled()"
        (click)="toggle($event)"
        [attr.aria-expanded]="visible()">
        <span class="ox-speed-dial-icon" [class.ox-speed-dial-icon-rotate]="visible()">
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
      <ul class="ox-speed-dial-list" [class.ox-speed-dial-list-visible]="visible()">
        @for (item of model(); track $index) {
          <li 
            class="ox-speed-dial-action-item"
            [style.transition-delay]="getItemTransitionDelay($index)">
            
            <button 
              type="button" 
              class="ox-speed-dial-action"
              [class.ox-speed-dial-action-disabled]="item.disabled"
              [disabled]="item.disabled"
              [title]="item.tooltip || item.label || ''"
              (click)="onItemClick(item, $event)">
              @if (item.icon) {
                <ox-icon [name]="$any(item.icon)" size="1rem" class="ox-speed-dial-action-icon"></ox-icon>
              }
            </button>

            @if (showLabels() && item.label) {
              <span class="ox-speed-dial-action-label">{{ item.label }}</span>
            }
          </li>
        }
      </ul>

      <!-- Optional Backdrop Mask -->
      @if (mask() && visible()) {
        <div class="ox-speed-dial-mask" (click)="close()"></div>
      }
    </div>
  `,
  styles: [`
    .ox-speed-dial {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .ox-speed-dial-button {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: var(--primary-color, #4f46e5);
      color: #ffffff;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 1001;
      transition: background-color 0.2s, transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      outline: none;
    }

    .ox-speed-dial-button:hover:not(:disabled) {
      background: var(--primary-600, #4338ca);
      transform: scale(1.05);
    }

    .ox-speed-dial-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .ox-speed-dial-icon-rotate {
      transform: rotate(45deg);
    }

    .ox-speed-dial-default-svg {
      width: 24px;
      height: 24px;
    }

    .ox-speed-dial-list {
      position: absolute;
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      pointer-events: none;
      z-index: 1000;
    }

    .ox-speed-dial-list-visible {
      pointer-events: auto;
    }

    /* Direction: UP */
    .ox-speed-dial-up .ox-speed-dial-list {
      flex-direction: column-reverse;
      bottom: 60px;
      gap: 12px;
    }

    /* Direction: DOWN */
    .ox-speed-dial-down .ox-speed-dial-list {
      flex-direction: column;
      top: 60px;
      gap: 12px;
    }

    /* Direction: LEFT */
    .ox-speed-dial-left .ox-speed-dial-list {
      flex-direction: row-reverse;
      right: 60px;
      gap: 12px;
    }

    /* Direction: RIGHT */
    .ox-speed-dial-right .ox-speed-dial-list {
      flex-direction: row;
      left: 60px;
      gap: 12px;
    }

    .ox-speed-dial-action-item {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      opacity: 0;
      transform: scale(0.4);
      transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .ox-speed-dial-list-visible .ox-speed-dial-action-item {
      opacity: 1;
      transform: scale(1);
    }

    .ox-speed-dial-action {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: var(--bg-surface, #ffffff);
      color: var(--text-primary, #1e293b);
      border: 1px solid var(--border-color, #e2e8f0);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      outline: none;
    }

    .ox-speed-dial-action:hover:not(:disabled) {
      background: var(--primary-50, #eef2ff);
      color: var(--primary-color, #4f46e5);
      border-color: var(--primary-300, #a5b4fc);
      transform: scale(1.1);
    }

    .ox-speed-dial-action-icon {
      font-size: 1.1rem;
    }

    .ox-speed-dial-action-label {
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--text-primary, #1e293b);
      background: var(--bg-surface, #ffffff);
      padding: 3px 8px;
      border-radius: var(--radius-sm, 6px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
      border: 1px solid var(--border-color, #e2e8f0);
      white-space: nowrap;
    }

    .ox-speed-dial-mask {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.3);
      backdrop-filter: blur(2px);
      z-index: 999;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SpeedDialComponent {
  model = input<SpeedDialItem[]>([]);
  direction = input<'up' | 'down' | 'left' | 'right'>('up');
  icon = input<string>('');
  activeIcon = input<string>('');
  disabled = input<boolean>(false);
  mask = input<boolean>(false);
  showLabels = input<boolean>(false);
  styleClass = input<string>('');

  onVisibleChange = output<boolean>();

  visible = signal<boolean>(false);

  toggle(event: Event): void {
    event.stopPropagation();
    if (this.disabled()) return;
    const next = !this.visible();
    this.visible.set(next);
    this.onVisibleChange.emit(next);
  }

  close(): void {
    this.visible.set(false);
    this.onVisibleChange.emit(false);
  }

  onItemClick(item: SpeedDialItem, event: Event): void {
    event.stopPropagation();
    if (item.disabled) return;
    if (item.command) {
      item.command({ originalEvent: event, item });
    }
    this.close();
  }

  getItemTransitionDelay(index: number): string {
    return `${index * 0.04}s`;
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.visible()) {
      this.close();
    }
  }
}
