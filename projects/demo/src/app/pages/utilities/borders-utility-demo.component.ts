import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';

@Component({
  selector: 'app-borders-utility-demo',
  standalone: true,
  imports: [CommonModule, DocCodeComponent, UtilityTableComponent],
  template: `
    <div class="ox-page-container">
      <div class="ox-header-hero">
        <h1 class="ox-page-title">Bordes, Sombras & Efectos</h1>
        <p class="ox-page-subtitle">
          Configura esquinas redondeadas (sm, md, lg, circle, pill), elevaciones con sombras de caja y grosores o estilos de borde.
        </p>
      </div>

      <!-- DEMO 1: BORDER RADIUS -->
      <app-doc-code
        title="1. Esquinas Redondeadas (.ox-rounded-*)"
        description="Escalas de radio: sm (4px), md (6px), lg (10px), circle (50%), pill (cápsula)."
        [html]="radiusHtml">
        <div class="ox-demo-box ox-flex ox-flex-wrap ox-gap-3 ox-align-items-center">
          <div class="ox-preview-card ox-rounded-none ox-border">.ox-rounded-none</div>
          <div class="ox-preview-card ox-rounded-sm ox-border">.ox-rounded-sm (4px)</div>
          <div class="ox-preview-card ox-rounded-md ox-border">.ox-rounded-md (6px)</div>
          <div class="ox-preview-card ox-rounded-lg ox-border">.ox-rounded-lg (10px)</div>
          <div class="ox-preview-card ox-rounded-pill ox-border ox-px-4">.ox-rounded-pill</div>
          <div class="ox-circle-card ox-rounded-circle ox-bg-primary ox-text-white">Circle</div>
        </div>
      </app-doc-code>

      <!-- DEMO 2: SOMBRAS Y ELEVACIÓN -->
      <app-doc-code
        title="2. Sombras de Elevación (.ox-shadow-*)"
        description="Sombras suaves para tarjetas, modales y botones elevados."
        [html]="shadowsHtml">
        <div class="ox-demo-box ox-flex ox-flex-wrap ox-gap-3">
          <div class="ox-preview-card ox-shadow-sm ox-rounded">.ox-shadow-sm</div>
          <div class="ox-preview-card ox-shadow-md ox-rounded">.ox-shadow-md</div>
        </div>
      </app-doc-code>

      <!-- DEMO 3: ESTILOS DE BORDE -->
      <app-doc-code
        title="3. Estilos y Grosores de Borde (.ox-border, .ox-border-dashed, .ox-border-2)"
        description="Bordes sólidos, punteados, dobles y grosores de 0 a 5 píxeles."
        [html]="bordersHtml">
        <div class="ox-demo-box ox-flex ox-flex-wrap ox-gap-3">
          <div class="ox-preview-card ox-border">.ox-border</div>
          <div class="ox-preview-card ox-border ox-border-2">.ox-border-2</div>
          <div class="ox-preview-card ox-border ox-border-dashed">.ox-border-dashed</div>
          <div class="ox-preview-card ox-border ox-border-dotted">.ox-border-dotted</div>
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
    .ox-preview-card {
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
    .ox-circle-card {
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
  radiusHtml = `<div class="ox-rounded-sm ox-border">.ox-rounded-sm</div>
<div class="ox-rounded-md ox-border">.ox-rounded-md</div>
<div class="ox-rounded-lg ox-border">.ox-rounded-lg</div>
<div class="ox-rounded-pill ox-border">.ox-rounded-pill</div>
<div class="ox-rounded-circle ox-bg-primary ox-text-white">Circle</div>`;

  shadowsHtml = `<div class="ox-shadow-sm ox-rounded ox-p-3">Sombra Ligera</div>
<div class="ox-shadow-md ox-rounded ox-p-3">Sombra Media</div>`;

  bordersHtml = `<div class="ox-border">Sólido 1px</div>
<div class="ox-border ox-border-2">Sólido 2px</div>
<div class="ox-border ox-border-dashed">Dashed</div>
<div class="ox-border ox-border-dotted">Dotted</div>`;

  borderClasses: UtilityClass[] = [
    { name: 'ox-border', css: 'border: 1px solid #dee2e6 !important', description: 'Aplica borde completo estándar de 1px', responsive: false },
    { name: 'ox-border-top / bottom / left / right', css: 'border-{side}: 1px solid #dee2e6 !important', description: 'Borde en lado individual', responsive: false },
    { name: 'ox-border-{0..5}', css: 'border-width: {n}px !important', description: 'Grosor de borde de 0 a 5px', responsive: false },
    { name: 'ox-border-solid', css: 'border-style: solid !important', description: 'Estilo de borde continuo', responsive: false },
    { name: 'ox-border-dashed', css: 'border-style: dashed !important', description: 'Estilo de borde discontinuo / guiones', responsive: false },
    { name: 'ox-border-dotted', css: 'border-style: dotted !important', description: 'Estilo de borde punteado', responsive: false },
    { name: 'ox-border-none', css: 'border-style: none !important', description: 'Remueve borde', responsive: false },
    { name: 'ox-rounded', css: 'border-radius: var(--radius-md) !important', description: 'Bordes redondeados medianos estándar', responsive: true },
    { name: 'ox-rounded-sm', css: 'border-radius: var(--radius-sm) !important', description: 'Bordes redondeados suaves (4px)', responsive: true },
    { name: 'ox-rounded-md', css: 'border-radius: var(--radius-md) !important', description: 'Bordes redondeados medianos (6px)', responsive: true },
    { name: 'ox-rounded-lg', css: 'border-radius: var(--radius-lg) !important', description: 'Bordes redondeados amplios (10px)', responsive: true },
    { name: 'ox-rounded-circle', css: 'border-radius: 50% !important', description: 'Forma circular', responsive: true },
    { name: 'ox-rounded-pill', css: 'border-radius: 50rem !important', description: 'Forma de píldora / pastilla', responsive: true },
    { name: 'ox-rounded-none', css: 'border-radius: 0 !important', description: 'Esquinas rectas sin radio', responsive: true },
    { name: 'ox-shadow-sm', css: 'box-shadow: var(--shadow-sm) !important', description: 'Sombra de elevación sutil para tarjetas', responsive: true },
    { name: 'ox-shadow-md', css: 'box-shadow: var(--shadow-md) !important', description: 'Sombra de elevación media', responsive: true },
    { name: 'ox-shadow-none', css: 'box-shadow: none !important', description: 'Remueve sombra', responsive: true }
  ];
}
