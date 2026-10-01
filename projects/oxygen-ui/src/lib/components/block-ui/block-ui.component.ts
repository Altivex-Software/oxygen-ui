import { Component, input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';

@Component({
  selector: 'ox-block-ui',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerComponent],
  template: `
    <div class="ox-block-ui-container" [class.ox-block-ui-blocked]="blocked()">
      <ng-content></ng-content>
      
      @if (blocked()) {
        <div class="ox-block-ui-overlay">
          <div class="ox-block-ui-content">
            @if (message()) {
              <span class="ox-block-ui-message">{{ message() }}</span>
            } @else {
              <ox-progress-spinner size="3rem"></ox-progress-spinner>
            }
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './block-ui.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockUIComponent {
  blocked = input<boolean>(false);
  message = input<string>();
}
