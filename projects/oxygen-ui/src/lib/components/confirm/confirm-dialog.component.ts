import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { ButtonComponent } from '../button/button.component';
import { Confirmation, OxConfirmService } from '../../services/confirm.service';

@Component({
  selector: 'ox-confirm-dialog',
  standalone: true,
  imports: [CommonModule, DialogComponent, ButtonComponent],
  template: `
    <ox-dialog 
      [(visible)]="visible" 
      [header]="confirmation?.header || 'Confirmar'" 
      [width]="width()">
      
      <div class="ox-flex ox-align-items-center ox-gap-4 ox-py-4">
        <span class="ox-text-center">{{ confirmation?.message || '¿Está seguro de continuar?' }}</span>
      </div>

      <ng-template #footer>
        <div class="ox-flex ox-justify-content-end ox-gap-2">
          <ox-button 
            variant="outline-primary" 
            [label]="confirmation?.rejectLabel || 'No'" 
            (onClick)="reject()">
          </ox-button>
          <ox-button 
            [label]="confirmation?.acceptLabel || 'Sí'" 
            (onClick)="accept()">
          </ox-button>
        </div>
      </ng-template>
    </ox-dialog>
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

  constructor(private confirmService: OxConfirmService) {}

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
