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
import { OxIconName } from '../icon/icon.types';
import {
  TreeNode,
  TreeSelectionMode,
  TreeFilterMode,
  TreeNodeSelectEvent,
  TreeNodeExpandEvent,
  TreeNodeCollapseEvent
} from './tree.types';

@Component({
  selector: 'ox-tree-node',
  standalone: true,
  imports: [CommonModule, IconComponent, forwardRef(() => TreeNodeComponent)],
  template: `
    <li class="ox-treenode" [class.ox-treenode-leaf]="isLeaf()">
      <div 
        class="ox-treenode-content"
        [class.ox-treenode-selected]="isSelected()"
        [class.ox-treenode-disabled]="node().disabled"
        (click)="onNodeClick($event)">
        
        <!-- Toggler Icon -->
        <span 
          class="ox-treenode-toggler"
          [class.ox-treenode-toggler-expanded]="node().expanded"
          [class.ox-treenode-toggler-empty]="isLeaf()"
          (click)="onTogglerClick($event)">
          @if (!isLeaf()) {
            <ox-icon name="chevron-right" size="0.875rem"></ox-icon>
          }
        </span>

        <!-- Checkbox if selectionMode === 'checkbox' -->
        @if (tree().selectionMode() === 'checkbox') {
          <div 
            class="ox-treenode-checkbox"
            [class.ox-treenode-checkbox-checked]="isCheckboxChecked()"
            [class.ox-treenode-checkbox-partial]="isCheckboxPartial()"
            (click)="onCheckboxClick($event)">
            @if (isCheckboxChecked()) {
              <ox-icon name="check" size="0.75rem"></ox-icon>
            } @else if (isCheckboxPartial()) {
              <span class="ox-treenode-checkbox-indeterminate"></span>
            }
          </div>
        }

        <!-- Node Icon -->
        @if (nodeIcon()) {
          <span class="ox-treenode-icon">
            <ox-icon [name]="$any(nodeIcon()!)" size="1.125rem"></ox-icon>
          </span>
        }

        <!-- Node Label or Custom Template -->
        <div class="ox-treenode-label">
          @if (tree().nodeTemplate) {
            <ng-container *ngTemplateOutlet="tree().nodeTemplate!; context: { $implicit: node() }"></ng-container>
          } @else {
            {{ node().label }}
          }
        </div>
      </div>

      <!-- Children -->
      @if (!isLeaf() && node().expanded && node().children && node().children!.length > 0) {
        <ul class="ox-tree-children" [class.ox-tree-lines]="tree().showLines()">
          @for (child of node().children; track child.key || child.label) {
            @if (tree().isNodeVisible(child)) {
              <ox-tree-node 
                [node]="child" 
                [tree]="tree()"
                [parent]="node()">
              </ox-tree-node>
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

  nodeIcon = computed<OxIconName | string | undefined>(() => {
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
  selector: 'ox-tree',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, TreeNodeComponent],
  template: `
    <div 
      class="ox-tree" 
      [class.ox-tree-bordered]="bordered()"
      [class.ox-tree-scrollable]="scrollHeight() !== null"
      [style.maxHeight]="scrollHeight()">
      
      <!-- Filter Header -->
      @if (filter()) {
        <div class="ox-tree-header">
          <div class="ox-tree-filter-wrapper">
            <ox-icon name="search" size="1rem" class="ox-tree-filter-icon"></ox-icon>
            <input 
              type="text" 
              class="ox-tree-filter-input"
              [placeholder]="filterPlaceholder()"
              [ngModel]="filterQuery()"
              (ngModelChange)="onFilterChange($event)">
            
            @if (filterQuery()) {
              <button type="button" class="ox-tree-filter-clear" (click)="clearFilter()">
                <ox-icon name="x" size="0.875rem"></ox-icon>
              </button>
            }
          </div>

          <div class="ox-tree-actions">
            <button 
              type="button" 
              class="ox-tree-filter-clear" 
              title="Expandir todo"
              (click)="expandAll()">
              <ox-icon name="chevron-down" size="1rem"></ox-icon>
            </button>
            <button 
              type="button" 
              class="ox-tree-filter-clear" 
              title="Colapsar todo"
              (click)="collapseAll()">
              <ox-icon name="chevron-up" size="1rem"></ox-icon>
            </button>
          </div>
        </div>
      }

      <!-- Tree Content -->
      @if (hasVisibleNodes()) {
        <ul class="ox-tree-container" [class.ox-tree-lines]="showLines()">
          @for (node of value(); track node.key || node.label) {
            @if (isNodeVisible(node)) {
              <ox-tree-node 
                [node]="node" 
                [tree]="this">
              </ox-tree-node>
            }
          }
        </ul>
      } @else {
        <div class="ox-tree-empty">
          <ox-icon name="folder" size="2rem"></ox-icon>
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
