import { ValIconName } from '../icon/icon.types';
import { ValenceSeverity, ValenceColor } from '../../lib-core';

export interface PanelMenuItem {
  label?: string;
  icon?: ValIconName | string;
  routerLink?: any;
  url?: string;
  target?: string;
  items?: PanelMenuItem[];
  expanded?: boolean;
  disabled?: boolean;
  badge?: string;
  badgeSeverity?: ValenceSeverity | ValenceColor;
  command?: (event: { originalEvent: Event; item: PanelMenuItem }) => void;
  styleClass?: string;
  separator?: boolean;
}
