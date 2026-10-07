import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { 
  TableComponent, 
  OxygenTemplateDirective, 
  BadgeComponent, 
  ButtonComponent,
  InputComponent,
  PaginatorComponent 
} from "oxygen-ui";
import { DocCodeComponent } from "../../shared/doc-code/doc-code.component";
import { DocApiTableComponent, ApiProperty, ApiEvent } from "../../shared/doc-code/doc-api-table.component";

@Component({
  selector: "app-table-demo",
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    TableComponent, 
    OxygenTemplateDirective, 
    BadgeComponent, 
    ButtonComponent,
    InputComponent,
    PaginatorComponent,
    DocCodeComponent,
    DocApiTableComponent
  ],
  template: `
    <div class="ox-page-container">
      <h1>Table (Tabla de Datos Interactiva)</h1>
      <p class="ox-description">
        Componente de tabla avanzado con soporte para ordenamiento por columnas, selección múltiple de filas, paginación integrada y exportación a CSV.
      </p>

      <app-doc-code
        title="1. Tabla con Búsqueda, Ordenamiento, Paginación y Exportación CSV"
        description="Filtra globalmente, selecciona filas con checkboxes y descarga los datos filtrados en formato CSV."
        [html]="tableHtml"
        [ts]="tableTs">
        
        <!-- Global Actions Toolbar -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; gap: 1rem; flex-wrap: wrap;">
          <div style="width: 280px;">
            <ox-input 
              placeholder="Buscar clientes..." 
              [(ngModel)]="searchValue"
              icon="search">
            </ox-input>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <ox-button variant="outline-primary" icon="download" (onClick)="table.exportCSV('customers-export.csv')">
              Exportar CSV
            </ox-button>
          </div>
        </div>

        <ox-table 
          #table
          [value]="paginatedCustomers" 
          [globalFilter]="searchValue"
          selectionMode="multiple"
          [(selection)]="selectedCustomers"
          dataKey="id">
          
          <ng-template oxTemplate="header">
            <tr>
              <th style="width: 3rem; text-align: center;">
                <input type="checkbox" [checked]="isAllSelected()" (change)="toggleSelectAll($event)" />
              </th>
              <th class="ox-sortable-column" (click)="table.toggleSort('name')">
                Nombre 
                <span class="ox-sort-icon" [class.active]="table.getSortOrder('name') !== 0">
                  {{ table.getSortOrder('name') === 1 ? '▲' : table.getSortOrder('name') === -1 ? '▼' : '⇅' }}
                </span>
              </th>
              <th class="ox-sortable-column" (click)="table.toggleSort('country')">
                País
                <span class="ox-sort-icon" [class.active]="table.getSortOrder('country') !== 0">
                  {{ table.getSortOrder('country') === 1 ? '▲' : table.getSortOrder('country') === -1 ? '▼' : '⇅' }}
                </span>
              </th>
              <th class="ox-sortable-column" (click)="table.toggleSort('status')">
                Estado
                <span class="ox-sort-icon" [class.active]="table.getSortOrder('status') !== 0">
                  {{ table.getSortOrder('status') === 1 ? '▲' : table.getSortOrder('status') === -1 ? '▼' : '⇅' }}
                </span>
              </th>
              <th class="ox-sortable-column" (click)="table.toggleSort('activity')">
                Actividad
                <span class="ox-sort-icon" [class.active]="table.getSortOrder('activity') !== 0">
                  {{ table.getSortOrder('activity') === 1 ? '▲' : table.getSortOrder('activity') === -1 ? '▼' : '⇅' }}
                </span>
              </th>
            </tr>
          </ng-template>

          <ng-template oxTemplate="body" let-customer let-selected="selected">
            <tr [class.ox-table-row-selected]="selected" (click)="table.onRowClick($event, customer)">
              <td style="text-align: center;">
                <input type="checkbox" [checked]="selected" />
              </td>
              <td class="ox-fw-bold">{{ customer.name }}</td>
              <td>{{ customer.country }}</td>
              <td>
                <ox-badge 
                  [severity]="getStatusSeverity(customer.status)" 
                  [value]="customer.status"
                  [pill]="true"
                  size="sm">
                </ox-badge>
              </td>
              <td>{{ customer.activity }}%</td>
            </tr>
          </ng-template>
        </ox-table>

        <!-- Integrated Paginator -->
        <div style="margin-top: 1rem;">
          <ox-paginator
            [rows]="rows"
            [totalRecords]="customers.length"
            [first]="first"
            [rowsPerPageOptions]="[3, 5, 10]"
            (onPageChange)="onPageChange($event)">
          </ox-paginator>
        </div>

        <!-- Selection Info Box -->
        <div style="margin-top: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 0.875rem;">
          <strong>Filas Seleccionadas ({{ selectedCustomers.length }}):</strong>
          <span *ngIf="selectedCustomers.length === 0"> Ninguna</span>
          <ul *ngIf="selectedCustomers.length > 0" style="margin: 0.5rem 0 0 1.25rem; padding: 0;">
            <li *ngFor="let item of selectedCustomers">{{ item.name }} ({{ item.country }})</li>
          </ul>
        </div>
      </app-doc-code>

      <!-- API Reference -->
      <app-doc-api-table 
        title="API Reference: TableComponent"
        [properties]="tableProps"
        [events]="tableEvents">
      </app-doc-api-table>
    </div>
  `
})
export class TableDemoComponent {
  searchValue = "";
  selectedCustomers: any[] = [];

