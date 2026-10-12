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
import { IconComponent } from '../icon/icon.component';
import { ValIconName } from '../icon/icon.types';

@Component({
  selector: 'val-confirm-popup',
  standalone: true,
  imports: [CommonModule, OverlayModule, ButtonComponent, IconComponent],
  template: `
    <div #targetOrigin class="val-confirm-popup-target" (click)="toggle()">
      <ng-content select="[valTarget]"></ng-content>
    </div>

    <ng-template 
      cdkConnectedOverlay 
      [cdkConnectedOverlayOrigin]="targetOrigin" 
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayOffsetY]="8"
      (overlayOutsideClick)="reject()">
      <div class="val-confirm-popup-panel val-elevation-3">
        <div class="val-confirm-popup-header">
          <span class="val-confirm-popup-icon">
            <val-icon [name]="$any(icon())" size="md" color="warning"></val-icon>
          </span>
          <span class="val-confirm-popup-message">{{ message() }}</span>
        </div>
        <div class="val-confirm-popup-footer">
          <val-button size="sm" variant="ghost-secondary" (click)="reject()">
            {{ rejectLabel() }}
          </val-button>
          <val-button size="sm" [variant]="acceptVariant()" (click)="accept()">
            {{ acceptLabel() }}
          </val-button>
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
  icon = input<ValIconName | string>('alert-triangle');
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
