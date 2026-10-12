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
  selector: 'val-panel-menu-sub',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, BadgeComponent, forwardRef(() => PanelMenuSubComponent)],
  template: `
    <ul class="val-panelmenu-sublist" [class.val-panelmenu-nested-list]="level() > 0">
      @for (item of items(); track item.label || $index) {
        @if (item.separator) {
          <li class="val-panelmenu-separator"></li>
        } @else {
          <li class="val-panelmenu-item" [class.val-panelmenu-item-expanded]="item.expanded">
            <a 
              [routerLink]="item.routerLink"
              [href]="item.url || null"
              [attr.target]="item.target || null"
              class="val-panelmenu-item-link"
              [class.val-panelmenu-disabled]="item.disabled"
              (click)="onItemClick($event, item)">
              
              @if (item.icon) {
                <span class="val-panelmenu-item-icon">
                  <val-icon [name]="$any(item.icon)" size="1rem"></val-icon>
                </span>
              }

              <span class="val-panelmenu-item-label">{{ item.label }}</span>

              @if (item.badge) {
                <val-badge [value]="item.badge" [severity]="item.badgeSeverity || 'info'"></val-badge>
              }

              @if (item.items && item.items.length > 0) {
                <span class="val-panelmenu-toggler" [class.val-panelmenu-toggler-expanded]="item.expanded">
                  <val-icon name="chevron-right" size="0.75rem"></val-icon>
                </span>
              }
            </a>

            @if (item.items && item.items.length > 0 && item.expanded) {
              <val-panel-menu-sub [items]="item.items" [level]="level() + 1"></val-panel-menu-sub>
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
  selector: 'val-panel-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, BadgeComponent, PanelMenuSubComponent],
  template: `
    <div class="val-panelmenu">
      @for (panel of model(); track panel.label || $index) {
        <div 
          class="val-panelmenu-panel" 
          [class.val-panelmenu-panel-expanded]="panel.expanded"
          [class]="panel.styleClass || ''">
          
          <div class="val-panelmenu-header">
            <a 
              [routerLink]="panel.routerLink"
              [href]="panel.url || null"
              [attr.target]="panel.target || null"
              class="val-panelmenu-header-link"
              [class.val-panelmenu-disabled]="panel.disabled"
              (click)="onHeaderClick($event, panel)">
              
              @if (panel.icon) {
                <span class="val-panelmenu-header-icon">
                  <val-icon [name]="$any(panel.icon)" size="1.125rem"></val-icon>
                </span>
              }

              <span class="val-panelmenu-header-label">{{ panel.label }}</span>

              @if (panel.badge) {
                <val-badge [value]="panel.badge" [severity]="panel.badgeSeverity || 'info'"></val-badge>
              }

              @if (panel.items && panel.items.length > 0) {
                <span class="val-panelmenu-toggler" [class.val-panelmenu-toggler-expanded]="panel.expanded">
                  <val-icon name="chevron-right" size="0.875rem"></val-icon>
                </span>
              }
            </a>
          </div>

          @if (panel.items && panel.items.length > 0 && panel.expanded) {
            <div class="val-panelmenu-content">
              <val-panel-menu-sub [items]="panel.items" [level]="0"></val-panel-menu-sub>
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
