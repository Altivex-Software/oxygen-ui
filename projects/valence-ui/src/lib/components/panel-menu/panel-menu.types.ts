import { OxIconName } from '../icon/icon.types';
import { OxygenSeverity, OxygenColor } from '../../lib-core';

export interface PanelMenuItem {
  label?: string;
  icon?: OxIconName | string;
  routerLink?: any;
  url?: string;
  target?: string;
  items?: PanelMenuItem[];
  expanded?: boolean;
  disabled?: boolean;
  badge?: string;
  badgeSeverity?: OxygenSeverity | OxygenColor;
  command?: (event: { originalEvent: Event; item: PanelMenuItem }) => void;
  styleClass?: string;
  separator?: boolean;
}
