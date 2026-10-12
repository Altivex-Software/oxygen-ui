import { ValIconName } from '../icon/icon.types';
import { ValenceSeverity, ValenceColor } from '../../lib-core';

export interface MegaMenuSubItem {
  label: string;
  icon?: ValIconName | string;
  routerLink?: any;
  url?: string;
  target?: string;
  badge?: string;
  badgeSeverity?: ValenceSeverity | ValenceColor;
  description?: string;
  disabled?: boolean;
  command?: (event: { originalEvent: Event; item: MegaMenuSubItem }) => void;
}

export interface MegaMenuColumn {
  label?: string;
  icon?: ValIconName | string;
  items?: MegaMenuSubItem[];
}

export interface MegaMenuItem {
  label?: string;
  icon?: ValIconName | string;
  routerLink?: any;
  url?: string;
  target?: string;
  items?: MegaMenuColumn[][];
  disabled?: boolean;
  badge?: string;
  badgeSeverity?: ValenceSeverity | ValenceColor;
  command?: (event: { originalEvent: Event; item: MegaMenuItem }) => void;
  styleClass?: string;
  separator?: boolean;
}
