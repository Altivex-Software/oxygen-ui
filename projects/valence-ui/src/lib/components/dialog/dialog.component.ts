import { Component, EventEmitter, Input, Output, ViewEncapsulation, ChangeDetectionStrategy, model, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { IconComponent } from '../icon/icon.component';

let dialogId = 0;

@Component({
  selector: 'ox-dialog',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    @if (visible()) {
      <div class="ox-dialog-mask" (click)="onMaskClick($event)">
        <div 
          class="ox-dialog ox-elevation-4" 
          role="dialog"
          aria-modal="true"
          [attr.aria-labelledby]="header ? titleId : null"
          [style.width]="width"
          [@dialogAnim]
          (click)="$event.stopPropagation()">
          
          <div class="ox-dialog-header">
            <span class="ox-dialog-title" [id]="titleId">{{ header }}</span>
            <button class="ox-dialog-close" type="button" (click)="close()" aria-label="Cerrar diálogo">
              <ox-icon name="x" size="1.125rem"></ox-icon>
            </button>
          </div>
          
          <div class="ox-dialog-content">
            <ng-content></ng-content>
          </div>
          
          @if (hasFooter) {
            <div class="ox-dialog-footer">
              <ng-content select="ox-footer"></ng-content>
            </div>
          }
        </div>
      </div>
    }
  `,
  styleUrl: './dialog.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('dialogAnim', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('0.2s cubic-bezier(0, 0, 0.2, 1)', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.1s ease-in', style({ transform: 'scale(0.95)', opacity: 0 }))
      ])
    ])
  ]
})
export class DialogComponent {
  visible = model<boolean>(false);
  @Input() header: string = '';
  @Input() width: string = '50vw';
  @Input() dismissableMask: boolean = true;
  @Input() closeOnEscape: boolean = true;
  @Input() hasFooter: boolean = false;

  titleId = `ox-dialog-title-${dialogId++}`;

  @Output() onHide = new EventEmitter<void>();

  @HostListener('window:keydown.escape', ['$event'])
  onEscapePressed(event: any) {
    if (this.visible() && this.closeOnEscape) {
      if (event?.preventDefault) {
        event.preventDefault();
      }
      this.close();
    }
  }

  close() {
    this.visible.set(false);
    this.onHide.emit();
  }

  onMaskClick(event: MouseEvent) {
    if (this.dismissableMask) {
      this.close();
    }
  }
}
