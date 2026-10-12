import { InjectionToken } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';

export interface ValFormFieldControl<T = any> {
  value: T | null;
  readonly stateChanges?: Observable<void>;
  readonly id: string;
  readonly placeholder?: string;
  readonly ngControl: NgControl | null;
  readonly focused: boolean;
  readonly empty: boolean;
  readonly required?: boolean;
  readonly disabled: boolean;
  readonly errorState: boolean;
  setDescribedByIds?(ids: string[]): void;
  onContainerClick?(event: MouseEvent): void;
}

export const VAL_FORM_FIELD_CONTROL = new InjectionToken<ValFormFieldControl>('VAL_FORM_FIELD_CONTROL');
