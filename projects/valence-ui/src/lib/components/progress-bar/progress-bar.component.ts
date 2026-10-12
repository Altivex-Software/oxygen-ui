import { Component, input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProgressBarMode = 'determinate' | 'indeterminate';
export type ProgressBarSeverity = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

@Component({
  selector: 'val-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="val-progress-bar"
      [class.val-progress-bar-indeterminate]="mode() === 'indeterminate'"
      [class]="'val-progress-bar-' + severity()">
      
      <div 
        class="val-progress-bar-value"
        [style.width.%]="mode() === 'determinate' ? value() : null">
        @if (showValue() && mode() === 'determinate') {
          <span class="val-progress-bar-label">{{ value() }}%</span>
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
