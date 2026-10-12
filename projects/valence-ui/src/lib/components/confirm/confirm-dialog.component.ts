import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { ButtonComponent } from '../button/button.component';
import { Confirmation, ValConfirmService } from '../../services/confirm.service';

@Component({
  selector: 'val-confirm-dialog',
  standalone: true,
  imports: [CommonModule, DialogComponent, ButtonComponent],
  template: `
    <val-dialog 
      [(visible)]="visible" 
      [header]="confirmation?.header || 'Confirmar'" 
      [width]="width()">
      
      <div class="val-flex val-align-items-center val-gap-4 val-py-4">
        <span class="val-text-center">{{ confirmation?.message || '¿Está seguro de continuar?' }}</span>
      </div>

      <ng-template #footer>
        <div class="val-flex val-justify-content-end val-gap-2">
          <val-button 
            variant="outline-primary" 
            [label]="confirmation?.rejectLabel || 'No'" 
            (onClick)="reject()">
          </val-button>
          <val-button 
            [label]="confirmation?.acceptLabel || 'Sí'" 
            (onClick)="accept()">
          </val-button>
        </div>
      </ng-template>
    </val-dialog>
  `
})
export class ConfirmDialogComponent implements OnInit, OnDestroy {
  /**
   * Optional key to support multiple confirm dialogs.
   */
  key = input<string>();
  
  /**
   * Width of the dialog.
   */
  width = input<string>('400px');

  visible = false;
  confirmation: Confirmation | null = null;
  private subscription?: Subscription;

  constructor(private confirmService: ValConfirmService) {}

  ngOnInit() {
    this.subscription = this.confirmService.requireConfirmation$.subscribe(conf => {
      // If there is no message, it means close request.
      if (!conf || !conf.message) {
        this.hide();
        return;
      }
      
      if (conf.key === this.key()) {
        this.confirmation = conf;
        this.visible = true;
      }
    });
  }

  accept() {
    if (this.confirmation?.accept) {
      this.confirmation.accept();
    }
    this.hide();
  }

  reject() {
    if (this.confirmation?.reject) {
      this.confirmation.reject();
    }
    this.hide();
  }

  hide() {
    this.visible = false;
    this.confirmation = null;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
