import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';

@Component({
  selector: 'app-colors-utility-demo',
  standalone: true,
  imports: [CommonModule, DocCodeComponent, UtilityTableComponent],
  template: `
    <div class="val-page-container">
      <div class="val-header-hero">
        <h1 class="val-page-title">Colores & Fondos</h1>
        <p class="val-page-subtitle">
          Paleta semántica integrada para texto, fondos y bordes conectada a las variables dinámicas de tema de Valence UI.
        </p>
      </div>

      <!-- DEMO 1: FONDOS SEMÁNTICOS -->
      <app-doc-code
        title="1. Colores de Fondo (.val-bg-*)"
        description="Aplica colores temáticos a cajas, tarjetas o contenedores."
        [html]="bgColorsHtml">
        <div class="val-demo-box val-flex val-flex-wrap val-gap-2">
          <div class="val-color-swatch val-bg-primary val-text-white">Primary (.val-bg-primary)</div>
          <div class="val-color-swatch val-bg-secondary val-text-white">Secondary (.val-bg-secondary)</div>
          <div class="val-color-swatch val-bg-success val-text-white">Success (.val-bg-success)</div>
          <div class="val-color-swatch val-bg-danger val-text-white">Danger (.val-bg-danger)</div>
          <div class="val-color-swatch val-bg-warning val-text-white">Warning (.val-bg-warning)</div>
          <div class="val-color-swatch val-bg-info val-text-white">Info (.val-bg-info)</div>
          <div class="val-color-swatch val-bg-muted val-text-white">Muted (.val-bg-muted)</div>
          <div class="val-color-swatch val-bg-light val-text-primary val-border">Light (.val-bg-light)</div>
        </div>
      </app-doc-code>

      <!-- DEMO 2: COLORES DE TEXTO -->
      <app-doc-code
        title="2. Colores de Texto (.val-text-*)"
        description="Colores de texto semánticos para enfatizar mensajes, alertas o estados."
        [html]="textColorsHtml">
        <div class="val-demo-box val-bg-light val-p-3 val-rounded val-border val-flex val-flex-column val-gap-2">
          <span class="val-text-primary val-fw-bold">.val-text-primary - Texto Primario</span>
          <span class="val-text-secondary val-fw-medium">.val-text-secondary - Texto Secundario</span>
          <span class="val-text-success val-fw-bold">.val-text-success - Operación Exitosa</span>
          <span class="val-text-danger val-fw-bold">.val-text-danger - Error o Acción Crítica</span>
          <span class="val-text-warning val-fw-bold">.val-text-warning - Advertencia</span>
          <span class="val-text-info val-fw-bold">.val-text-info - Información</span>
          <span class="val-text-muted">.val-text-muted - Texto Atenuado</span>
        </div>
      </app-doc-code>

      <!-- TABLA DE CLASES -->
      <app-utility-table 
        title="Referencia de Clases de Color" 
        [classes]="colorClasses">
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
    .val-color-swatch {
      padding: 1rem 1.25rem;
      border-radius: 8px;
      font-size: 0.8125rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 140px;
    }
  `]
})
export class ColorsUtilityDemoComponent {
  bgColorsHtml = `<div class="val-bg-primary val-text-white val-p-3 val-rounded">Primary</div>
<div class="val-bg-secondary val-text-white val-p-3 val-rounded">Secondary</div>
<div class="val-bg-success val-text-white val-p-3 val-rounded">Success</div>
<div class="val-bg-danger val-text-white val-p-3 val-rounded">Danger</div>
<div class="val-bg-warning val-text-white val-p-3 val-rounded">Warning</div>
<div class="val-bg-info val-text-white val-p-3 val-rounded">Info</div>
<div class="val-bg-light val-text-primary val-border val-p-3 val-rounded">Light</div>`;

  textColorsHtml = `<span class="val-text-primary">Texto Primario</span>
<span class="val-text-secondary">Texto Secundario</span>
<span class="val-text-success">Texto Éxito</span>
<span class="val-text-danger">Texto Error</span>
<span class="val-text-warning">Texto Advertencia</span>
<span class="val-text-info">Texto Informativo</span>
<span class="val-text-muted">Texto Muted</span>`;

  colorClasses: UtilityClass[] = [
    { name: 'val-text-primary', css: 'color: var(--val-primary) !important', description: 'Color de texto principal de marca', responsive: true },
    { name: 'val-text-secondary', css: 'color: var(--val-secondary) !important', description: 'Color de texto secundario', responsive: true },
    { name: 'val-text-success', css: 'color: var(--val-success) !important', description: 'Color de texto verde para éxito', responsive: true },
    { name: 'val-text-danger', css: 'color: var(--val-danger) !important', description: 'Color de texto rojo para errores y alertas', responsive: true },
    { name: 'val-text-warning', css: 'color: var(--val-warning) !important', description: 'Color de texto amarillo para advertencias', responsive: true },
    { name: 'val-text-info', css: 'color: var(--val-info) !important', description: 'Color de texto azul para información', responsive: true },
    { name: 'val-text-muted', css: 'color: #6c757d !important', description: 'Color de texto atenuado / gris', responsive: true },
    { name: 'val-text-white', css: 'color: #ffffff !important', description: 'Color de texto blanco', responsive: true },
    { name: 'val-text-black', css: 'color: #000000 !important', description: 'Color de texto negro', responsive: true },
    { name: 'val-bg-primary', css: 'background-color: var(--val-primary) !important', description: 'Fondo del color primario de marca', responsive: true },
    { name: 'val-bg-secondary', css: 'background-color: var(--val-secondary) !important', description: 'Fondo secundario', responsive: true },
    { name: 'val-bg-success', css: 'background-color: var(--val-success) !important', description: 'Fondo de éxito verde', responsive: true },
    { name: 'val-bg-danger', css: 'background-color: var(--val-danger) !important', description: 'Fondo rojo de peligro/error', responsive: true },
    { name: 'val-bg-warning', css: 'background-color: var(--val-warning) !important', description: 'Fondo amarillo de advertencia', responsive: true },
    { name: 'val-bg-info', css: 'background-color: var(--val-info) !important', description: 'Fondo azul informativo', responsive: true },
    { name: 'val-bg-light', css: 'background-color: #f8f9fa !important', description: 'Fondo neutro claro suave', responsive: false },
    { name: 'val-border-primary', css: 'border-color: var(--val-primary) !important', description: 'Borde de color primario', responsive: true },
    { name: 'val-border-danger', css: 'border-color: var(--val-danger) !important', description: 'Borde de color de peligro', responsive: true },
    { name: 'val-border-success', css: 'border-color: var(--val-success) !important', description: 'Borde de color de éxito', responsive: true }
  ];
}
