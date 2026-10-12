import { Component, input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { ValIconName } from '../icon/icon.types';

export interface MenuItem {
  label?: string;
  icon?: ValIconName | string;
  routerLink?: string;
  items?: MenuItem[];
  separator?: boolean;
}

@Component({
  selector: 'val-menubar',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <nav class="val-menubar val-elevation-1">
      <div class="val-menubar-start">
        <ng-content select="[start]"></ng-content>
      </div>
      
      <ul class="val-menubar-root-list">
        @for (item of model(); track item.label) {
          @if (item.separator) {
            <li class="val-menubar-separator"></li>
          } @else {
            <li class="val-menubar-item" [class.val-menubar-item-has-children]="item.items">
              <a 
                [routerLink]="item.routerLink" 
                class="val-menubar-item-link">
                @if (item.icon) {
                  <val-icon [name]="$any(item.icon)" size="1rem" class="val-menubar-item-icon"></val-icon>
                }
                <span class="val-menubar-item-label">{{ item.label }}</span>
                @if (item.items) {
                  <val-icon name="chevron-down" size="0.75rem" class="val-menubar-submenu-icon"></val-icon>
                }
              </a>
              
              @if (item.items) {
                <ul class="val-menubar-submenu">
                  @for (subitem of item.items; track subitem.label) {
                    <li class="val-menubar-item">
                      <a [routerLink]="subitem.routerLink" class="val-menubar-item-link">
                        @if (subitem.icon) {
                          <val-icon [name]="$any(subitem.icon)" size="1rem" class="val-menubar-item-icon"></val-icon>
                        }
                        <span class="val-menubar-item-label">{{ subitem.label }}</span>
                      </a>
                    </li>
                  }
                </ul>
              }
            </li>
          }
        }
      </ul>

      <div class="val-menubar-end">
        <ng-content select="[end]"></ng-content>
      </div>
    </nav>
  `,
  styleUrl: './menubar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenubarComponent {
  model = input<MenuItem[]>([]);
}
