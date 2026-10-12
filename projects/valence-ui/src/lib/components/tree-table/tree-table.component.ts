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
import { ValIconName } from '../icon/icon.types';

export interface TreeTableNode<T = any> {
  key?: string;
  data: T;
  icon?: ValIconName | string;
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
  selector: 'val-tree-table',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="val-tree-table-wrapper" [class.val-tree-table-striped]="striped()">
      <table class="val-tree-table">
        <thead class="val-tree-table-thead">
          <tr>
            @for (col of columns(); track col.field; let first = $first) {
              <th 
                class="val-tree-table-th" 
                [style.width]="col.width"
                [style.text-align]="col.align || 'left'">
                {{ col.header }}
              </th>
            }
          </tr>
        </thead>
        <tbody class="val-tree-table-tbody">
          @if (flattenedRows().length === 0) {
            <tr>
              <td [attr.colspan]="columns().length" class="val-tree-table-empty">
                {{ emptyMessage() }}
              </td>
            </tr>
          } @else {
            @for (row of flattenedRows(); track (row.node.key || $index)) {
              <tr 
                class="val-tree-table-tr"
                [class.val-tree-table-tr-selected]="isSelected(row.node)"
                (click)="onRowClick(row.node)">
                
                @for (col of columns(); track col.field; let first = $first) {
                  <td 
                    class="val-tree-table-td" 
                    [style.text-align]="col.align || 'left'">
                    
                    @if (first) {
                      <!-- Tree hierarchy toggler & indentation -->
                      <div class="val-tree-cell-container" [style.padding-left.px]="row.level * 24">
                        @if (row.hasChildren) {
                          <button 
                            type="button" 
                            class="val-tree-toggler"
                            [class.val-tree-toggler-expanded]="row.expanded"
                            (click)="toggleNode(row.node, $event)"
                            aria-label="Toggle node">
                            <val-icon name="chevron-right" size="0.875rem" class="val-tree-toggler-icon"></val-icon>
                          </button>
                        } @else {
                          <span class="val-tree-toggler-spacer"></span>
                        }
                        @if (row.node.icon) {
                          <val-icon [name]="$any(row.node.icon)" size="sm" style="margin-right: 6px; color: var(--val-primary, #0066ff);"></val-icon>
                        }
                        <span class="val-tree-cell-value">{{ getCellValue(row.node, col.field) }}</span>
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
    .val-tree-table-wrapper {
      width: 100%;
      overflow-x: auto;
      border: 1px solid var(--border-color, #e2e8f0);
      border-radius: var(--radius-md, 8px);
      background: var(--bg-surface, #ffffff);
    }

    .val-tree-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
      text-align: left;
    }

    .val-tree-table-thead {
      background: var(--bg-surface-subtle, #f8fafc);
      border-bottom: 1px solid var(--border-color, #e2e8f0);
    }

    .val-tree-table-th {
      padding: 12px 16px;
      font-weight: 600;
      color: var(--text-secondary, #475569);
      user-select: none;
    }

    .val-tree-table-tbody {
      divide-y: 1px solid var(--border-color, #f1f5f9);
    }

    .val-tree-table-tr {
      border-bottom: 1px solid var(--border-color, #f1f5f9);
      transition: background-color 0.15s ease-in-out;
      cursor: pointer;
    }

    .val-tree-table-tr:hover {
      background-color: var(--bg-surface-hover, #f8fafc);
    }

    .val-tree-table-tr-selected {
      background-color: var(--primary-50, #eef2ff) !important;
      color: var(--primary-color, #4f46e5);
    }

    .val-tree-table-striped .val-tree-table-tbody .val-tree-table-tr:nth-child(even):not(.val-tree-table-tr-selected) {
      background-color: var(--bg-surface-alt, #fafafa);
    }

    .val-tree-table-td {
      padding: 10px 16px;
      color: var(--text-primary, #1e293b);
      vertical-align: middle;
    }

    .val-tree-cell-container {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .val-tree-toggler {
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

    .val-tree-toggler:hover {
      background: rgba(0, 0, 0, 0.05);
      color: var(--text-primary, #1e293b);
    }

    .val-tree-toggler-expanded {
      transform: rotate(90deg);
    }

    .val-tree-toggler-icon {
      width: 16px;
      height: 16px;
    }

    .val-tree-toggler-spacer {
      width: 22px;
      height: 22px;
      display: inline-block;
    }

    .val-tree-cell-value {
      font-weight: 500;
    }

    .val-tree-table-empty {
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
