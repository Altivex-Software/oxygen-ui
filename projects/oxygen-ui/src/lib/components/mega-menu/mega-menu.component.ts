import {
  Component,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { BadgeComponent } from '../badge/badge.component';
import { MegaMenuItem, MegaMenuColumn, MegaMenuSubItem } from './mega-menu.types';

@Component({
  selector: 'ox-mega-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, BadgeComponent],
  template: `
    <nav 
      class="ox-megamenu" 
      [class.ox-megamenu-vertical]="orientation() === 'vertical'"
      [class.ox-megamenu-horizontal]="orientation() === 'horizontal'">
      
      <div class="ox-megamenu-start">
        <ng-content select="[start]"></ng-content>
      </div>

      <ul class="ox-megamenu-root-list">
        @for (item of model(); track item.label || $index) {
          @if (item.separator) {
            <li class="ox-megamenu-separator"></li>
          } @else {
            <li class="ox-megamenu-item" [class.ox-megamenu-item-has-children]="item.items && item.items.length > 0">
              <a 
                [routerLink]="item.routerLink"
                [href]="item.url || null"
                [attr.target]="item.target || null"
                class="ox-megamenu-item-link"
                [class.ox-megamenu-disabled]="item.disabled"
                (click)="onItemClick($event, item)">
                
                @if (item.icon) {
                  <span class="ox-megamenu-item-icon">
                    <ox-icon [name]="$any(item.icon)" size="1rem"></ox-icon>
                  </span>
                }

                <span class="ox-megamenu-item-label">{{ item.label }}</span>

                @if (item.badge) {
                  <ox-badge [value]="item.badge" [severity]="item.badgeSeverity || 'info'"></ox-badge>
                }

                @if (item.items && item.items.length > 0) {
                  <span class="ox-megamenu-submenu-icon">
                    <ox-icon [name]="orientation() === 'vertical' ? 'chevron-right' : 'chevron-down'" size="0.75rem"></ox-icon>
                  </span>
                }
              </a>

              <!-- MegaMenu Multi-Column Flyout Dropdown -->
              @if (item.items && item.items.length > 0) {
                <div class="ox-megamenu-panel ox-elevation-3">
                  <div class="ox-megamenu-grid">
                    @for (columnGroup of item.items; track $index) {
                      <div class="ox-megamenu-col">
                        @for (category of columnGroup; track category.label || $index) {
                          <div class="ox-megamenu-category">
                            @if (category.label) {
                              <h4 class="ox-megamenu-category-header">
                                @if (category.icon) {
                                  <ox-icon [name]="$any(category.icon)" size="0.875rem"></ox-icon>
                                }
                                <span>{{ category.label }}</span>
                              </h4>
                            }

                            @if (category.items && category.items.length > 0) {
                              <ul class="ox-megamenu-category-list">
                                @for (subitem of category.items; track subitem.label || $index) {
                                  <li>
                                    <a 
                                      [routerLink]="subitem.routerLink"
                                      [href]="subitem.url || null"
                                      [attr.target]="subitem.target || null"
                                      class="ox-megamenu-sublink"
                                      [class.ox-megamenu-disabled]="subitem.disabled"
                                      (click)="onSubItemClick($event, subitem)">
                                      
                                      @if (subitem.icon) {
                                        <span class="ox-megamenu-sublink-icon">
                                          <ox-icon [name]="$any(subitem.icon)" size="1.125rem"></ox-icon>
                                        </span>
                                      }

                                      <div class="ox-megamenu-sublink-text">
                                        <div class="flex items-center gap-2">
                                          <span class="ox-megamenu-sublink-label">{{ subitem.label }}</span>
                                          @if (subitem.badge) {
                                            <ox-badge [value]="subitem.badge" [severity]="subitem.badgeSeverity || 'info'"></ox-badge>
                                          }
                                        </div>
                                        @if (subitem.description) {
                                          <span class="ox-megamenu-sublink-desc">{{ subitem.description }}</span>
                                        }
                                      </div>
                                    </a>
                                  </li>
                                }
                              </ul>
                            }
                          </div>
                        }
                      </div>
                    }
                  </div>
                </div>
              }
            </li>
          }
        }
      </ul>

      <div class="ox-megamenu-end">
        <ng-content select="[end]"></ng-content>
      </div>
    </nav>
  `,
  styleUrls: ['./mega-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MegaMenuComponent {
  model = input<MegaMenuItem[]>([]);
  orientation = input<'horizontal' | 'vertical'>('horizontal');

  onItemClick(event: MouseEvent, item: MegaMenuItem) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    if (item.command) {
      item.command({ originalEvent: event, item });
    }
  }

  onSubItemClick(event: MouseEvent, item: MegaMenuSubItem) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    if (item.command) {
      item.command({ originalEvent: event, item });
    }
  }
}
