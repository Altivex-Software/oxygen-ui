import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';

@Component({
  selector: 'app-filters-utility-demo',
  standalone: true,
  imports: [CommonModule, DocCodeComponent, UtilityTableComponent],
  template: `
    <div class="ox-page-container">
      <div class="ox-header-hero">
        <h1 class="ox-page-title">Filtros & Glassmorphism</h1>
        <p class="ox-page-subtitle">
          Construye superficies de vidrio traslúcido (Glassmorphism) con backdrop-blur y ajusta desenfoques, brillo, contraste y sombras proyectadas.
        </p>
      </div>

      <!-- DEMO 1: GLASSMORPHISM / BACKDROP BLUR -->
      <app-doc-code
        title="1. Efecto Glassmorphism (.ox-backdrop-blur-*)"
        description="Aplica desenfoque al fondo detrás de un elemento con opacidad semi-transparente."
        [html]="glassHtml">
        <div class="ox-glass-background ox-rounded-lg ox-p-6 ox-flex ox-flex-wrap ox-gap-4">
          <div class="ox-glass-card ox-backdrop-blur-sm ox-rounded-md ox-p-4">
            <strong>.ox-backdrop-blur-sm</strong>
            <p class="ox-fs-xs ox-m-0">Blur suave de 4px</p>
          </div>
          <div class="ox-glass-card ox-backdrop-blur-md ox-rounded-md ox-p-4">
            <strong>.ox-backdrop-blur-md</strong>
            <p class="ox-fs-xs ox-m-0">Blur medio de 8px (Glass)</p>
          </div>
          <div class="ox-glass-card ox-backdrop-blur-lg ox-rounded-md ox-p-4">
            <strong>.ox-backdrop-blur-lg</strong>
            <p class="ox-fs-xs ox-m-0">Blur intenso de 16px</p>
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 2: FILTROS ESTÁNDAR -->
      <app-doc-code
        title="2. Desenfoque y Escala de Grises (.ox-blur-*, .ox-grayscale)"
        description="Filtros visuales directos sobre elementos o imágenes."
        [html]="filtersHtml">
        <div class="ox-demo-box ox-flex ox-flex-wrap ox-gap-4 ox-align-items-center">
          <div class="ox-preview-card ox-rounded-md ox-bg-primary ox-text-white ox-blur-sm">
            .ox-blur-sm
          </div>
          <div class="ox-preview-card ox-rounded-md ox-bg-success ox-text-white ox-grayscale">
            .ox-grayscale
          </div>
          <div class="ox-preview-card ox-rounded-md ox-bg-dark ox-text-white ox-brightness-75">
            .ox-brightness-75
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 3: DROP SHADOWS -->
      <app-doc-code
        title="3. Sombras Proyectadas (.ox-drop-shadow-*)"
        description="Sombras que respetan transparencias PNG o formas recortadas SVG."
        [html]="dropShadowHtml">
        <div class="ox-demo-box ox-flex ox-flex-wrap ox-gap-4">
          <div class="ox-preview-card ox-drop-shadow-sm ox-rounded-md ox-bg-white">.ox-drop-shadow-sm</div>
          <div class="ox-preview-card ox-drop-shadow-md ox-rounded-md ox-bg-white">.ox-drop-shadow-md</div>
          <div class="ox-preview-card ox-drop-shadow-lg ox-rounded-md ox-bg-white">.ox-drop-shadow-lg</div>
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
    .ox-glass-background {
      background: linear-gradient(135deg, #0066ff 0%, #0dcaf0 50%, #28a745 100%);
      min-height: 180px;
    }
    .ox-glass-card {
      background: rgba(255, 255, 255, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.4);
      color: #fff;
      min-width: 180px;
      text-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }
    .ox-demo-box {
      padding: 1.5rem;
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      border-radius: 8px;
    }
    .ox-preview-card {
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
  glassHtml = `<div class="ox-backdrop-blur-md ox-rounded-md" style="background: rgba(255,255,255,0.25); border: 1px solid rgba(255,255,255,0.4);">
  Tarjeta con efecto Glassmorphism
</div>`;

  filtersHtml = `<div class="ox-blur-sm">Desenfoque ligero</div>
<div class="ox-grayscale">Blanco y negro</div>
<div class="ox-brightness-75">Brillo reducido</div>`;

  dropShadowHtml = `<div class="ox-drop-shadow-md">Sombra proyectada SVG/PNG</div>`;

  filterClasses: UtilityClass[] = [
    { name: '.ox-backdrop-blur-none', css: 'backdrop-filter: blur(0)', description: 'Sin desenfoque de fondo', responsive: false },
    { name: '.ox-backdrop-blur-sm', css: 'backdrop-filter: blur(4px)', description: 'Backdrop blur suave', responsive: false },
    { name: '.ox-backdrop-blur / .ox-backdrop-blur-md', css: 'backdrop-filter: blur(8px)', description: 'Efecto cristal translúcido', responsive: false },
    { name: '.ox-backdrop-blur-lg', css: 'backdrop-filter: blur(16px)', description: 'Backdrop blur profundo', responsive: false },
    { name: '.ox-backdrop-blur-xl / 2xl', css: 'backdrop-filter: blur(24px / 40px)', description: 'Backdrop blur máximo', responsive: false },
    { name: '.ox-blur-none / sm / md / lg / xl / 2xl', css: 'filter: blur(...)', description: 'Desenfoque de elemento directo', responsive: false },
    { name: '.ox-brightness-50 / 75 / 100 / 125 / 150', css: 'filter: brightness(...)', description: 'Control de brillo', responsive: false },
    { name: '.ox-contrast-50 / 100 / 125 / 150 / 200', css: 'filter: contrast(...)', description: 'Control de contraste', responsive: false },
    { name: '.ox-grayscale / .ox-grayscale-0', css: 'filter: grayscale(100%) / grayscale(0)', description: 'Filtro escala de grises', responsive: false },
    { name: '.ox-drop-shadow-sm / md / lg / xl', css: 'filter: drop-shadow(...)', description: 'Sombra proyectada respetando canal alfa', responsive: false }
  ];
}
