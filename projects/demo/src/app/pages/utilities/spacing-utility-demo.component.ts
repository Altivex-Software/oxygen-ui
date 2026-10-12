import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';

@Component({
  selector: 'app-spacing-utility-demo',
  standalone: true,
  imports: [CommonModule, DocCodeComponent, UtilityTableComponent],
  template: `
    <div class="val-page-container">
      <div class="val-header-hero">
        <h1 class="val-page-title">Espaciado (Margin, Padding & Gap)</h1>
        <p class="val-page-subtitle">
          Controla márgenes exteriores, rellenos interiores y separaciones entre elementos con la escala estándar (0 a 5) o la escala exacta en píxeles.
        </p>
      </div>

      <!-- DEMO 1: PADDING -->
      <app-doc-code
        title="1. Escala Estándar de Padding (.val-p-0..5, .val-px-*, .val-py-*)"
        description="Aplica relleno interior uniforme o por eje: val-p-1 (4px), val-p-2 (8px), val-p-3 (16px), val-p-4 (24px), val-p-5 (48px)."
        [html]="paddingHtml">
        <div class="val-demo-box">
          <div class="val-flex val-flex-wrap val-gap-3 val-align-items-center">
            <div class="val-pad-preview val-p-1">val-p-1 (0.25rem)</div>
            <div class="val-pad-preview val-p-2">val-p-2 (0.5rem)</div>
            <div class="val-pad-preview val-p-3">val-p-3 (1rem)</div>
            <div class="val-pad-preview val-p-4">val-p-4 (1.5rem)</div>
            <div class="val-pad-preview val-px-4 val-py-2">val-px-4 val-py-2</div>
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 2: PADDING Y MARGEN EN PÍXELES -->
      <app-doc-code
        title="2. Escala Exacta en Píxeles (.val-p-16px, .val-m-24px, .val-gap-32px)"
        description="Valores en px disponibles: 2, 4, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 100px."
        [html]="pixelsHtml">
        <div class="val-demo-box">
          <div class="val-flex val-flex-wrap val-gap-3 val-align-items-center">
            <div class="val-pad-preview val-p-8px">val-p-8px</div>
            <div class="val-pad-preview val-p-16px">val-p-16px</div>
            <div class="val-pad-preview val-p-24px">val-p-24px</div>
            <div class="val-pad-preview val-p-32px">val-p-32px</div>
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 3: GAP -->
      <app-doc-code
        title="3. Separación Gap en Flex & Grid (.val-gap-*)"
        description="Aplica separación uniforme entre elementos hijos sin usar márgenes manuales."
        [html]="gapHtml">
        <div class="val-demo-box">
          <div class="val-flex val-gap-3 val-p-3 val-bg-light val-rounded val-border">
            <div class="val-item-box">Item 1</div>
            <div class="val-item-box">Item 2</div>
            <div class="val-item-box">Item 3</div>
            <div class="val-item-box">Item 4</div>
          </div>
        </div>
      </app-doc-code>

      <!-- TABLA DE CLASES -->
      <app-utility-table 
        title="Referencia de Clases de Espaciado" 
        [classes]="spacingClasses">
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
    .val-pad-preview {
      background: #e0e7ff;
      border: 1px solid #c7d2fe;
      color: #3730a3;
      border-radius: 6px;
      font-size: 0.8125rem;
      font-weight: 600;
      text-align: center;
    }
    .val-item-box {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.8125rem;
      font-weight: 600;
      color: #334155;
    }
  `]
})
export class SpacingUtilityDemoComponent {
  paddingHtml = `<div class="val-p-1">val-p-1 (0.25rem)</div>
<div class="val-p-2">val-p-2 (0.5rem)</div>
<div class="val-p-3">val-p-3 (1rem)</div>
<div class="val-p-4">val-p-4 (1.5rem)</div>
<div class="val-px-4 val-py-2">val-px-4 val-py-2</div>`;

  pixelsHtml = `<div class="val-p-8px">val-p-8px</div>
<div class="val-p-16px">val-p-16px</div>
<div class="val-p-24px">val-p-24px</div>
<div class="val-p-32px">val-p-32px</div>`;

  gapHtml = `<div class="val-flex val-gap-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>`;

  spacingClasses: UtilityClass[] = [
    { name: 'val-m-{0..5|auto}', css: 'margin: {0 | 0.25rem | 0.5rem | 1rem | 1.5rem | 3rem | auto}', description: 'Margen exterior en los 4 lados', responsive: true },
    { name: 'val-mt-{0..5|auto}', css: 'margin-top: {val}', description: 'Margen superior', responsive: true },
    { name: 'val-mb-{0..5|auto}', css: 'margin-bottom: {val}', description: 'Margen inferior', responsive: true },
    { name: 'val-ms-{0..5|auto} / val-ml-*', css: 'margin-left: {val}', description: 'Margen izquierdo (start / left)', responsive: true },
    { name: 'val-me-{0..5|auto} / val-mr-*', css: 'margin-right: {val}', description: 'Margen derecho (end / right)', responsive: true },
    { name: 'val-mx-{0..5|auto}', css: 'margin-left & right: {val}', description: 'Margen horizontal simultáneo', responsive: true },
    { name: 'val-my-{0..5|auto}', css: 'margin-top & bottom: {val}', description: 'Margen vertical simultáneo', responsive: true },
    { name: 'val-p-{0..5}', css: 'padding: {0 | 0.25rem | 0.5rem | 1rem | 1.5rem | 3rem}', description: 'Padding interior en los 4 lados', responsive: true },
    { name: 'val-pt-{0..5}', css: 'padding-top: {val}', description: 'Padding superior', responsive: true },
    { name: 'val-pb-{0..5}', css: 'padding-bottom: {val}', description: 'Padding inferior', responsive: true },
    { name: 'val-ps-{0..5} / val-pl-*', css: 'padding-left: {val}', description: 'Padding izquierdo', responsive: true },
    { name: 'val-pe-{0..5} / val-pr-*', css: 'padding-right: {val}', description: 'Padding derecho', responsive: true },
    { name: 'val-px-{0..5}', css: 'padding-left & right: {val}', description: 'Padding horizontal simultáneo', responsive: true },
    { name: 'val-py-{0..5}', css: 'padding-top & bottom: {val}', description: 'Padding vertical simultáneo', responsive: true },
    { name: 'val-gap-{0..5}', css: 'gap: {val}', description: 'Espacio entre hijos flex o grid', responsive: true },
    { name: 'val-m-{2..100}px', css: 'margin: {n}px !important', description: 'Margen exacto en píxeles', responsive: true },
    { name: 'val-p-{2..100}px', css: 'padding: {n}px !important', description: 'Padding exacto en píxeles', responsive: true },
    { name: 'val-gap-{2..100}px', css: 'gap: {n}px !important', description: 'Gap exacto en píxeles', responsive: true }
  ];
}
