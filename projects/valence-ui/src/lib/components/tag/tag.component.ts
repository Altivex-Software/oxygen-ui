import { Component, input, output, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { ValIconName } from '../icon/icon.types';

export type TagSeverity = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

@Component({
  selector: 'val-tag',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <span 
      class="val-tag"
      [class.val-tag-rounded]="rounded()"
      [class]="'val-tag-' + severity()">
      
      @if (icon()) {
        <val-icon [name]="$any(icon()!)" size="0.75rem" class="val-tag-icon"></val-icon>
      }

      <span class="val-tag-value">{{ value() }}</span>

      @if (removable()) {
        <span class="val-tag-remove" (click)="onRemoveClick($event)">
          <val-icon name="x" size="0.75rem"></val-icon>
        </span>
      }
    </span>
  `,
  styleUrl: './tag.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent {
  value = input<string>('');
  severity = input<TagSeverity>('primary');
  icon = input<ValIconName | string>();
  rounded = input<boolean>(false);
  removable = input<boolean>(false);

  onRemove = output<MouseEvent>();

  onRemoveClick(event: MouseEvent) {
    event.stopPropagation();
    this.onRemove.emit(event);
  }
}
