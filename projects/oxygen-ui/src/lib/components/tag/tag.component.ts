import { Component, input, output, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { OxIconName } from '../icon/icon.types';

export type TagSeverity = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

@Component({
  selector: 'ox-tag',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <span 
      class="ox-tag"
      [class.ox-tag-rounded]="rounded()"
      [class]="'ox-tag-' + severity()">
      
      @if (icon()) {
        <ox-icon [name]="$any(icon()!)" size="0.75rem" class="ox-tag-icon"></ox-icon>
      }

      <span class="ox-tag-value">{{ value() }}</span>

      @if (removable()) {
        <span class="ox-tag-remove" (click)="onRemoveClick($event)">
          <ox-icon name="x" size="0.75rem"></ox-icon>
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
  icon = input<OxIconName | string>();
  rounded = input<boolean>(false);
  removable = input<boolean>(false);

  onRemove = output<MouseEvent>();

  onRemoveClick(event: MouseEvent) {
    event.stopPropagation();
    this.onRemove.emit(event);
  }
}
