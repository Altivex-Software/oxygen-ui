import { 
  Directive, 
  Input, 
  TemplateRef, 
  Component, 
  input, 
  output, 
  contentChildren, 
  computed, 
  signal,
  ChangeDetectionStrategy, 
  ViewEncapsulation 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Directive({
  selector: '[oxTemplate]',
  standalone: true
})
export class OxygenTemplateDirective {
  @Input('oxTemplate') name: string = '';
  constructor(public template: TemplateRef<any>) {}
}

export type SelectionMode = 'single' | 'multiple';

@Component({
  selector: 'ox-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="ox-table-container ox-elevation-1">
      <table class="ox-table">
        <thead class="ox-table-thead">
          <ng-container *ngTemplateOutlet="headerTemplate()"></ng-container>
        </thead>
        <tbody class="ox-table-tbody">
          @for (rowData of processedData(); track getRowKey(rowData, $index)) {
            <ng-container *ngTemplateOutlet="bodyTemplate(); context: { $implicit: rowData, selected: isRowSelected(rowData) }"></ng-container>
          } @empty {
            <tr>
              <td class="ox-table-empty" [attr.colspan]="columns().length || 10">
                No data available
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styleUrl: './table.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  value = input<any[]>([]);
  columns = input<any[]>([]);
  dataKey = input<string>('id');
  
  // Selection
  selectionMode = input<SelectionMode | null>(null);
  selection = input<any | any[] | null>(null);
  selectionChange = output<any>();
  rowSelect = output<any>();
  rowUnselect = output<any>();

  // Internal Sorting Signal
  sortFieldSignal = signal<string | null>(null);
  sortOrderSignal = signal<number>(1); // 1 = ASC, -1 = DESC

  // Internal Global Filter Signal
  globalFilterSignal = signal<string>('');

  @Input() 
  set sortField(field: string | null) {
    this.sortFieldSignal.set(field);
  }
  
  @Input() 
  set sortOrder(order: number) {
    this.sortOrderSignal.set(order);
  }

  @Input()
  set globalFilter(filter: string) {
    this.globalFilterSignal.set(filter || '');
  }

  templates = contentChildren(OxygenTemplateDirective);

  headerTemplate = computed(() => {
    return this.templates().find(t => t.name === 'header')?.template || null;
  });

  bodyTemplate = computed(() => {
    return this.templates().find(t => t.name === 'body')?.template || null;
  });

  processedData = computed(() => {
    let data = [...(this.value() || [])];
    const filterTerm = this.globalFilterSignal().toLowerCase().trim();
    const sField = this.sortFieldSignal();
    const sOrder = this.sortOrderSignal();

    // 1. Filter
    if (filterTerm) {
      data = data.filter(item => {
        return Object.keys(item).some(key => {
          const val = item[key];
          return val !== null && val !== undefined && String(val).toLowerCase().includes(filterTerm);
        });
      });
    }

    // 2. Sort
    if (sField) {
      data.sort((a, b) => {
        const valA = this.resolveFieldData(a, sField);
        const valB = this.resolveFieldData(b, sField);

        let result = 0;
        if (valA == null && valB != null) result = -1;
        else if (valA != null && valB == null) result = 1;
        else if (typeof valA === 'string' && typeof valB === 'string') {
          result = valA.localeCompare(valB);
        } else {
          result = valA < valB ? -1 : valA > valB ? 1 : 0;
        }

        return result * sOrder;
      });
    }

    return data;
  });

  toggleSort(field: string) {
    if (this.sortFieldSignal() === field) {
      this.sortOrderSignal.update(o => o * -1);
    } else {
      this.sortFieldSignal.set(field);
      this.sortOrderSignal.set(1);
    }
  }

  getSortOrder(field: string): number {
    return this.sortFieldSignal() === field ? this.sortOrderSignal() : 0;
  }

  getRowKey(rowData: any, index: number): any {
    const key = this.dataKey();
    if (rowData && key && rowData[key] !== undefined) {
      return rowData[key];
    }
    return index;
  }

  isRowSelected(rowData: any): boolean {
    const sel = this.selection();
    if (!sel || !this.selectionMode()) return false;

    if (this.selectionMode() === 'single') {
      return this.equals(sel, rowData);
    } else if (this.selectionMode() === 'multiple' && Array.isArray(sel)) {
      return sel.some(item => this.equals(item, rowData));
    }

    return false;
  }

  onRowClick(event: MouseEvent, rowData: any) {
    const mode = this.selectionMode();
    if (!mode) return;

    const currentSel = this.selection();
    let newSel: any;
    let selected = false;

    if (mode === 'single') {
      if (this.isRowSelected(rowData)) {
        newSel = null;
        selected = false;
      } else {
        newSel = rowData;
        selected = true;
      }
    } else if (mode === 'multiple') {
      const arr = Array.isArray(currentSel) ? [...currentSel] : [];
      const idx = arr.findIndex(item => this.equals(item, rowData));

      if (idx > -1) {
        arr.splice(idx, 1);
        selected = false;
      } else {
        arr.push(rowData);
        selected = true;
      }
      newSel = arr;
    }

    this.selectionChange.emit(newSel);
    if (selected) {
      this.rowSelect.emit(rowData);
    } else {
      this.rowUnselect.emit(rowData);
    }
  }

  exportCSV(filename: string = 'export.csv') {
    const data = this.processedData();
    if (!data || data.length === 0) return;

    const keys = Object.keys(data[0]);
    const csvRows = [keys.join(',')];

    for (const row of data) {
      const values = keys.map(k => {
        const escaped = ('' + (row[k] ?? '')).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private equals(data1: any, data2: any): boolean {
    const key = this.dataKey();
    if (data1 && data2 && key && data1[key] !== undefined && data2[key] !== undefined) {
      return data1[key] === data2[key];
    }
    return data1 === data2;
  }

  private resolveFieldData(data: any, field: string): any {
    if (data && field) {
      if (field.indexOf('.') === -1) {
        return data[field];
      }
      const fields: string[] = field.split('.');
      let value = data;
      for (let i = 0; i < fields.length; i++) {
        if (value == null) return null;
        value = value[fields[i]];
      }
      return value;
    }
    return null;
  }
}

