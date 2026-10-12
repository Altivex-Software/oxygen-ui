import {
  Component,
  input,
  output,
  model,
  signal,
  computed,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef,
  ContentChild,
  forwardRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { ValIconName } from '../icon/icon.types';
import {
  TreeNode,
  TreeSelectionMode,
  TreeFilterMode,
  TreeNodeSelectEvent,
  TreeNodeExpandEvent,
  TreeNodeCollapseEvent
} from './tree.types';

@Component({
  selector: 'val-tree-node',
  standalone: true,
  imports: [CommonModule, IconComponent, forwardRef(() => TreeNodeComponent)],
  template: `
    <li class="val-treenode" [class.val-treenode-leaf]="isLeaf()">
      <div 
        class="val-treenode-content"
        [class.val-treenode-selected]="isSelected()"
        [class.val-treenode-disabled]="node().disabled"
        (click)="onNodeClick($event)">
        
        <!-- Toggler Icon -->
        <span 
          class="val-treenode-toggler"
          [class.val-treenode-toggler-expanded]="node().expanded"
          [class.val-treenode-toggler-empty]="isLeaf()"
          (click)="onTogglerClick($event)">
          @if (!isLeaf()) {
            <val-icon name="chevron-right" size="0.875rem"></val-icon>
          }
        </span>

        <!-- Checkbox if selectionMode === 'checkbox' -->
        @if (tree().selectionMode() === 'checkbox') {
          <div 
            class="val-treenode-checkbox"
            [class.val-treenode-checkbox-checked]="isCheckboxChecked()"
            [class.val-treenode-checkbox-partial]="isCheckboxPartial()"
            (click)="onCheckboxClick($event)">
            @if (isCheckboxChecked()) {
              <val-icon name="check" size="0.75rem"></val-icon>
            } @else if (isCheckboxPartial()) {
              <span class="val-treenode-checkbox-indeterminate"></span>
            }
          </div>
        }

        <!-- Node Icon -->
        @if (nodeIcon()) {
          <span class="val-treenode-icon">
            <val-icon [name]="$any(nodeIcon()!)" size="1.125rem"></val-icon>
          </span>
        }

        <!-- Node Label or Custom Template -->
        <div class="val-treenode-label">
          @if (tree().nodeTemplate) {
            <ng-container *ngTemplateOutlet="tree().nodeTemplate!; context: { $implicit: node() }"></ng-container>
          } @else {
            {{ node().label }}
          }
        </div>
      </div>

      <!-- Children -->
      @if (!isLeaf() && node().expanded && node().children && node().children!.length > 0) {
        <ul class="val-tree-children" [class.val-tree-lines]="tree().showLines()">
          @for (child of node().children; track child.key || child.label) {
            @if (tree().isNodeVisible(child)) {
              <val-tree-node 
                [node]="child" 
                [tree]="tree()"
                [parent]="node()">
              </val-tree-node>
            }
          }
        </ul>
      }
    </li>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TreeNodeComponent {
  node = input.required<TreeNode>();
  tree = input.required<TreeComponent>();
  parent = input<TreeNode | null>(null);

  isLeaf = computed(() => {
    const n = this.node();
    if (n.leaf !== undefined) return n.leaf;
    return !n.children || n.children.length === 0;
  });

  nodeIcon = computed<ValIconName | string | undefined>(() => {
    const n = this.node();
    if (n.expanded && n.expandedIcon) return n.expandedIcon;
    if (!n.expanded && n.collapsedIcon) return n.collapsedIcon;
    return n.icon;
  });

  isSelected = computed(() => {
    const parentTree = this.tree();
    const sel = parentTree.selection();
    const mode = parentTree.selectionMode();
    const n = this.node();

    if (!sel) return false;
    if (mode === 'single') {
      return parentTree.areNodesEqual(sel, n);
    }
    if (mode === 'multiple') {
      return Array.isArray(sel) && sel.some(item => parentTree.areNodesEqual(item, n));
    }
    return false;
  });

  isCheckboxChecked = computed(() => {
    const parentTree = this.tree();
    if (parentTree.selectionMode() !== 'checkbox') return false;
    const sel = parentTree.selection();
    const n = this.node();
    if (!sel) return false;
    if (Array.isArray(sel)) {
      return sel.some(item => parentTree.areNodesEqual(item, n));
    }
    return parentTree.areNodesEqual(sel, n);
  });

  isCheckboxPartial = computed(() => {
    if (this.tree().selectionMode() !== 'checkbox') return false;
    const n = this.node();
    return !!n.partialSelected;
  });

  onTogglerClick(event: MouseEvent) {
    event.stopPropagation();
    if (this.isLeaf() || this.node().disabled) return;
    this.tree().toggleNode(this.node(), event);
  }

  onNodeClick(event: MouseEvent) {
    if (this.node().disabled) return;
    if (this.tree().selectionMode() === 'checkbox') {
      this.onCheckboxClick(event);
      return;
    }
    this.tree().handleNodeClick(this.node(), event);
  }

  onCheckboxClick(event: MouseEvent) {
    event.stopPropagation();
    if (this.node().disabled) return;
    this.tree().handleCheckboxToggle(this.node(), event);
  }
}

@Component({
  selector: 'val-tree',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, TreeNodeComponent],
  template: `
    <div 
      class="val-tree" 
      [class.val-tree-bordered]="bordered()"
      [class.val-tree-scrollable]="scrollHeight() !== null"
      [style.maxHeight]="scrollHeight()">
      
      <!-- Filter Header -->
      @if (filter()) {
        <div class="val-tree-header">
          <div class="val-tree-filter-wrapper">
            <val-icon name="search" size="1rem" class="val-tree-filter-icon"></val-icon>
            <input 
              type="text" 
              class="val-tree-filter-input"
              [placeholder]="filterPlaceholder()"
              [ngModel]="filterQuery()"
              (ngModelChange)="onFilterChange($event)">
            
            @if (filterQuery()) {
              <button type="button" class="val-tree-filter-clear" (click)="clearFilter()">
                <val-icon name="x" size="0.875rem"></val-icon>
              </button>
            }
          </div>

          <div class="val-tree-actions">
            <button 
              type="button" 
              class="val-tree-filter-clear" 
              title="Expandir todo"
              (click)="expandAll()">
              <val-icon name="chevron-down" size="1rem"></val-icon>
            </button>
            <button 
              type="button" 
              class="val-tree-filter-clear" 
              title="Colapsar todo"
              (click)="collapseAll()">
              <val-icon name="chevron-up" size="1rem"></val-icon>
            </button>
          </div>
        </div>
      }

      <!-- Tree Content -->
      @if (hasVisibleNodes()) {
        <ul class="val-tree-container" [class.val-tree-lines]="showLines()">
          @for (node of value(); track node.key || node.label) {
            @if (isNodeVisible(node)) {
              <val-tree-node 
                [node]="node" 
                [tree]="this">
              </val-tree-node>
            }
          }
        </ul>
      } @else {
        <div class="val-tree-empty">
          <val-icon name="folder" size="2rem"></val-icon>
          <span>{{ emptyMessage() }}</span>
        </div>
      }
    </div>
  `,
  styleUrls: ['./tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TreeComponent {
  value = input<TreeNode[]>([]);
  selectionMode = input<TreeSelectionMode>('single');
  selection = model<any>(null);
  
  filter = input<boolean>(false);
  filterBy = input<string>('label');
  filterPlaceholder = input<string>('Buscar...');
  filterMode = input<TreeFilterMode>('lenient');
  showLines = input<boolean>(false);
  scrollHeight = input<string | null>(null);
  emptyMessage = input<string>('No se encontraron elementos');
  bordered = input<boolean>(true);

  nodeSelect = output<TreeNodeSelectEvent>();
  nodeUnselect = output<TreeNodeSelectEvent>();
  nodeExpand = output<TreeNodeExpandEvent>();
  nodeCollapse = output<TreeNodeCollapseEvent>();
  selectionChange = output<any>();

  @ContentChild('nodeTemplate', { static: false }) nodeTemplate?: TemplateRef<any>;

  filterQuery = signal<string>('');

  onFilterChange(query: string) {
    this.filterQuery.set(query || '');
    if (query && query.trim().length > 0) {
      this.expandMatchingNodes(this.value(), query.trim().toLowerCase());
    }
  }

  clearFilter() {
    this.filterQuery.set('');
  }

  isNodeVisible(node: TreeNode): boolean {
    const q = this.filterQuery().trim().toLowerCase();
    if (!q) return true;
    return this.checkNodeMatch(node, q);
  }

  private checkNodeMatch(node: TreeNode, query: string): boolean {
    const labelMatch = (node.label || '').toLowerCase().includes(query);
    if (labelMatch) return true;

    if (node.children && node.children.length > 0) {
      return node.children.some(child => this.checkNodeMatch(child, query));
    }
    return false;
  }

  private expandMatchingNodes(nodes: TreeNode[], query: string): boolean {
    let hasMatch = false;
    for (const node of nodes) {
      const matchSelf = (node.label || '').toLowerCase().includes(query);
      let matchChild = false;
      if (node.children && node.children.length > 0) {
        matchChild = this.expandMatchingNodes(node.children, query);
      }

      if (matchSelf || matchChild) {
        node.expanded = true;
        hasMatch = true;
      }
    }
    return hasMatch;
  }

  hasVisibleNodes = computed(() => {
    const val = this.value();
    if (!val || val.length === 0) return false;
    return val.some(node => this.isNodeVisible(node));
  });

  toggleNode(node: TreeNode, originalEvent: Event) {
    node.expanded = !node.expanded;
    if (node.expanded) {
      this.nodeExpand.emit({ originalEvent, node });
    } else {
      this.nodeCollapse.emit({ originalEvent, node });
    }
  }

  handleNodeClick(node: TreeNode, originalEvent: Event) {
    if (node.selectable === false) return;

    const mode = this.selectionMode();
    const current = this.selection();

    if (mode === 'single') {
      const isSelected = this.areNodesEqual(current, node);
      if (isSelected) {
        this.selection.set(null);
        this.nodeUnselect.emit({ originalEvent, node });
      } else {
        this.selection.set(node);
        this.nodeSelect.emit({ originalEvent, node });
      }
      this.selectionChange.emit(this.selection());
    } else if (mode === 'multiple') {
      let list: TreeNode[] = Array.isArray(current) ? [...current] : [];
      const index = list.findIndex(n => this.areNodesEqual(n, node));

      if (index > -1) {
        list.splice(index, 1);
        this.selection.set(list);
        this.nodeUnselect.emit({ originalEvent, node });
      } else {
        list.push(node);
        this.selection.set(list);
        this.nodeSelect.emit({ originalEvent, node });
      }
      this.selectionChange.emit(this.selection());
    }
  }

  handleCheckboxToggle(node: TreeNode, originalEvent: Event) {
    if (node.selectable === false) return;

    let selectedNodes: TreeNode[] = Array.isArray(this.selection()) ? [...this.selection()] : [];
    const isCurrentlyChecked = selectedNodes.some(n => this.areNodesEqual(n, node));

    if (isCurrentlyChecked) {
      this.uncheckNodeAndChildren(node, selectedNodes);
      this.nodeUnselect.emit({ originalEvent, node });
    } else {
      this.checkNodeAndChildren(node, selectedNodes);
      this.nodeSelect.emit({ originalEvent, node });
    }

    this.updatePartialSelection(this.value(), selectedNodes);
    this.selection.set(selectedNodes);
    this.selectionChange.emit(selectedNodes);
  }

  private checkNodeAndChildren(node: TreeNode, selectedList: TreeNode[]) {
    if (!selectedList.some(n => this.areNodesEqual(n, node))) {
      selectedList.push(node);
    }
    node.partialSelected = false;

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        this.checkNodeAndChildren(child, selectedList);
      }
    }
  }

  private uncheckNodeAndChildren(node: TreeNode, selectedList: TreeNode[]) {
    const index = selectedList.findIndex(n => this.areNodesEqual(n, node));
    if (index > -1) {
      selectedList.splice(index, 1);
    }
    node.partialSelected = false;

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        this.uncheckNodeAndChildren(child, selectedList);
      }
    }
  }

  private updatePartialSelection(nodes: TreeNode[], selectedList: TreeNode[]) {
    for (const node of nodes) {
      if (node.children && node.children.length > 0) {
        this.updatePartialSelection(node.children, selectedList);

        const totalChildren = node.children.length;
        const checkedChildren = node.children.filter(child => 
          selectedList.some(n => this.areNodesEqual(n, child))
        ).length;
        const partialChildren = node.children.some(child => child.partialSelected);

        const isNodeChecked = selectedList.some(n => this.areNodesEqual(n, node));

        if (checkedChildren === totalChildren) {
          node.partialSelected = false;
          if (!isNodeChecked) {
            selectedList.push(node);
          }
        } else if (checkedChildren > 0 || partialChildren) {
          node.partialSelected = true;
          const nodeIdx = selectedList.findIndex(n => this.areNodesEqual(n, node));
          if (nodeIdx > -1) selectedList.splice(nodeIdx, 1);
        } else {
          node.partialSelected = false;
          const nodeIdx = selectedList.findIndex(n => this.areNodesEqual(n, node));
          if (nodeIdx > -1) selectedList.splice(nodeIdx, 1);
        }
      }
    }
  }

  areNodesEqual(node1: any, node2: any): boolean {
    if (!node1 || !node2) return false;
    if (node1.key && node2.key) return node1.key === node2.key;
    return node1 === node2 || (node1.label === node2.label && node1.data === node2.data);
  }

  expandAll() {
    this.setExpandedRecursive(this.value(), true);
  }

  collapseAll() {
    this.setExpandedRecursive(this.value(), false);
  }

  private setExpandedRecursive(nodes: TreeNode[], expanded: boolean) {
    if (!nodes) return;
    for (const node of nodes) {
      node.expanded = expanded;
      if (node.children && node.children.length > 0) {
        this.setExpandedRecursive(node.children, expanded);
      }
    }
  }
}
