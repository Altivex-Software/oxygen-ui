import {
  Component,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  forwardRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { BadgeComponent } from '../badge/badge.component';
import { PanelMenuItem } from './panel-menu.types';

@Component({
  selector: 'ox-panel-menu-sub',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, BadgeComponent, forwardRef(() => PanelMenuSubComponent)],
  template: `
    <ul class="ox-panelmenu-sublist" [class.ox-panelmenu-nested-list]="level() > 0">
      @for (item of items(); track item.label || $index) {
        @if (item.separator) {
          <li class="ox-panelmenu-separator"></li>
        } @else {
          <li class="ox-panelmenu-item" [class.ox-panelmenu-item-expanded]="item.expanded">
            <a 
              [routerLink]="item.routerLink"
              [href]="item.url || null"
              [attr.target]="item.target || null"
              class="ox-panelmenu-item-link"
              [class.ox-panelmenu-disabled]="item.disabled"
              (click)="onItemClick($event, item)">
              
              @if (item.icon) {
                <span class="ox-panelmenu-item-icon">
                  <ox-icon [name]="$any(item.icon)" size="1rem"></ox-icon>
                </span>
              }

              <span class="ox-panelmenu-item-label">{{ item.label }}</span>

              @if (item.badge) {
                <ox-badge [value]="item.badge" [severity]="item.badgeSeverity || 'info'"></ox-badge>
              }

              @if (item.items && item.items.length > 0) {
                <span class="ox-panelmenu-toggler" [class.ox-panelmenu-toggler-expanded]="item.expanded">
                  <ox-icon name="chevron-right" size="0.75rem"></ox-icon>
                </span>
              }
            </a>

            @if (item.items && item.items.length > 0 && item.expanded) {
              <ox-panel-menu-sub [items]="item.items" [level]="level() + 1"></ox-panel-menu-sub>
            }
          </li>
        }
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PanelMenuSubComponent {
  items = input<PanelMenuItem[]>([]);
  level = input<number>(0);

  onItemClick(event: MouseEvent, item: PanelMenuItem) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (item.items && item.items.length > 0) {
      event.preventDefault();
      item.expanded = !item.expanded;
    }

    if (item.command) {
      item.command({ originalEvent: event, item });
    }
  }
}

@Component({
  selector: 'ox-panel-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, BadgeComponent, PanelMenuSubComponent],
  template: `
    <div class="ox-panelmenu">
      @for (panel of model(); track panel.label || $index) {
        <div 
          class="ox-panelmenu-panel" 
          [class.ox-panelmenu-panel-expanded]="panel.expanded"
          [class]="panel.styleClass || ''">
          
          <div class="ox-panelmenu-header">
            <a 
              [routerLink]="panel.routerLink"
              [href]="panel.url || null"
              [attr.target]="panel.target || null"
              class="ox-panelmenu-header-link"
              [class.ox-panelmenu-disabled]="panel.disabled"
              (click)="onHeaderClick($event, panel)">
              
              @if (panel.icon) {
                <span class="ox-panelmenu-header-icon">
                  <ox-icon [name]="$any(panel.icon)" size="1.125rem"></ox-icon>
                </span>
              }

              <span class="ox-panelmenu-header-label">{{ panel.label }}</span>

              @if (panel.badge) {
                <ox-badge [value]="panel.badge" [severity]="panel.badgeSeverity || 'info'"></ox-badge>
              }

              @if (panel.items && panel.items.length > 0) {
                <span class="ox-panelmenu-toggler" [class.ox-panelmenu-toggler-expanded]="panel.expanded">
                  <ox-icon name="chevron-right" size="0.875rem"></ox-icon>
                </span>
              }
            </a>
          </div>

          @if (panel.items && panel.items.length > 0 && panel.expanded) {
            <div class="ox-panelmenu-content">
              <ox-panel-menu-sub [items]="panel.items" [level]="0"></ox-panel-menu-sub>
            </div>
          }
        </div>
      }
    </div>
  `,
  styleUrls: ['./panel-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PanelMenuComponent {
  model = input<PanelMenuItem[]>([]);
  multiple = input<boolean>(false);

  onHeaderClick(event: MouseEvent, panel: PanelMenuItem) {
    if (panel.disabled) {
      event.preventDefault();
      return;
    }

    if (panel.items && panel.items.length > 0) {
      event.preventDefault();
      const currentExpanded = panel.expanded;

      if (!this.multiple()) {
        for (const item of this.model()) {
          if (item !== panel) {
            item.expanded = false;
          }
        }
      }

      panel.expanded = !currentExpanded;
    }

    if (panel.command) {
      panel.command({ originalEvent: event, item: panel });
    }
  }
}
