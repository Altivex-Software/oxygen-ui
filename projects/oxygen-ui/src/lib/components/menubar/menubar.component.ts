import { Component, input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { OxIconName } from '../icon/icon.types';

export interface MenuItem {
  label?: string;
  icon?: OxIconName | string;
  routerLink?: string;
  items?: MenuItem[];
  separator?: boolean;
}

@Component({
  selector: 'ox-menubar',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <nav class="ox-menubar ox-elevation-1">
      <div class="ox-menubar-start">
        <ng-content select="[start]"></ng-content>
      </div>
      
      <ul class="ox-menubar-root-list">
        @for (item of model(); track item.label) {
          @if (item.separator) {
            <li class="ox-menubar-separator"></li>
          } @else {
            <li class="ox-menubar-item" [class.ox-menubar-item-has-children]="item.items">
              <a 
                [routerLink]="item.routerLink" 
                class="ox-menubar-item-link">
                @if (item.icon) {
                  <ox-icon [name]="$any(item.icon)" size="1rem" class="ox-menubar-item-icon"></ox-icon>
                }
                <span class="ox-menubar-item-label">{{ item.label }}</span>
                @if (item.items) {
                  <ox-icon name="chevron-down" size="0.75rem" class="ox-menubar-submenu-icon"></ox-icon>
                }
              </a>
              
              @if (item.items) {
                <ul class="ox-menubar-submenu">
                  @for (subitem of item.items; track subitem.label) {
                    <li class="ox-menubar-item">
                      <a [routerLink]="subitem.routerLink" class="ox-menubar-item-link">
                        @if (subitem.icon) {
                          <ox-icon [name]="$any(subitem.icon)" size="1rem" class="ox-menubar-item-icon"></ox-icon>
                        }
                        <span class="ox-menubar-item-label">{{ subitem.label }}</span>
                      </a>
                    </li>
                  }
                </ul>
              }
            </li>
          }
        }
      </ul>

      <div class="ox-menubar-end">
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
