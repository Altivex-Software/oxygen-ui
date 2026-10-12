import { Component, input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { ValIconName } from '../icon/icon.types';

export interface TimelineItem {
  status: string;
  date?: string;
  icon?: ValIconName | string;
  color?: string;
  description?: string;
}

@Component({
  selector: 'val-timeline',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="val-timeline" [class.val-timeline-horizontal]="layout() === 'horizontal'">
      @for (item of value(); track $index) {
        <div class="val-timeline-event">
          <div class="val-timeline-event-opposite">
            <span class="val-timeline-date">{{ item.date }}</span>
          </div>

          <div class="val-timeline-event-separator">
            <div 
              class="val-timeline-event-marker" 
              [style.background-color]="item.color || '#3b82f6'">
              @if (item.icon) {
                <span class="val-timeline-icon">
                  <val-icon [name]="$any(item.icon)" size="xs" color="white"></val-icon>
                </span>
              }
            </div>
            @if (!$last) {
              <div class="val-timeline-event-connector"></div>
            }
          </div>

          <div class="val-timeline-event-content">
            <div class="val-timeline-status">{{ item.status }}</div>
            @if (item.description) {
              <div class="val-timeline-description">{{ item.description }}</div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './timeline.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent {
  value = input<TimelineItem[]>([]);
  layout = input<'vertical' | 'horizontal'>('vertical');
}
