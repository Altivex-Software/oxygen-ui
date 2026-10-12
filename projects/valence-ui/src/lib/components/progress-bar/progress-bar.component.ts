import { Component, input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProgressBarMode = 'determinate' | 'indeterminate';
export type ProgressBarSeverity = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

@Component({
  selector: 'ox-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="ox-progress-bar"
      [class.ox-progress-bar-indeterminate]="mode() === 'indeterminate'"
      [class]="'ox-progress-bar-' + severity()">
      
      <div 
        class="ox-progress-bar-value"
        [style.width.%]="mode() === 'determinate' ? value() : null">
        @if (showValue() && mode() === 'determinate') {
          <span class="ox-progress-bar-label">{{ value() }}%</span>
        }
      </div>
    </div>
  `,
  styleUrl: './progress-bar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
  value = input<number>(0);
  mode = input<ProgressBarMode>('determinate');
  severity = input<ProgressBarSeverity>('primary');
  showValue = input<boolean>(true);
}
