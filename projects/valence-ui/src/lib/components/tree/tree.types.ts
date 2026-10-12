import { TemplateRef } from '@angular/core';
import { ValIconName } from '../icon/icon.types';

export interface TreeNode<T = any> {
  key?: string;
  label: string;
  data?: T;
  icon?: ValIconName | string;
  expandedIcon?: ValIconName | string;
  collapsedIcon?: ValIconName | string;
  children?: TreeNode<T>[];
  leaf?: boolean;
  expanded?: boolean;
  selectable?: boolean;
  disabled?: boolean;
  styleClass?: string;
  parent?: TreeNode<T>;
  partialSelected?: boolean;
}

export type TreeSelectionMode = 'single' | 'multiple' | 'checkbox';

export type TreeFilterMode = 'lenient' | 'strict';

export interface TreeNodeSelectEvent<T = any> {
  originalEvent: Event;
  node: TreeNode<T>;
}

export interface TreeNodeExpandEvent<T = any> {
  originalEvent: Event;
  node: TreeNode<T>;
}

export interface TreeNodeCollapseEvent<T = any> {
  originalEvent: Event;
  node: TreeNode<T>;
}
