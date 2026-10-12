import { OxIconName } from '../icon/icon.types';
import { OxygenSeverity, OxygenColor } from '../../lib-core';

export interface MegaMenuSubItem {
  label: string;
  icon?: OxIconName | string;
  routerLink?: any;
  url?: string;
  target?: string;
  badge?: string;
  badgeSeverity?: OxygenSeverity | OxygenColor;
  description?: string;
  disabled?: boolean;
  command?: (event: { originalEvent: Event; item: MegaMenuSubItem }) => void;
}

export interface MegaMenuColumn {
  label?: string;
  icon?: OxIconName | string;
  items?: MegaMenuSubItem[];
}

export interface MegaMenuItem {
  label?: string;
  icon?: OxIconName | string;
  routerLink?: any;
  url?: string;
  target?: string;
  items?: MegaMenuColumn[][];
  disabled?: boolean;
  badge?: string;
  badgeSeverity?: OxygenSeverity | OxygenColor;
  command?: (event: { originalEvent: Event; item: MegaMenuItem }) => void;
  styleClass?: string;
  separator?: boolean;
}