  first = 0;
  rows = 3;

  customers = [
    { id: 1000, name: "James Butt", country: "Algeria", status: "qualified", activity: 17 },
    { id: 1001, name: "Josephine Darakjy", country: "Egypt", status: "unqualified", activity: 0 },
    { id: 1002, name: "Art Venere", country: "Panama", status: "negotiation", activity: 63 },
    { id: 1003, name: "Lenna Paprocki", country: "Slovenia", status: "new", activity: 37 },
    { id: 1004, name: "Donette Foller", country: "South Africa", status: "qualified", activity: 85 },
    { id: 1005, name: "Simona Morasca", country: "Egypt", status: "unqualified", activity: 12 },
    { id: 1006, name: "Mitsue Tollner", country: "Paraguay", status: "negotiation", activity: 54 },
    { id: 1007, name: "Leota Dilliard", country: "Serbia", status: "new", activity: 90 },
  ];

  get paginatedCustomers() {
    return this.customers.slice(this.first, this.first + this.rows);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isAllSelected(): boolean {
    return this.paginatedCustomers.length > 0 && this.paginatedCustomers.every(c => this.selectedCustomers.some(s => s.id === c.id));
  }

  toggleSelectAll(event: any) {
    if (event.target.checked) {
      const newSel = [...this.selectedCustomers];
      for (const c of this.paginatedCustomers) {
        if (!newSel.some(s => s.id === c.id)) {
          newSel.push(c);
        }
      }
      this.selectedCustomers = newSel;
    } else {
      const pageIds = this.paginatedCustomers.map(c => c.id);
      this.selectedCustomers = this.selectedCustomers.filter(s => !pageIds.includes(s.id));
    }
  }

  getStatusSeverity(status: string): any {
    switch (status) {
      case "qualified": return "success";
      case "unqualified": return "danger";
      case "negotiation": return "warning";
      case "new": return "info";
      default: return "primary";
    }
  }

  tableHtml = `<ox-table 
  #table
  [value]="customers" 
  [globalFilter]="searchValue"
  selectionMode="multiple"
  [(selection)]="selectedCustomers"
  dataKey="id">
  
  <ng-template oxTemplate="header">
    <tr>
      <th class="ox-sortable-column" (click)="table.toggleSort('name')">Nombre</th>
      <th class="ox-sortable-column" (click)="table.toggleSort('country')">País</th>
      <th>Estado</th>
    </tr>
  </ng-template>

  <ng-template oxTemplate="body" let-customer let-selected="selected">
    <tr [class.ox-table-row-selected]="selected" (click)="table.onRowClick($event, customer)">
      <td class="ox-fw-bold">{{ customer.name }}</td>
      <td>{{ customer.country }}</td>
      <td><ox-badge [value]="customer.status"></ox-badge></td>
    </tr>
  </ng-template>
</ox-table>`;

  tableTs = `import { Component } from '@angular/core';
import { TableComponent, OxygenTemplateDirective } from 'oxygen-ui';

@Component({
  selector: 'app-my-table',
  standalone: true,
  imports: [TableComponent, OxygenTemplateDirective],
  templateUrl: './my-table.component.html'
})
export class MyTableComponent {
  searchValue = '';
  selectedCustomers = [];
  customers = [
    { id: 1, name: 'James Butt', country: 'Algeria', status: 'qualified' },
    { id: 2, name: 'Art Venere', country: 'Panama', status: 'negotiation' }
  ];
}`;

  tableProps: ApiProperty[] = [
    {
      name: 'value',
      type: 'any[]',
      default: '[]',
      description: 'Arreglo de datos a renderizar en la tabla.'
    },
    {
      name: 'globalFilter',
      type: 'string',
      default: "''",
      description: 'Cadena de texto para filtrado global de registros en tiempo real.'
    },
    {
      name: 'selectionMode',
      type: "'single' | 'multiple' | null",
      default: 'null',
      description: 'Habilita el modo de selección de filas.'
    },
    {
      name: 'dataKey',
      type: 'string',
      default: "'id'",
      description: 'Identificador único de cada fila para control de selección.'
    },
    {
      name: 'striped',
      type: 'boolean',
      default: 'false',
      description: 'Aplica filas alternadas con fondo sutil (efecto cebra).'
    }
  ];

  tableEvents: ApiEvent[] = [
    {
      name: 'selectionChange',
      parameters: 'any | any[]',
      description: 'Emitido cuando cambia la selección de elementos.'
    },
    {
      name: 'onSort',
      parameters: '{ field: string, order: number }',
      description: 'Emitido cuando se ordena una columna.'
    }
  ];
}
