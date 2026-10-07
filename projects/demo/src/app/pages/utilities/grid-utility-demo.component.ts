import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';

@Component({
  selector: 'app-grid-utility-demo',
  standalone: true,
  imports: [CommonModule, DocCodeComponent, UtilityTableComponent],
  template: `
    <div class="ox-page-container">
      <div class="ox-header-hero">
        <h1 class="ox-page-title">Grid & Contenedores</h1>
        <p class="ox-page-subtitle">
          Sistema de maquetación en cuadrícula basado en 12 columnas flexibles con soporte de contenedores, columnas proporcionales y gutters.
        </p>
      </div>

      <!-- DEMO 1: COLUMNAS BÁSICAS -->
      <app-doc-code
        title="1. Columnas Equitativas (.ox-col)"
        description="Las columnas con .ox-col se distribuyen automáticamente ocupando el mismo ancho."
        [html]="colAutoHtml">
        <div class="ox-demo-box">
          <div class="ox-row ox-g-2">
            <div class="ox-col"><div class="ox-grid-cell">.ox-col (1/3)</div></div>
            <div class="ox-col"><div class="ox-grid-cell">.ox-col (1/3)</div></div>
            <div class="ox-col"><div class="ox-grid-cell">.ox-col (1/3)</div></div>
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 2: COLUMNAS RESPONSIVAS -->
      <app-doc-code
        title="2. Sistema de 12 Columnas Responsivas (.ox-col-{bp}-{1..12})"
        description="Define anchos específicos por resolución (móvil, tablet, escritorio)."
        [html]="colRespHtml">
        <div class="ox-demo-box">
          <div class="ox-row ox-g-2">
            <div class="ox-col-12 ox-col-md-6 ox-col-lg-4">
              <div class="ox-grid-cell ox-bg-cell-1">ox-col-12 ox-col-md-6 ox-col-lg-4</div>
            </div>
            <div class="ox-col-12 ox-col-md-6 ox-col-lg-4">
              <div class="ox-grid-cell ox-bg-cell-2">ox-col-12 ox-col-md-6 ox-col-lg-4</div>
            </div>
            <div class="ox-col-12 ox-col-md-12 ox-col-lg-4">
              <div class="ox-grid-cell ox-bg-cell-3">ox-col-12 ox-col-md-12 ox-col-lg-4</div>
            </div>
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 3: SEPARACIÓN GUTTERS -->
      <app-doc-code
        title="3. Espaciado entre Columnas (Gutters .ox-g-*, .ox-gx-*, .ox-gy-*)"
        description="Controla la separación horizontal y vertical entre columnas."
        [html]="guttersHtml">
        <div class="ox-demo-box">
          <div class="ox-row ox-g-4">
            <div class="ox-col-6"><div class="ox-grid-cell">Col 6 (.ox-g-4)</div></div>
            <div class="ox-col-6"><div class="ox-grid-cell">Col 6 (.ox-g-4)</div></div>
            <div class="ox-col-6"><div class="ox-grid-cell">Col 6 (.ox-g-4)</div></div>
            <div class="ox-col-6"><div class="ox-grid-cell">Col 6 (.ox-g-4)</div></div>
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 4: CONTENEDORES -->
      <app-doc-code
        title="4. Contenedores (.ox-container, .ox-container-fluid)"
        description="Envuelven el contenido aplicando anchos máximos y padding centrado."
        [html]="containerHtml">
        <div class="ox-demo-box">
          <div class="ox-container ox-bg-light ox-p-3 ox-rounded ox-border ox-mb-3">
            <strong>.ox-container:</strong> Centrado con max-width según breakpoint (sm: 540px, md: 720px, lg: 960px, xl: 1140px, xxl: 1320px).
          </div>
          <div class="ox-container-fluid ox-bg-light ox-p-3 ox-rounded ox-border">
            <strong>.ox-container-fluid:</strong> Ancho al 100% permanente en todas las pantallas.
          </div>
        </div>
      </app-doc-code>

      <!-- TABLA DE CLASES -->
      <app-utility-table 
        title="Referencia de Clases Grid & Contenedores" 
        [classes]="gridClasses">
      </app-utility-table>
    </div>
  `,
  styles: [`
    .ox-page-container {
      max-width: 1100px;
      margin: 0 auto;
    }
    .ox-page-title {
      font-size: 2rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 0.5rem 0;
    }
    .ox-page-subtitle {
      font-size: 1rem;
      color: #475569;
      margin: 0 0 2rem 0;
      line-height: 1.6;
    }
    .ox-demo-box {
      width: 100%;
    }
    .ox-grid-cell {
      padding: 0.75rem 1rem;
      background: #e0e7ff;
      color: #3730a3;
      border: 1px solid #c7d2fe;
      border-radius: 6px;
      text-align: center;
      font-weight: 600;
      font-size: 0.8125rem;
    }
    .ox-bg-cell-1 { background: #e0e7ff; color: #3730a3; border-color: #c7d2fe; }
    .ox-bg-cell-2 { background: #e0f2fe; color: #0369a1; border-color: #bae6fd; }
    .ox-bg-cell-3 { background: #f1f5f9; color: #334155; border-color: #cbd5e1; }
  `]
})
export class GridUtilityDemoComponent {
  colAutoHtml = `<div class="ox-row ox-g-2">
  <div class="ox-col"><div class="ox-grid-cell">.ox-col (1/3)</div></div>
  <div class="ox-col"><div class="ox-grid-cell">.ox-col (1/3)</div></div>
  <div class="ox-col"><div class="ox-grid-cell">.ox-col (1/3)</div></div>
</div>`;

