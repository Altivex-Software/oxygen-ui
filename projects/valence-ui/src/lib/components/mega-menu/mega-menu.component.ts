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
  selector: 'val-mega-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, BadgeComponent],
  template: `
    <nav 
      class="val-megamenu" 
      [class.val-megamenu-vertical]="orientation() === 'vertical'"
      [class.val-megamenu-horizontal]="orientation() === 'horizontal'">
      
      <div class="val-megamenu-start">
        <ng-content select="[start]"></ng-content>
      </div>

      <ul class="val-megamenu-root-list">
        @for (item of model(); track item.label || $index) {
          @if (item.separator) {
            <li class="val-megamenu-separator"></li>
          } @else {
            <li class="val-megamenu-item" [class.val-megamenu-item-has-children]="item.items && item.items.length > 0">
              <a 
                [routerLink]="item.routerLink"
                [href]="item.url || null"
                [attr.target]="item.target || null"
                class="val-megamenu-item-link"
                [class.val-megamenu-disabled]="item.disabled"
                (click)="onItemClick($event, item)">
                
                @if (item.icon) {
                  <span class="val-megamenu-item-icon">
                    <val-icon [name]="$any(item.icon)" size="1rem"></val-icon>
                  </span>
                }

                <span class="val-megamenu-item-label">{{ item.label }}</span>

                @if (item.badge) {
                  <val-badge [value]="item.badge" [severity]="item.badgeSeverity || 'info'"></val-badge>
                }

                @if (item.items && item.items.length > 0) {
                  <span class="val-megamenu-submenu-icon">
                    <val-icon [name]="orientation() === 'vertical' ? 'chevron-right' : 'chevron-down'" size="0.75rem"></val-icon>
                  </span>
                }
              </a>

              <!-- MegaMenu Multi-Column Flyout Dropdown -->
              @if (item.items && item.items.length > 0) {
                <div class="val-megamenu-panel val-elevation-3">
                  <div class="val-megamenu-grid">
                    @for (columnGroup of item.items; track $index) {
                      <div class="val-megamenu-col">
                        @for (category of columnGroup; track category.label || $index) {
                          <div class="val-megamenu-category">
                            @if (category.label) {
                              <h4 class="val-megamenu-category-header">
                                @if (category.icon) {
                                  <val-icon [name]="$any(category.icon)" size="0.875rem"></val-icon>
                                }
                                <span>{{ category.label }}</span>
                              </h4>
                            }

                            @if (category.items && category.items.length > 0) {
                              <ul class="val-megamenu-category-list">
                                @for (subitem of category.items; track subitem.label || $index) {
                                  <li>
                                    <a 
                                      [routerLink]="subitem.routerLink"
                                      [href]="subitem.url || null"
                                      [attr.target]="subitem.target || null"
                                      class="val-megamenu-sublink"
                                      [class.val-megamenu-disabled]="subitem.disabled"
                                      (click)="onSubItemClick($event, subitem)">
                                      
                                      @if (subitem.icon) {
                                        <span class="val-megamenu-sublink-icon">
                                          <val-icon [name]="$any(subitem.icon)" size="1.125rem"></val-icon>
                                        </span>
                                      }

                                      <div class="val-megamenu-sublink-text">
                                        <div class="flex items-center gap-2">
                                          <span class="val-megamenu-sublink-label">{{ subitem.label }}</span>
                                          @if (subitem.badge) {
                                            <val-badge [value]="subitem.badge" [severity]="subitem.badgeSeverity || 'info'"></val-badge>
                                          }
                                        </div>
                                        @if (subitem.description) {
                                          <span class="val-megamenu-sublink-desc">{{ subitem.description }}</span>
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

      <div class="val-megamenu-end">
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
