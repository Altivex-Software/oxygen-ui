import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';

@Component({
  selector: 'app-filters-utility-demo',
  standalone: true,
  imports: [CommonModule, DocCodeComponent, UtilityTableComponent],
  template: `
    <div class="val-page-container">
      <div class="val-header-hero">
        <h1 class="val-page-title">Filtros & Glassmorphism</h1>
        <p class="val-page-subtitle">
          Construye superficies de vidrio traslúcido (Glassmorphism) con backdrop-blur y ajusta desenfoques, brillo, contraste y sombras proyectadas.
        </p>
      </div>

      <!-- DEMO 1: GLASSMORPHISM / BACKDROP BLUR -->
      <app-doc-code
        title="1. Efecto Glassmorphism (.val-backdrop-blur-*)"
        description="Aplica desenfoque al fondo detrás de un elemento con opacidad semi-transparente."
        [html]="glassHtml">
        <div class="val-glass-background val-rounded-lg val-p-6 val-flex val-flex-wrap val-gap-4">
          <div class="val-glass-card val-backdrop-blur-sm val-rounded-md val-p-4">
            <strong>.val-backdrop-blur-sm</strong>
            <p class="val-fs-xs val-m-0">Blur suave de 4px</p>
          </div>
          <div class="val-glass-card val-backdrop-blur-md val-rounded-md val-p-4">
            <strong>.val-backdrop-blur-md</strong>
            <p class="val-fs-xs val-m-0">Blur medio de 8px (Glass)</p>
          </div>
          <div class="val-glass-card val-backdrop-blur-lg val-rounded-md val-p-4">
            <strong>.val-backdrop-blur-lg</strong>
            <p class="val-fs-xs val-m-0">Blur intenso de 16px</p>
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 2: FILTROS ESTÁNDAR -->
      <app-doc-code
        title="2. Desenfoque y Escala de Grises (.val-blur-*, .val-grayscale)"
        description="Filtros visuales directos sobre elementos o imágenes."
        [html]="filtersHtml">
        <div class="val-demo-box val-flex val-flex-wrap val-gap-4 val-align-items-center">
          <div class="val-preview-card val-rounded-md val-bg-primary val-text-white val-blur-sm">
            .val-blur-sm
          </div>
          <div class="val-preview-card val-rounded-md val-bg-success val-text-white val-grayscale">
            .val-grayscale
          </div>
          <div class="val-preview-card val-rounded-md val-bg-dark val-text-white val-brightness-75">
            .val-brightness-75
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 3: DROP SHADOWS -->
      <app-doc-code
        title="3. Sombras Proyectadas (.val-drop-shadow-*)"
        description="Sombras que respetan transparencias PNG o formas recortadas SVG."
        [html]="dropShadowHtml">
        <div class="val-demo-box val-flex val-flex-wrap val-gap-4">
          <div class="val-preview-card val-drop-shadow-sm val-rounded-md val-bg-white">.val-drop-shadow-sm</div>
          <div class="val-preview-card val-drop-shadow-md val-rounded-md val-bg-white">.val-drop-shadow-md</div>
          <div class="val-preview-card val-drop-shadow-lg val-rounded-md val-bg-white">.val-drop-shadow-lg</div>
        </div>
      </app-doc-code>

      <!-- TABLA DE CLASES -->
      <app-utility-table 
        title="Referencia de Clases de Filtros & Backdrop" 
        [classes]="filterClasses">
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
    .val-glass-background {
      background: linear-gradient(135deg, #0066ff 0%, #0dcaf0 50%, #28a745 100%);
      min-height: 180px;
    }
    .val-glass-card {
      background: rgba(255, 255, 255, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.4);
      color: #fff;
      min-width: 180px;
      text-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }
    .val-demo-box {
      padding: 1.5rem;
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      border-radius: 8px;
    }
    .val-preview-card {
      padding: 1rem 1.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #fff;
    }
  `]
})
export class FiltersUtilityDemoComponent {
  glassHtml = `<div class="val-backdrop-blur-md val-rounded-md" style="background: rgba(255,255,255,0.25); border: 1px solid rgba(255,255,255,0.4);">
  Tarjeta con efecto Glassmorphism
</div>`;

  filtersHtml = `<div class="val-blur-sm">Desenfoque ligero</div>
<div class="val-grayscale">Blanco y negro</div>
<div class="val-brightness-75">Brillo reducido</div>`;

  dropShadowHtml = `<div class="val-drop-shadow-md">Sombra proyectada SVG/PNG</div>`;

  filterClasses: UtilityClass[] = [
    { name: '.val-backdrop-blur-none', css: 'backdrop-filter: blur(0)', description: 'Sin desenfoque de fondo', responsive: false },
    { name: '.val-backdrop-blur-sm', css: 'backdrop-filter: blur(4px)', description: 'Backdrop blur suave', responsive: false },
    { name: '.val-backdrop-blur / .val-backdrop-blur-md', css: 'backdrop-filter: blur(8px)', description: 'Efecto cristal translúcido', responsive: false },
    { name: '.val-backdrop-blur-lg', css: 'backdrop-filter: blur(16px)', description: 'Backdrop blur profundo', responsive: false },
    { name: '.val-backdrop-blur-xl / 2xl', css: 'backdrop-filter: blur(24px / 40px)', description: 'Backdrop blur máximo', responsive: false },
    { name: '.val-blur-none / sm / md / lg / xl / 2xl', css: 'filter: blur(...)', description: 'Desenfoque de elemento directo', responsive: false },
    { name: '.val-brightness-50 / 75 / 100 / 125 / 150', css: 'filter: brightness(...)', description: 'Control de brillo', responsive: false },
    { name: '.val-contrast-50 / 100 / 125 / 150 / 200', css: 'filter: contrast(...)', description: 'Control de contraste', responsive: false },
    { name: '.val-grayscale / .val-grayscale-0', css: 'filter: grayscale(100%) / grayscale(0)', description: 'Filtro escala de grises', responsive: false },
    { name: '.val-drop-shadow-sm / md / lg / xl', css: 'filter: drop-shadow(...)', description: 'Sombra proyectada respetando canal alfa', responsive: false }
  ];
}