  colRespHtml = `<div class="ox-row ox-g-2">
  <div class="ox-col-12 ox-col-md-6 ox-col-lg-4">Contenido 1</div>
  <div class="ox-col-12 ox-col-md-6 ox-col-lg-4">Contenido 2</div>
  <div class="ox-col-12 ox-col-md-12 ox-col-lg-4">Contenido 3</div>
</div>`;

  guttersHtml = `<div class="ox-row ox-g-4">
  <div class="ox-col-6">Columna 1</div>
  <div class="ox-col-6">Columna 2</div>
</div>`;

  containerHtml = `<div class="ox-container">Contenedor Fijo Centrado</div>
<div class="ox-container-fluid">Contenedor 100% Fluido</div>`;

  gridClasses: UtilityClass[] = [
    { name: 'ox-container', css: 'max-width responsivo centrado', description: 'Contenedor con ancho máximo fijo por breakpoint (sm a xxl)', responsive: false },
    { name: 'ox-container-fluid', css: 'width: 100%; padding: 0 15px', description: 'Contenedor 100% ancho fluido', responsive: false },
    { name: 'ox-container-{sm|md|lg|xl|xxl}', css: '100% ancho hasta el breakpoint', description: 'Contenedor responsivo condicional', responsive: false },
    { name: 'ox-row', css: 'display: flex; flex-wrap: wrap; margin-x: calc(gutter * -0.5)', description: 'Fila base para columnas del grid', responsive: false },
    { name: 'ox-col', css: 'flex: 1 0 0%', description: 'Columna con ancho equitativo automático', responsive: false },
    { name: 'ox-col-{1..12}', css: 'width: (n / 12) * 100%', description: 'Columna fija de 1 a 12 espacios', responsive: false },
    { name: 'ox-col-{sm|md|lg|xl|xxl}', css: 'flex: 1 0 0% a partir de breakpoint', description: 'Columna automática responsiva', responsive: true },
    { name: 'ox-col-{sm|md|lg|xl|xxl}-{1..12}', css: 'width: (n / 12) * 100% en breakpoint', description: 'Columna de ancho responsivo (ej: ox-col-md-6)', responsive: true },
    { name: 'ox-g-{0..5}', css: '--ox-gutter-x / y: {0..3rem}', description: 'Separación horizontal y vertical en la fila', responsive: true },
    { name: 'ox-gx-{0..5}', css: '--ox-gutter-x: {0..3rem}', description: 'Separación solo horizontal (eje X)', responsive: true },
    { name: 'ox-gy-{0..5}', css: '--ox-gutter-y: {0..3rem}', description: 'Separación solo vertical (eje Y)', responsive: true }
  ];
}
