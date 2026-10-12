import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';

@Component({
  selector: 'app-position-utility-demo',
  standalone: true,
  imports: [CommonModule, DocCodeComponent, UtilityTableComponent],
  template: `
    <div class="val-page-container">
      <div class="val-header-hero">
        <h1 class="val-page-title">Posicionamiento & Centrado</h1>
        <p class="val-page-subtitle">
          Ubica elementos con relative, absolute, fixed, sticky y utiliza utilidades de centrado automático con <code>.val-translate-middle</code>.
        </p>
      </div>

      <!-- DEMO 1: BADGE EN ESQUINA -->
      <app-doc-code
        title="1. Insignia en Esquina (.val-top-0, .val-start-100, .val-translate-middle)"
        description="Fija una insignia o etiqueta exactamente en la esquina superior derecha."
        [html]="cornerBadgeHtml">
        <div class="val-demo-box val-flex val-gap-4">
          <div class="val-target-box val-position-relative val-p-4 val-bg-light val-border val-rounded">
            <span>Elemento Contenedor</span>
            <span class="val-pinned-badge val-position-absolute val-top-0 val-start-100 val-translate-middle val-bg-danger val-text-white val-rounded-pill val-px-2">
              99+
            </span>
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 2: CENTRADO ABSOLUTO -->
      <app-doc-code
        title="2. Centrado Absoluto 50/50 (.val-top-50, .val-start-50, .val-translate-middle)"
        description="Centra perfectamente cualquier elemento dentro de su padre relativo."
        [html]="centerHtml">
        <div class="val-demo-box">
          <div class="val-target-box val-position-relative val-bg-light val-border val-rounded" style="height: 120px;">
            <div class="val-position-absolute val-top-50 val-start-50 val-translate-middle val-bg-primary val-text-white val-px-3 val-py-2 val-rounded">
              Centro Exacto
            </div>
          </div>
        </div>
      </app-doc-code>

      <!-- TABLA DE CLASES -->
      <app-utility-table 
        title="Referencia de Clases de Posicionamiento" 
        [classes]="positionClasses">
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
    .val-target-box {
      min-width: 250px;
      font-size: 0.875rem;
      color: #334155;
    }
    .val-pinned-badge {
      font-size: 0.75rem;
      font-weight: 700;
    }
  `]
})
export class PositionUtilityDemoComponent {
  cornerBadgeHtml = `<div class="val-position-relative val-p-4 val-bg-light val-border val-rounded">
  <span>Contenedor</span>
  <span class="val-position-absolute val-top-0 val-start-100 val-translate-middle val-bg-danger val-text-white val-rounded-pill val-px-2">
    99+
  </span>
</div>`;

  centerHtml = `<div class="val-position-relative" style="height: 120px;">
  <div class="val-position-absolute val-top-50 val-start-50 val-translate-middle val-bg-primary val-text-white val-px-3 val-py-2 val-rounded">
    Centro Exacto
  </div>
</div>`;

  positionClasses: UtilityClass[] = [
    { name: 'val-position-relative', css: 'position: relative !important', description: 'Posicionamiento relativo', responsive: true },
    { name: 'val-position-absolute', css: 'position: absolute !important', description: 'Posicionamiento absoluto', responsive: true },
    { name: 'val-position-fixed', css: 'position: fixed !important', description: 'Posicionamiento fijado en pantalla', responsive: true },
    { name: 'val-position-sticky', css: 'position: sticky !important', description: 'Posicionamiento pegajoso al scroll', responsive: true },
    { name: 'val-position-static', css: 'position: static !important', description: 'Posicionamiento estático de flujo', responsive: true },
    { name: 'val-top-0 / 50 / 100', css: 'top: 0 / 50% / 100% !important', description: 'Coordenada superior porcentual', responsive: true },
    { name: 'val-bottom-0 / 50 / 100', css: 'bottom: 0 / 50% / 100% !important', description: 'Coordenada inferior porcentual', responsive: true },
    { name: 'val-start-0 / 50 / 100', css: 'left: 0 / 50% / 100% !important', description: 'Coordenada izquierda (start)', responsive: true },
    { name: 'val-end-0 / 50 / 100', css: 'right: 0 / 50% / 100% !important', description: 'Coordenada derecha (end)', responsive: true },
    { name: 'val-inset-x-0', css: 'left: 0; right: 0 !important', description: 'Ocupa el 100% del ancho horizontal', responsive: true },
    { name: 'val-inset-y-0', css: 'top: 0; bottom: 0 !important', description: 'Ocupa el 100% del alto vertical', responsive: true },
    { name: 'val-translate-middle', css: 'transform: translate(-50%, -50%) !important', description: 'Centra elemento en coordenadas 50%/50%', responsive: true },
    { name: 'val-translate-middle-x', css: 'transform: translateX(-50%) !important', description: 'Centra horizontalmente en coordenada X', responsive: true },
    { name: 'val-translate-middle-y', css: 'transform: translateY(-50%) !important', description: 'Centra verticalmente en coordenada Y', responsive: true }
  ];
}
