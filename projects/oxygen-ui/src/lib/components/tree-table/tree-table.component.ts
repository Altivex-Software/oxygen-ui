import { 
  Component, 
  input, 
  output, 
  signal, 
  computed, 
  ChangeDetectionStrategy, 
  ViewEncapsulation,
  TemplateRef,
  ContentChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { OxIconName } from '../icon/icon.types';

export interface TreeTableNode<T = any> {
  key?: string;
  data: T;
  icon?: OxIconName | string;
  children?: TreeTableNode<T>[];
  expanded?: boolean;
  leaf?: boolean;
  selectable?: boolean;
}

export interface TreeTableColumn {
  field: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface FlattenedRow {
  node: TreeTableNode;
  level: number;
  hasChildren: boolean;
  expanded: boolean;
  visible: boolean;
}

@Component({
  selector: 'ox-tree-table',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="ox-tree-table-wrapper" [class.ox-tree-table-striped]="striped()">
      <table class="ox-tree-table">
        <thead class="ox-tree-table-thead">
          <tr>
            @for (col of columns(); track col.field; let first = $first) {
              <th 
                class="ox-tree-table-th" 
                [style.width]="col.width"
                [style.text-align]="col.align || 'left'">
                {{ col.header }}
              </th>
            }
          </tr>
        </thead>
        <tbody class="ox-tree-table-tbody">
          @if (flattenedRows().length === 0) {
            <tr>
              <td [attr.colspan]="columns().length" class="ox-tree-table-empty">
                {{ emptyMessage() }}
              </td>
            </tr>
          } @else {
            @for (row of flattenedRows(); track (row.node.key || $index)) {
              <tr 
                class="ox-tree-table-tr"
                [class.ox-tree-table-tr-selected]="isSelected(row.node)"
                (click)="onRowClick(row.node)">
                
                @for (col of columns(); track col.field; let first = $first) {
                  <td 
                    class="ox-tree-table-td" 
                    [style.text-align]="col.align || 'left'">
                    
                    @if (first) {
                      <!-- Tree hierarchy toggler & indentation -->
                      <div class="ox-tree-cell-container" [style.padding-left.px]="row.level * 24">
                        @if (row.hasChildren) {
                          <button 
                            type="button" 
                            class="ox-tree-toggler"
                            [class.ox-tree-toggler-expanded]="row.expanded"
                            (click)="toggleNode(row.node, $event)"
                            aria-label="Toggle node">
                            <ox-icon name="chevron-right" size="0.875rem" class="ox-tree-toggler-icon"></ox-icon>
                          </button>
                        } @else {
                          <span class="ox-tree-toggler-spacer"></span>
                        }
                        @if (row.node.icon) {
                          <ox-icon [name]="$any(row.node.icon)" size="sm" style="margin-right: 6px; color: var(--oxy-primary, #0066ff);"></ox-icon>
                        }
                        <span class="ox-tree-cell-value">{{ getCellValue(row.node, col.field) }}</span>
                      </div>
                    } @else {
                      {{ getCellValue(row.node, col.field) }}
                    }
                  </td>
                }
              </tr>
            }
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .ox-tree-table-wrapper {
      width: 100%;
      overflow-x: auto;
      border: 1px solid var(--border-color, #e2e8f0);
      border-radius: var(--radius-md, 8px);
      background: var(--bg-surface, #ffffff);
    }

    .ox-tree-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
      text-align: left;
    }

    .ox-tree-table-thead {
      background: var(--bg-surface-subtle, #f8fafc);
      border-bottom: 1px solid var(--border-color, #e2e8f0);
    }

    .ox-tree-table-th {
      padding: 12px 16px;
      font-weight: 600;
      color: var(--text-secondary, #475569);
      user-select: none;
    }

    .ox-tree-table-tbody {
      divide-y: 1px solid var(--border-color, #f1f5f9);
    }

    .ox-tree-table-tr {
      border-bottom: 1px solid var(--border-color, #f1f5f9);
      transition: background-color 0.15s ease-in-out;
      cursor: pointer;
    }

    .ox-tree-table-tr:hover {
      background-color: var(--bg-surface-hover, #f8fafc);
    }

    .ox-tree-table-tr-selected {
      background-color: var(--primary-50, #eef2ff) !important;
      color: var(--primary-color, #4f46e5);
    }

    .ox-tree-table-striped .ox-tree-table-tbody .ox-tree-table-tr:nth-child(even):not(.ox-tree-table-tr-selected) {
      background-color: var(--bg-surface-alt, #fafafa);
    }

    .ox-tree-table-td {
      padding: 10px 16px;
      color: var(--text-primary, #1e293b);
      vertical-align: middle;
    }

    .ox-tree-cell-container {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .ox-tree-toggler {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border: none;
      background: transparent;
      border-radius: var(--radius-sm, 4px);
      color: var(--text-secondary, #64748b);
      cursor: pointer;
      padding: 0;
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s;
    }

    .ox-tree-toggler:hover {
      background: rgba(0, 0, 0, 0.05);
      color: var(--text-primary, #1e293b);
    }

    .ox-tree-toggler-expanded {
      transform: rotate(90deg);
    }

    .ox-tree-toggler-icon {
      width: 16px;
      height: 16px;
    }

    .ox-tree-toggler-spacer {
      width: 22px;
      height: 22px;
      display: inline-block;
    }

    .ox-tree-cell-value {
      font-weight: 500;
    }

    .ox-tree-table-empty {
      padding: 2rem;
      text-align: center;
      color: var(--text-muted, #94a3b8);
      font-style: italic;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TreeTableComponent {
  value = input<TreeTableNode[]>([]);
  columns = input<TreeTableColumn[]>([]);
  selectionMode = input<'single' | 'multiple' | null>(null);
  striped = input<boolean>(false);
  emptyMessage = input<string>('No records found');

  nodeSelect = output<TreeTableNode>();
  nodeUnselect = output<TreeTableNode>();
  nodeExpand = output<TreeTableNode>();
  nodeCollapse = output<TreeTableNode>();

  expandedKeys = signal<Set<any>>(new Set());
  selectedNodes = signal<TreeTableNode[]>([]);

  flattenedRows = computed(() => {
    const rows: FlattenedRow[] = [];
    const expanded = this.expandedKeys();

    const processNodes = (nodes: TreeTableNode[], level: number, isParentExpanded: boolean) => {
      if (!nodes) return;
      for (const node of nodes) {
        const hasChildren = Boolean(node.children && node.children.length > 0);
        const isExp = node.key ? expanded.has(node.key) : Boolean(node.expanded);

        if (isParentExpanded) {
          rows.push({
            node,
            level,
            hasChildren,
            expanded: isExp,
            visible: true
          });
        }

        if (hasChildren && isParentExpanded && isExp) {
          processNodes(node.children!, level + 1, true);
        }
      }
    };

    processNodes(this.value(), 0, true);
    return rows;
  });

  getCellValue(node: TreeTableNode, field: string): any {
    if (!node.data) return '';
    return node.data[field] ?? '';
  }

  toggleNode(node: TreeTableNode, event: Event): void {
    event.stopPropagation();
    const key = node.key || node;
    const current = new Set(this.expandedKeys());

    const isCurrentlyExp = node.key ? current.has(node.key) : Boolean(node.expanded);

    if (isCurrentlyExp) {
      current.delete(key);
      node.expanded = false;
      this.nodeCollapse.emit(node);
    } else {
      current.add(key);
      node.expanded = true;
      this.nodeExpand.emit(node);
    }

    this.expandedKeys.set(current);
  }

  isSelected(node: TreeTableNode): boolean {
    return this.selectedNodes().includes(node);
  }

  onRowClick(node: TreeTableNode): void {
    const mode = this.selectionMode();
    if (!mode || node.selectable === false) return;

    let selected = [...this.selectedNodes()];
    if (mode === 'single') {
      if (selected.includes(node)) {
        selected = [];
        this.nodeUnselect.emit(node);
      } else {
        selected = [node];
        this.nodeSelect.emit(node);
      }
    } else if (mode === 'multiple') {
      if (selected.includes(node)) {
        selected = selected.filter(n => n !== node);
        this.nodeUnselect.emit(node);
      } else {
        selected.push(node);
        this.nodeSelect.emit(node);
      }
    }
    this.selectedNodes.set(selected);
  }
}
