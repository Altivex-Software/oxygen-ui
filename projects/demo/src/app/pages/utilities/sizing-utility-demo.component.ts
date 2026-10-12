import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';

@Component({
  selector: 'app-sizing-utility-demo',
  standalone: true,
  imports: [CommonModule, DocCodeComponent, UtilityTableComponent],
  template: `
    <div class="val-page-container">
      <div class="val-header-hero">
        <h1 class="val-page-title">Dimensiones (Sizing)</h1>
        <p class="val-page-subtitle">
          Utilidades de ancho y alto porcentual (5% a 100%), dimensiones completas de viewport (vw/vh), auto y anchos fijos en píxeles.
        </p>
      </div>

      <!-- DEMO 1: ANCHOS PORCENTUALES -->
      <app-doc-code
        title="1. Ancho Porcentual (.val-w-25, .val-w-50, .val-w-75, .val-w-100)"
        description="Ajusta el ancho relativo respecto al elemento padre."
        [html]="widthHtml">
        <div class="val-demo-box val-flex val-flex-column val-gap-2">
          <div class="val-size-bar val-w-25">.val-w-25 (25%)</div>
          <div class="val-size-bar val-w-50">.val-w-50 (50%)</div>
          <div class="val-size-bar val-w-75">.val-w-75 (75%)</div>
          <div class="val-size-bar val-w-100">.val-w-100 (100%)</div>
        </div>
      </app-doc-code>

      <!-- DEMO 2: ANCHO RESPONSIVO -->
      <app-doc-code
        title="2. Ancho Responsivo (.val-w-100, .val-w-md-50, .val-w-lg-25)"
        description="Adapta el ancho según la resolución de la pantalla."
        [html]="respWidthHtml">
        <div class="val-demo-box">
          <div class="val-size-bar val-w-100 val-w-md-50 val-w-lg-30">
            val-w-100 val-w-md-50 val-w-lg-30
          </div>
        </div>
      </app-doc-code>

      <!-- TABLA DE CLASES -->
      <app-utility-table 
        title="Referencia de Clases de Dimensiones" 
        [classes]="sizingClasses">
      </app-utility-table>
    </div>
  `,
  styles: [`
    .val-page-container {
      max-width: 1100px;
      margin: 0 auto;
    }
    .val-page-title {
      font-size: 2rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 0.5rem 0;
    }
    .val-page-subtitle {
      font-size: 1rem;
      color: #475569;
      margin: 0 0 2rem 0;
      line-height: 1.6;
    }
    .val-demo-box {
      width: 100%;
    }
    .val-size-bar {
      background: #e0e7ff;
      border: 1px solid #c7d2fe;
      color: #3730a3;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-size: 0.8125rem;
      font-weight: 600;
      text-align: center;
    }
  `]
})
export class SizingUtilityDemoComponent {
  widthHtml = `<div class="val-w-25">25%</div>
<div class="val-w-50">50%</div>
<div class="val-w-75">75%</div>
<div class="val-w-100">100%</div>`;

  respWidthHtml = `<div class="val-w-100 val-w-md-50 val-w-lg-30">
  100% en móvil, 50% en tablet, 30% en escritorio
</div>`;

  sizingClasses: UtilityClass[] = [
    { name: 'val-w-{5..100}', css: 'width: {n}% !important', description: 'Ancho porcentual (5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100%)', responsive: true },
    { name: 'val-h-{5..100}', css: 'height: {n}% !important', description: 'Alto porcentual', responsive: true },
    { name: 'val-w-auto', css: 'width: auto !important', description: 'Ancho automático según contenido', responsive: true },
    { name: 'val-h-auto', css: 'height: auto !important', description: 'Alto automático según contenido', responsive: true },
    { name: 'val-vw-100', css: 'width: 100vw !important', description: 'Ancho total del viewport', responsive: true },
    { name: 'val-vh-100', css: 'height: 100vh !important', description: 'Alto total del viewport', responsive: true },
    { name: 'val-mw-100', css: 'max-width: 100% !important', description: 'Ancho máximo 100% (evita desbordes)', responsive: true },
    { name: 'val-mh-100', css: 'max-height: 100% !important', description: 'Alto máximo 100%', responsive: true },
    { name: 'val-min-vw-100', css: 'min-width: 100vw !important', description: 'Ancho mínimo del viewport', responsive: true },
    { name: 'val-min-vh-100', css: 'min-height: 100vh !important', description: 'Alto mínimo del viewport', responsive: true },
    { name: 'val-w-{2..100}px', css: 'width: {n}px !important', description: 'Ancho fijo en píxeles (ej: val-w-64px, val-w-96px)', responsive: true },
    { name: 'val-h-{2..100}px', css: 'height: {n}px !important', description: 'Alto fijo en píxeles', responsive: true }
  ];
}
