import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';

@Component({
  selector: 'app-borders-utility-demo',
  standalone: true,
  imports: [CommonModule, DocCodeComponent, UtilityTableComponent],
  template: `
    <div class="val-page-container">
      <div class="val-header-hero">
        <h1 class="val-page-title">Bordes, Sombras & Efectos</h1>
        <p class="val-page-subtitle">
          Configura esquinas redondeadas (sm, md, lg, circle, pill), elevaciones con sombras de caja y grosores o estilos de borde.
        </p>
      </div>

      <!-- DEMO 1: BORDER RADIUS -->
      <app-doc-code
        title="1. Esquinas Redondeadas (.val-rounded-*)"
        description="Escalas de radio: sm (4px), md (6px), lg (10px), circle (50%), pill (cápsula)."
        [html]="radiusHtml">
        <div class="val-demo-box val-flex val-flex-wrap val-gap-3 val-align-items-center">
          <div class="val-preview-card val-rounded-none val-border">.val-rounded-none</div>
          <div class="val-preview-card val-rounded-sm val-border">.val-rounded-sm (4px)</div>
          <div class="val-preview-card val-rounded-md val-border">.val-rounded-md (6px)</div>
          <div class="val-preview-card val-rounded-lg val-border">.val-rounded-lg (10px)</div>
          <div class="val-preview-card val-rounded-pill val-border val-px-4">.val-rounded-pill</div>
          <div class="val-circle-card val-rounded-circle val-bg-primary val-text-white">Circle</div>
        </div>
      </app-doc-code>

      <!-- DEMO 2: SOMBRAS Y ELEVACIÓN -->
      <app-doc-code
        title="2. Sombras de Elevación (.val-shadow-*)"
        description="Sombras suaves para tarjetas, modales y botones elevados."
        [html]="shadowsHtml">
        <div class="val-demo-box val-flex val-flex-wrap val-gap-3">
          <div class="val-preview-card val-shadow-sm val-rounded">.val-shadow-sm</div>
          <div class="val-preview-card val-shadow-md val-rounded">.val-shadow-md</div>
        </div>
      </app-doc-code>

      <!-- DEMO 3: ESTILOS DE BORDE -->
      <app-doc-code
        title="3. Estilos y Grosores de Borde (.val-border, .val-border-dashed, .val-border-2)"
        description="Bordes sólidos, punteados, dobles y grosores de 0 a 5 píxeles."
        [html]="bordersHtml">
        <div class="val-demo-box val-flex val-flex-wrap val-gap-3">
          <div class="val-preview-card val-border">.val-border</div>
          <div class="val-preview-card val-border val-border-2">.val-border-2</div>
          <div class="val-preview-card val-border val-border-dashed">.val-border-dashed</div>
          <div class="val-preview-card val-border val-border-dotted">.val-border-dotted</div>
        </div>
      </app-doc-code>

      <!-- TABLA DE CLASES -->
      <app-utility-table 
        title="Referencia de Clases de Bordes & Sombras" 
        [classes]="borderClasses">
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
    .val-preview-card {
      width: 150px;
      height: 80px;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 600;
      color: #334155;
      text-align: center;
    }
    .val-circle-card {
      width: 70px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 700;
    }
  `]
})
export class BordersUtilityDemoComponent {
  radiusHtml = `<div class="val-rounded-sm val-border">.val-rounded-sm</div>
<div class="val-rounded-md val-border">.val-rounded-md</div>
<div class="val-rounded-lg val-border">.val-rounded-lg</div>
<div class="val-rounded-pill val-border">.val-rounded-pill</div>
<div class="val-rounded-circle val-bg-primary val-text-white">Circle</div>`;

  shadowsHtml = `<div class="val-shadow-sm val-rounded val-p-3">Sombra Ligera</div>
<div class="val-shadow-md val-rounded val-p-3">Sombra Media</div>`;

  bordersHtml = `<div class="val-border">Sólido 1px</div>
<div class="val-border val-border-2">Sólido 2px</div>
<div class="val-border val-border-dashed">Dashed</div>
<div class="val-border val-border-dotted">Dotted</div>`;

  borderClasses: UtilityClass[] = [
    { name: 'val-border', css: 'border: 1px solid #dee2e6 !important', description: 'Aplica borde completo estándar de 1px', responsive: false },
    { name: 'val-border-top / bottom / left / right', css: 'border-{side}: 1px solid #dee2e6 !important', description: 'Borde en lado individual', responsive: false },
    { name: 'val-border-{0..5}', css: 'border-width: {n}px !important', description: 'Grosor de borde de 0 a 5px', responsive: false },
    { name: 'val-border-solid', css: 'border-style: solid !important', description: 'Estilo de borde continuo', responsive: false },
    { name: 'val-border-dashed', css: 'border-style: dashed !important', description: 'Estilo de borde discontinuo / guiones', responsive: false },
    { name: 'val-border-dotted', css: 'border-style: dotted !important', description: 'Estilo de borde punteado', responsive: false },
    { name: 'val-border-none', css: 'border-style: none !important', description: 'Remueve borde', responsive: false },
    { name: 'val-rounded', css: 'border-radius: var(--radius-md) !important', description: 'Bordes redondeados medianos estándar', responsive: true },
    { name: 'val-rounded-sm', css: 'border-radius: var(--radius-sm) !important', description: 'Bordes redondeados suaves (4px)', responsive: true },
    { name: 'val-rounded-md', css: 'border-radius: var(--radius-md) !important', description: 'Bordes redondeados medianos (6px)', responsive: true },
    { name: 'val-rounded-lg', css: 'border-radius: var(--radius-lg) !important', description: 'Bordes redondeados amplios (10px)', responsive: true },
    { name: 'val-rounded-circle', css: 'border-radius: 50% !important', description: 'Forma circular', responsive: true },
    { name: 'val-rounded-pill', css: 'border-radius: 50rem !important', description: 'Forma de píldora / pastilla', responsive: true },
    { name: 'val-rounded-none', css: 'border-radius: 0 !important', description: 'Esquinas rectas sin radio', responsive: true },
    { name: 'val-shadow-sm', css: 'box-shadow: var(--shadow-sm) !important', description: 'Sombra de elevación sutil para tarjetas', responsive: true },
    { name: 'val-shadow-md', css: 'box-shadow: var(--shadow-md) !important', description: 'Sombra de elevación media', responsive: true },
    { name: 'val-shadow-none', css: 'box-shadow: none !important', description: 'Remueve sombra', responsive: true }
  ];
}
