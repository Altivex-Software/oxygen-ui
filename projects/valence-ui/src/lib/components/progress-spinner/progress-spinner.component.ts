import { Component, input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProgressSpinnerSeverity = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

@Component({
  selector: 'val-progress-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="val-progress-spinner"
      [class]="'val-progress-spinner-' + severity()"
      [style.width]="size()"
      [style.height]="size()">
      <svg class="val-progress-spinner-svg" viewBox="25 25 50 50">
        <circle 
          class="val-progress-spinner-circle" 
          cx="50" 
          cy="50" 
          r="20" 
          fill="none" 
          [style.stroke-width]="strokeWidth()">
        </circle>
      </svg>
    </div>
  `,
  styleUrl: './progress-spinner.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressSpinnerComponent {
  size = input<string>('2.5rem');
  strokeWidth = input<string>('4');
  severity = input<ProgressSpinnerSeverity>('primary');
}
