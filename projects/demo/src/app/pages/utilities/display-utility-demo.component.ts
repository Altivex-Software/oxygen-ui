import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';

@Component({
  selector: 'app-display-utility-demo',
  standalone: true,
  imports: [CommonModule, IconComponent, DocCodeComponent, UtilityTableComponent],
  template: `
    <div class="ox-page-container">
      <div class="ox-header-hero">
        <h1 class="ox-page-title">Display & Visibilidad</h1>
        <p class="ox-page-subtitle">
          Controla la visualización de elementos (none, block, inline, inline-block, flex, grid) y alterna la visibilidad según el dispositivo.
        </p>
      </div>

      <!-- DEMO 1: VISIBILIDAD RESPONSIVA -->
      <app-doc-code
        title="1. Mostrar / Ocultar según Pantalla (.ox-d-none, .ox-d-md-block)"
        description="Oculta un elemento en móviles y muéstralo únicamente a partir de tablets o pantallas medianas."
        [html]="respDisplayHtml">
        <div class="ox-demo-box ox-flex ox-flex-column ox-gap-2">
          <div class="ox-disp-card ox-d-none ox-d-md-block" style="display: flex; align-items: center; gap: 8px;">
            <ox-icon name="monitor" size="sm" color="primary"></ox-icon>
            <span>Visible únicamente en pantallas medianas o mayores (≥ 768px: <code>.ox-d-none .ox-d-md-block</code>)</span>
          </div>
          <div class="ox-disp-card ox-d-block ox-d-md-none" style="display: flex; align-items: center; gap: 8px;">
            <ox-icon name="smartphone" size="sm" color="primary"></ox-icon>
            <span>Visible únicamente en dispositivos móviles (&lt; 768px: <code>.ox-d-block .ox-d-md-none</code>)</span>
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 2: INLINE VS BLOCK -->
      <app-doc-code
        title="2. Modos Display (.ox-d-inline-block, .ox-d-flex, .ox-d-grid)"
        description="Cambia el comportamiento de visualización entre bloque, línea y contenedores."
        [html]="displayModesHtml">
        <div class="ox-demo-box">
          <div class="ox-d-inline-block ox-p-2 ox-bg-light ox-border ox-rounded ox-mr-2">Inline Block 1</div>
          <div class="ox-d-inline-block ox-p-2 ox-bg-light ox-border ox-rounded">Inline Block 2</div>
        </div>
      </app-doc-code>

      <!-- TABLA DE CLASES -->
      <app-utility-table 
        title="Referencia de Clases Display" 
        [classes]="displayClasses">
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
    .ox-disp-card {
      padding: 0.75rem 1rem;
      background: #e0e7ff;
      border: 1px solid #c7d2fe;
      color: #3730a3;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 600;
    }
  `]
})
export class DisplayUtilityDemoComponent {
  respDisplayHtml = `<div class="ox-d-none ox-d-md-block">
  Solo visible en pantallas >= 768px
</div>
<div class="ox-d-block ox-d-md-none">
  Solo visible en móviles < 768px
</div>`;

  displayModesHtml = `<div class="ox-d-inline-block">Inline Block 1</div>
<div class="ox-d-inline-block">Inline Block 2</div>`;

  displayClasses: UtilityClass[] = [
    { name: 'ox-d-none', css: 'display: none !important', description: 'Oculta el elemento', responsive: true },
    { name: 'ox-d-block', css: 'display: block !important', description: 'Muestra como elemento de bloque', responsive: true },
    { name: 'ox-d-inline', css: 'display: inline !important', description: 'Muestra como elemento en línea', responsive: true },
    { name: 'ox-d-inline-block', css: 'display: inline-block !important', description: 'Muestra como bloque en línea', responsive: true },
    { name: 'ox-d-flex', css: 'display: flex !important', description: 'Muestra como contenedor flexbox', responsive: true },
    { name: 'ox-d-inline-flex', css: 'display: inline-flex !important', description: 'Muestra como contenedor inline flex', responsive: true },
    { name: 'ox-d-grid', css: 'display: grid !important', description: 'Muestra como contenedor CSS grid', responsive: true },
    { name: 'ox-hide-up-md', css: 'display: none !important en pantallas >= 768px', description: 'Oculta a partir de pantallas medianas', responsive: false },
    { name: 'ox-show-only-sm', css: 'display: block !important solo entre 576px y 768px', description: 'Muestra únicamente en resolución sm', responsive: false }
  ];
}
