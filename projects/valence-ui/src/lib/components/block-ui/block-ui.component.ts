import { Component, input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';

@Component({
  selector: 'val-block-ui',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerComponent],
  template: `
    <div class="val-block-ui-container" [class.val-block-ui-blocked]="blocked()">
      <ng-content></ng-content>
      
      @if (blocked()) {
        <div class="val-block-ui-overlay">
          <div class="val-block-ui-content">
            @if (message()) {
              <span class="val-block-ui-message">{{ message() }}</span>
            } @else {
              <val-progress-spinner size="3rem"></val-progress-spinner>
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
