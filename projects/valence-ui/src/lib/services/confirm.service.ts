import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Confirmation {
  header?: string;
  message?: string;
  acceptLabel?: string;
  rejectLabel?: string;
  accept?: () => void;
  reject?: () => void;
  key?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OxConfirmService {
  private requireConfirmationSource = new Subject<Confirmation>();
  private acceptConfirmationSource = new Subject<Confirmation>();

  requireConfirmation$ = this.requireConfirmationSource.asObservable();
  accept$ = this.acceptConfirmationSource.asObservable();

  /**
   * Prompts the user with a confirmation dialog.
   */
  ask(confirmation: Confirmation) {
    this.requireConfirmationSource.next(confirmation);
  }

  /**
   * Closes the dialog programmatically.
   */
  close() {
    this.requireConfirmationSource.next({} as Confirmation);
  }
}
