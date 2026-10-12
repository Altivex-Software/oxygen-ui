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
import { IconComponent } from '../icon/icon.component';
import { ValIconName } from '../icon/icon.types';

export interface ContextMenuItem {
  label?: string;
  icon?: ValIconName | string;
  command?: (event?: any) => void;
  disabled?: boolean;
  danger?: boolean;
  separator?: boolean;
}

@Component({
  selector: 'val-context-menu',
  standalone: true,
  imports: [CommonModule, OverlayModule, IconComponent],
  template: `
    <div 
      *ngIf="isOpen()"
      class="val-context-menu-wrapper"
      (click)="close()"
      (contextmenu)="$event.preventDefault(); close()">
      <div 
        class="val-context-menu-panel val-elevation-3"
        [style.left.px]="clickX()"
        [style.top.px]="clickY()"
        (click)="$event.stopPropagation()">
        <ul class="val-context-menu-items">
          @for (item of model(); track $index) {
            @if (item.separator) {
              <li class="val-context-menu-separator"></li>
            } @else {
              <li 
                class="val-context-menu-item" 
                [class.val-context-menu-item-disabled]="item.disabled"
                [class.val-context-menu-item-danger]="item.danger"
                (click)="onItemClick(item, $event)">
                @if (item.icon) {
                  <val-icon [name]="$any(item.icon)" size="1rem" class="val-context-menu-icon"></val-icon>
                }
                <span class="val-context-menu-label">{{ item.label }}</span>
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
