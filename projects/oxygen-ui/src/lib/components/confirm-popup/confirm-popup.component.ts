import { 
  Component, 
  input, 
  output, 
  signal, 
  ChangeDetectionStrategy, 
  ViewEncapsulation, 
  ElementRef, 
  ViewChild, 
  ChangeDetectorRef, 
  inject 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'ox-confirm-popup',
  standalone: true,
  imports: [CommonModule, OverlayModule, ButtonComponent],
  template: `
    <div #targetOrigin class="ox-confirm-popup-target" (click)="toggle()">
      <ng-content select="[oxTarget]"></ng-content>
    </div>

    <ng-template 
      cdkConnectedOverlay 
      [cdkConnectedOverlayOrigin]="targetOrigin" 
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayOffsetY]="8"
      (overlayOutsideClick)="reject()">
      <div class="ox-confirm-popup-panel ox-elevation-3">
        <div class="ox-confirm-popup-header">
          <span class="ox-confirm-popup-icon">{{ icon() }}</span>
          <span class="ox-confirm-popup-message">{{ message() }}</span>
        </div>
        <div class="ox-confirm-popup-footer">
          <ox-button size="sm" variant="ghost-secondary" (click)="reject()">
            {{ rejectLabel() }}
          </ox-button>
          <ox-button size="sm" [variant]="acceptVariant()" (click)="accept()">
            {{ acceptLabel() }}
          </ox-button>
        </div>
      </div>
    </ng-template>
  `,
  styleUrl: './confirm-popup.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmPopupComponent {
  @ViewChild('targetOrigin') targetOrigin!: ElementRef;

  message = input<string>('Are you sure you want to proceed?');
  icon = input<string>('⚠️');
  acceptLabel = input<string>('Yes');
  rejectLabel = input<string>('No');
  acceptVariant = input<any>('primary');

  onAccept = output<void>();
  onReject = output<void>();

  isOpen = signal(false);
  private cdr = inject(ChangeDetectorRef);

  toggle() {
    if (this.isOpen()) {
      this.reject();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen.set(true);
    this.cdr.markForCheck();
  }

  accept() {
    this.isOpen.set(false);
    this.onAccept.emit();
    this.cdr.markForCheck();
  }

  reject() {
    if (this.isOpen()) {
      this.isOpen.set(false);
      this.onReject.emit();
      this.cdr.markForCheck();
    }
  }
}
