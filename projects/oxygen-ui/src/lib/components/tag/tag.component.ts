import { Component, input, output, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TagSeverity = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

@Component({
  selector: 'ox-tag',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      class="ox-tag"
      [class.ox-tag-rounded]="rounded()"
      [class]="'ox-tag-' + severity()">
      
      @if (icon()) {
        <span class="ox-tag-icon">{{ icon() }}</span>
      }

      <span class="ox-tag-value">{{ value() }}</span>

      @if (removable()) {
        <span class="ox-tag-remove" (click)="onRemoveClick($event)">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
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
  icon = input<string>();
  rounded = input<boolean>(false);
  removable = input<boolean>(false);

  onRemove = output<MouseEvent>();

  onRemoveClick(event: MouseEvent) {
    event.stopPropagation();
    this.onRemove.emit(event);
  }
}
