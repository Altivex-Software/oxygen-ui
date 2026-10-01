import { 
  Component, 
  input, 
  output, 
  signal, 
  ChangeDetectionStrategy, 
  ViewEncapsulation, 
  ChangeDetectorRef, 
  inject,
  HostListener 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

export interface ContextMenuItem {
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  disabled?: boolean;
  danger?: boolean;
  separator?: boolean;
}

@Component({
  selector: 'ox-context-menu',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  template: `
    <div 
      *ngIf="isOpen()"
      class="ox-context-menu-wrapper"
      (click)="close()"
      (contextmenu)="$event.preventDefault(); close()">
      <div 
        class="ox-context-menu-panel ox-elevation-3"
        [style.left.px]="clickX()"
        [style.top.px]="clickY()"
        (click)="$event.stopPropagation()">
        <ul class="ox-context-menu-items">
          @for (item of model(); track $index) {
            @if (item.separator) {
              <li class="ox-context-menu-separator"></li>
            } @else {
              <li 
                class="ox-context-menu-item" 
                [class.ox-context-menu-item-disabled]="item.disabled"
                [class.ox-context-menu-item-danger]="item.danger"
                (click)="onItemClick(item, $event)">
                @if (item.icon) {
                  <span class="ox-context-menu-icon">{{ item.icon }}</span>
                }
                <span class="ox-context-menu-label">{{ item.label }}</span>
              </li>
            }
          }
        </ul>
      </div>
    </div>
  `,
  styleUrl: './context-menu.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuComponent {
  model = input<ContextMenuItem[]>([]);
  onItemSelect = output<ContextMenuItem>();

  isOpen = signal(false);
  clickX = signal(0);
  clickY = signal(0);
  targetData = signal<any>(null);

  private cdr = inject(ChangeDetectorRef);

  show(event: MouseEvent, targetData?: any) {
    event.preventDefault();
    event.stopPropagation();

    this.clickX.set(event.clientX);
    this.clickY.set(event.clientY);
    this.targetData.set(targetData);
    this.isOpen.set(true);
    this.cdr.markForCheck();
  }

  close() {
    if (this.isOpen()) {
      this.isOpen.set(false);
      this.targetData.set(null);
      this.cdr.markForCheck();
    }
  }

  onItemClick(item: ContextMenuItem, event: MouseEvent) {
    if (item.disabled) return;

    if (item.command) {
      item.command({ originalEvent: event, item: item, data: this.targetData() });
    }

    this.onItemSelect.emit(item);
    this.close();
  }

  @HostListener('document:scroll')
  onWindowScroll() {
    if (this.isOpen()) {
      this.close();
    }
  }
}
