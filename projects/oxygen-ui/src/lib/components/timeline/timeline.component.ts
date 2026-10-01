import { Component, input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TimelineItem {
  status: string;
  date?: string;
  icon?: string;
  color?: string;
  description?: string;
}

@Component({
  selector: 'ox-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ox-timeline" [class.ox-timeline-horizontal]="layout() === 'horizontal'">
      @for (item of value(); track $index) {
        <div class="ox-timeline-event">
          <div class="ox-timeline-event-opposite">
            <span class="ox-timeline-date">{{ item.date }}</span>
          </div>

          <div class="ox-timeline-event-separator">
            <div 
              class="ox-timeline-event-marker" 
              [style.background-color]="item.color || '#3b82f6'">
              @if (item.icon) {
                <span class="ox-timeline-icon">{{ item.icon }}</span>
              }
            </div>
            @if (!$last) {
              <div class="ox-timeline-event-connector"></div>
            }
          </div>

          <div class="ox-timeline-event-content">
            <div class="ox-timeline-status">{{ item.status }}</div>
            @if (item.description) {
              <div class="ox-timeline-description">{{ item.description }}</div>
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
