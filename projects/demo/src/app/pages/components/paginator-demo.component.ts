import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-paginator-demo',
  standalone: true,
  imports: [CommonModule, PaginatorComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Paginator</h1>
      <p class="ox-description">
        Componente de paginación reactivo para navegar grandes colecciones de datos, con soporte para selector de filas por página.
      </p>

      <!-- 1. BÁSICO -->
      <app-doc-code 
        title="1. Paginación Básica"
        description="Control de navegación con cálculo dinámico de páginas y salto a primera/última página."
        [htmlCode]="basicHtml"
        [tsCode]="basicTs">
        <div style="width: 100%;">
          <ox-paginator 
            [rows]="10" 
            [totalRecords]="totalRecords()" 
            (onPageChange)="onPageChange($event)">
          </ox-paginator>
          <div style="margin-top: 1rem; font-size: 0.875rem; color: #64748b; background: #ffffff; padding: 8px 12px; border-radius: 6px; border: 1px solid #e2e8f0; width: fit-content;">
            <strong>Estado actual:</strong> Página {{ (pageState()?.page ?? 0) + 1 }} &mdash; Primer índice: {{ pageState()?.first ?? 0 }} ({{ totalRecords() }} registros)
          </div>
        </div>
      </app-doc-code>

      <!-- 2. CON FILAS POR PÁGINA -->
      <app-doc-code 
        title="2. Con Selector de Filas por Página"
        description="Permite al usuario cambiar dinámicamente la cantidad de elementos visibles por página."
        [htmlCode]="rowsOptionsHtml"
        [tsCode]="rowsOptionsTs">
        <div style="width: 100%;">
          <ox-paginator 
            [rows]="10" 
            [totalRecords]="120" 
            [rowsPerPageOptions]="[5, 10, 25, 50]"
            (onPageChange)="onPageChange($event)">
          </ox-paginator>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: PaginatorComponent"
        [properties]="paginatorProperties" 
        [events]="paginatorEvents">
      </app-doc-api-table>
    </div>
  `
})
export class PaginatorDemoComponent {
  totalRecords = signal(100);
  pageState = signal<any>(null);

  onPageChange(event: any) {
    this.pageState.set(event);
  }

  basicHtml = `<ox-paginator 
  [rows]="10" 
  [totalRecords]="100" 
  (onPageChange)="onPageChange($event)">
</ox-paginator>`;

  basicTs = `import { Component } from '@angular/core';
import { PaginatorComponent } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [PaginatorComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {
  onPageChange(event: { page: number, first: number, rows: number }) {
    console.log('Cambio de página:', event);
  }
}`;

  rowsOptionsHtml = `<ox-paginator 
  [rows]="10" 
  [totalRecords]="120" 
  [rowsPerPageOptions]="[5, 10, 25, 50]"
  (onPageChange)="onPageChange($event)">
</ox-paginator>`;

  rowsOptionsTs = `import { Component } from '@angular/core';
import { PaginatorComponent } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [PaginatorComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {
  // Manejo de paginación reactiva
}`;

  paginatorProperties: ApiProperty[] = [
    { name: 'totalRecords', type: 'number', default: '0', description: 'Número total de elementos en el dataset.' },
    { name: 'rows', type: 'number', default: '10', description: 'Cantidad de filas a mostrar por página.' },
    { name: 'page', type: 'number', default: '0', description: 'Índice de la página activa (0-indexed).' },
    { name: 'first', type: 'number', default: '0', description: 'Índice del primer registro de la página actual.' },
    { name: 'rowsPerPageOptions', type: 'number[]', default: '[]', description: 'Opciones disponibles para el selector de cantidad de filas por página.' }
  ];

  paginatorEvents: ApiEvent[] = [
    { name: 'onPageChange', parameters: '{ page: number, first: number, rows: number }', description: 'Se dispara cuando el usuario cambia de página o el tamaño de página.' }
  ];
}
