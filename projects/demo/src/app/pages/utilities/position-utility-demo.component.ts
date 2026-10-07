import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';

@Component({
  selector: 'app-position-utility-demo',
  standalone: true,
  imports: [CommonModule, DocCodeComponent, UtilityTableComponent],
  template: `
    <div class="ox-page-container">
      <div class="ox-header-hero">
        <h1 class="ox-page-title">Posicionamiento & Centrado</h1>
        <p class="ox-page-subtitle">
          Ubica elementos con relative, absolute, fixed, sticky y utiliza utilidades de centrado automático con <code>.ox-translate-middle</code>.
        </p>
      </div>

      <!-- DEMO 1: BADGE EN ESQUINA -->
      <app-doc-code
        title="1. Insignia en Esquina (.ox-top-0, .ox-start-100, .ox-translate-middle)"
        description="Fija una insignia o etiqueta exactamente en la esquina superior derecha."
        [html]="cornerBadgeHtml">
        <div class="ox-demo-box ox-flex ox-gap-4">
          <div class="ox-target-box ox-position-relative ox-p-4 ox-bg-light ox-border ox-rounded">
            <span>Elemento Contenedor</span>
            <span class="ox-pinned-badge ox-position-absolute ox-top-0 ox-start-100 ox-translate-middle ox-bg-danger ox-text-white ox-rounded-pill ox-px-2">
              99+
            </span>
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 2: CENTRADO ABSOLUTO -->
      <app-doc-code
        title="2. Centrado Absoluto 50/50 (.ox-top-50, .ox-start-50, .ox-translate-middle)"
        description="Centra perfectamente cualquier elemento dentro de su padre relativo."
        [html]="centerHtml">
        <div class="ox-demo-box">
          <div class="ox-target-box ox-position-relative ox-bg-light ox-border ox-rounded" style="height: 120px;">
            <div class="ox-position-absolute ox-top-50 ox-start-50 ox-translate-middle ox-bg-primary ox-text-white ox-px-3 ox-py-2 ox-rounded">
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
    .ox-target-box {
      min-width: 250px;
      font-size: 0.875rem;
      color: #334155;
    }
    .ox-pinned-badge {
      font-size: 0.75rem;
      font-weight: 700;
    }
  `]
})
export class PositionUtilityDemoComponent {
  cornerBadgeHtml = `<div class="ox-position-relative ox-p-4 ox-bg-light ox-border ox-rounded">
  <span>Contenedor</span>
  <span class="ox-position-absolute ox-top-0 ox-start-100 ox-translate-middle ox-bg-danger ox-text-white ox-rounded-pill ox-px-2">
    99+
  </span>
</div>`;

  centerHtml = `<div class="ox-position-relative" style="height: 120px;">
  <div class="ox-position-absolute ox-top-50 ox-start-50 ox-translate-middle ox-bg-primary ox-text-white ox-px-3 ox-py-2 ox-rounded">
    Centro Exacto
  </div>
</div>`;

  positionClasses: UtilityClass[] = [
    { name: 'ox-position-relative', css: 'position: relative !important', description: 'Posicionamiento relativo', responsive: true },
    { name: 'ox-position-absolute', css: 'position: absolute !important', description: 'Posicionamiento absoluto', responsive: true },
    { name: 'ox-position-fixed', css: 'position: fixed !important', description: 'Posicionamiento fijado en pantalla', responsive: true },
    { name: 'ox-position-sticky', css: 'position: sticky !important', description: 'Posicionamiento pegajoso al scroll', responsive: true },
    { name: 'ox-position-static', css: 'position: static !important', description: 'Posicionamiento estático de flujo', responsive: true },
    { name: 'ox-top-0 / 50 / 100', css: 'top: 0 / 50% / 100% !important', description: 'Coordenada superior porcentual', responsive: true },
    { name: 'ox-bottom-0 / 50 / 100', css: 'bottom: 0 / 50% / 100% !important', description: 'Coordenada inferior porcentual', responsive: true },
    { name: 'ox-start-0 / 50 / 100', css: 'left: 0 / 50% / 100% !important', description: 'Coordenada izquierda (start)', responsive: true },
    { name: 'ox-end-0 / 50 / 100', css: 'right: 0 / 50% / 100% !important', description: 'Coordenada derecha (end)', responsive: true },
    { name: 'ox-inset-x-0', css: 'left: 0; right: 0 !important', description: 'Ocupa el 100% del ancho horizontal', responsive: true },
    { name: 'ox-inset-y-0', css: 'top: 0; bottom: 0 !important', description: 'Ocupa el 100% del alto vertical', responsive: true },
    { name: 'ox-translate-middle', css: 'transform: translate(-50%, -50%) !important', description: 'Centra elemento en coordenadas 50%/50%', responsive: true },
    { name: 'ox-translate-middle-x', css: 'transform: translateX(-50%) !important', description: 'Centra horizontalmente en coordenada X', responsive: true },
    { name: 'ox-translate-middle-y', css: 'transform: translateY(-50%) !important', description: 'Centra verticalmente en coordenada Y', responsive: true }
  ];
}
