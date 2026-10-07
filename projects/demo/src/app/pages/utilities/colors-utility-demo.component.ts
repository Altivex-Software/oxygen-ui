import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';

@Component({
  selector: 'app-colors-utility-demo',
  standalone: true,
  imports: [CommonModule, DocCodeComponent, UtilityTableComponent],
  template: `
    <div class="ox-page-container">
      <div class="ox-header-hero">
        <h1 class="ox-page-title">Colores & Fondos</h1>
        <p class="ox-page-subtitle">
          Paleta semántica integrada para texto, fondos y bordes conectada a las variables dinámicas de tema de Oxygen UI.
        </p>
      </div>

      <!-- DEMO 1: FONDOS SEMÁNTICOS -->
      <app-doc-code
        title="1. Colores de Fondo (.ox-bg-*)"
        description="Aplica colores temáticos a cajas, tarjetas o contenedores."
        [html]="bgColorsHtml">
        <div class="ox-demo-box ox-flex ox-flex-wrap ox-gap-2">
          <div class="ox-color-swatch ox-bg-primary ox-text-white">Primary (.ox-bg-primary)</div>
          <div class="ox-color-swatch ox-bg-secondary ox-text-white">Secondary (.ox-bg-secondary)</div>
          <div class="ox-color-swatch ox-bg-success ox-text-white">Success (.ox-bg-success)</div>
          <div class="ox-color-swatch ox-bg-danger ox-text-white">Danger (.ox-bg-danger)</div>
          <div class="ox-color-swatch ox-bg-warning ox-text-white">Warning (.ox-bg-warning)</div>
          <div class="ox-color-swatch ox-bg-info ox-text-white">Info (.ox-bg-info)</div>
          <div class="ox-color-swatch ox-bg-muted ox-text-white">Muted (.ox-bg-muted)</div>
          <div class="ox-color-swatch ox-bg-light ox-text-primary ox-border">Light (.ox-bg-light)</div>
        </div>
      </app-doc-code>

      <!-- DEMO 2: COLORES DE TEXTO -->
      <app-doc-code
        title="2. Colores de Texto (.ox-text-*)"
        description="Colores de texto semánticos para enfatizar mensajes, alertas o estados."
        [html]="textColorsHtml">
        <div class="ox-demo-box ox-bg-light ox-p-3 ox-rounded ox-border ox-flex ox-flex-column ox-gap-2">
          <span class="ox-text-primary ox-fw-bold">.ox-text-primary - Texto Primario</span>
          <span class="ox-text-secondary ox-fw-medium">.ox-text-secondary - Texto Secundario</span>
          <span class="ox-text-success ox-fw-bold">.ox-text-success - Operación Exitosa</span>
          <span class="ox-text-danger ox-fw-bold">.ox-text-danger - Error o Acción Crítica</span>
          <span class="ox-text-warning ox-fw-bold">.ox-text-warning - Advertencia</span>
          <span class="ox-text-info ox-fw-bold">.ox-text-info - Información</span>
          <span class="ox-text-muted">.ox-text-muted - Texto Atenuado</span>
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
    .ox-color-swatch {
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
  bgColorsHtml = `<div class="ox-bg-primary ox-text-white ox-p-3 ox-rounded">Primary</div>
<div class="ox-bg-secondary ox-text-white ox-p-3 ox-rounded">Secondary</div>
<div class="ox-bg-success ox-text-white ox-p-3 ox-rounded">Success</div>
<div class="ox-bg-danger ox-text-white ox-p-3 ox-rounded">Danger</div>
<div class="ox-bg-warning ox-text-white ox-p-3 ox-rounded">Warning</div>
<div class="ox-bg-info ox-text-white ox-p-3 ox-rounded">Info</div>
<div class="ox-bg-light ox-text-primary ox-border ox-p-3 ox-rounded">Light</div>`;

  textColorsHtml = `<span class="ox-text-primary">Texto Primario</span>
<span class="ox-text-secondary">Texto Secundario</span>
<span class="ox-text-success">Texto Éxito</span>
<span class="ox-text-danger">Texto Error</span>
<span class="ox-text-warning">Texto Advertencia</span>
<span class="ox-text-info">Texto Informativo</span>
<span class="ox-text-muted">Texto Muted</span>`;

  colorClasses: UtilityClass[] = [
    { name: 'ox-text-primary', css: 'color: var(--oxy-primary) !important', description: 'Color de texto principal de marca', responsive: true },
    { name: 'ox-text-secondary', css: 'color: var(--oxy-secondary) !important', description: 'Color de texto secundario', responsive: true },
    { name: 'ox-text-success', css: 'color: var(--oxy-success) !important', description: 'Color de texto verde para éxito', responsive: true },
    { name: 'ox-text-danger', css: 'color: var(--oxy-danger) !important', description: 'Color de texto rojo para errores y alertas', responsive: true },
    { name: 'ox-text-warning', css: 'color: var(--oxy-warning) !important', description: 'Color de texto amarillo para advertencias', responsive: true },
    { name: 'ox-text-info', css: 'color: var(--oxy-info) !important', description: 'Color de texto azul para información', responsive: true },
    { name: 'ox-text-muted', css: 'color: #6c757d !important', description: 'Color de texto atenuado / gris', responsive: true },
    { name: 'ox-text-white', css: 'color: #ffffff !important', description: 'Color de texto blanco', responsive: true },
    { name: 'ox-text-black', css: 'color: #000000 !important', description: 'Color de texto negro', responsive: true },
    { name: 'ox-bg-primary', css: 'background-color: var(--oxy-primary) !important', description: 'Fondo del color primario de marca', responsive: true },
    { name: 'ox-bg-secondary', css: 'background-color: var(--oxy-secondary) !important', description: 'Fondo secundario', responsive: true },
    { name: 'ox-bg-success', css: 'background-color: var(--oxy-success) !important', description: 'Fondo de éxito verde', responsive: true },
    { name: 'ox-bg-danger', css: 'background-color: var(--oxy-danger) !important', description: 'Fondo rojo de peligro/error', responsive: true },
    { name: 'ox-bg-warning', css: 'background-color: var(--oxy-warning) !important', description: 'Fondo amarillo de advertencia', responsive: true },
    { name: 'ox-bg-info', css: 'background-color: var(--oxy-info) !important', description: 'Fondo azul informativo', responsive: true },
    { name: 'ox-bg-light', css: 'background-color: #f8f9fa !important', description: 'Fondo neutro claro suave', responsive: false },
    { name: 'ox-border-primary', css: 'border-color: var(--oxy-primary) !important', description: 'Borde de color primario', responsive: true },
    { name: 'ox-border-danger', css: 'border-color: var(--oxy-danger) !important', description: 'Borde de color de peligro', responsive: true },
    { name: 'ox-border-success', css: 'border-color: var(--oxy-success) !important', description: 'Borde de color de éxito', responsive: true }
  ];
}
