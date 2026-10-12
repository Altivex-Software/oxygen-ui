import { Subject, Observable } from 'rxjs';

export class DynamicDialogRef<T = any> {
  private readonly _afterClosed = new Subject<T | undefined>();
  private readonly _onDestroy = new Subject<void>();

  onClose: Observable<T | undefined> = this._afterClosed.asObservable();
  onDestroy: Observable<void> = this._onDestroy.asObservable();

  close(result?: T): void {
    this._afterClosed.next(result);
    this._afterClosed.complete();
  }

  destroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
