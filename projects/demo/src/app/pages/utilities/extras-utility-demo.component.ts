import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';

@Component({
  selector: 'app-extras-utility-demo',
  standalone: true,
  imports: [CommonModule, DocCodeComponent, UtilityTableComponent],
  template: `
    <div class="ox-page-container">
      <div class="ox-header-hero">
        <h1 class="ox-page-title">Extras & Misceláneos</h1>
        <p class="ox-page-subtitle">
          Utilidades de capas Z-Index, niveles de opacidad, ajuste de imágenes (object-fit), flotados, clearfix y alineación vertical.
        </p>
      </div>

      <!-- DEMO 1: OPACIDAD -->
      <app-doc-code
        title="1. Opacidad (.ox-opacity-0, .ox-opacity-25, .ox-opacity-50, .ox-opacity-75, .ox-opacity-100)"
        description="Ajusta los niveles de transparencia de cualquier elemento."
        [html]="opacityHtml">
        <div class="ox-demo-box ox-flex ox-gap-3 ox-flex-wrap">
          <div class="ox-box ox-bg-primary ox-text-white ox-opacity-100">100%</div>
          <div class="ox-box ox-bg-primary ox-text-white ox-opacity-75">75%</div>
          <div class="ox-box ox-bg-primary ox-text-white ox-opacity-50">50%</div>
          <div class="ox-box ox-bg-primary ox-text-white ox-opacity-25">25%</div>
        </div>
      </app-doc-code>

      <!-- DEMO 2: OBJECT FIT -->
      <app-doc-code
        title="2. Ajuste de Contenido (.ox-object-cover, .ox-object-contain)"
        description="Controla cómo se escala y recorta una imagen o video dentro de un contenedor fijo."
        [html]="objectFitHtml">
        <div class="ox-demo-box ox-flex ox-gap-3 ox-flex-wrap">
          <div class="ox-img-box ox-rounded ox-border ox-bg-light ox-flex ox-align-items-center ox-justify-content-center">
            <code>.ox-object-cover</code>
          </div>
          <div class="ox-img-box ox-rounded ox-border ox-bg-light ox-flex ox-align-items-center ox-justify-content-center">
            <code>.ox-object-contain</code>
          </div>
        </div>
      </app-doc-code>

      <!-- TABLA DE CLASES -->
      <app-utility-table 
        title="Referencia de Clases Extras" 
        [classes]="extrasClasses">
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
    .ox-box {
      padding: 1rem 1.5rem;
      border-radius: 6px;
      font-weight: 700;
      font-size: 0.875rem;
    }
    .ox-img-box {
      width: 180px;
      height: 100px;
    }
  `]
})
export class ExtrasUtilityDemoComponent {
  opacityHtml = `<div class="ox-opacity-100">100%</div>
<div class="ox-opacity-75">75%</div>
<div class="ox-opacity-50">50%</div>
<div class="ox-opacity-25">25%</div>`;

  objectFitHtml = `<img src="..." class="ox-object-cover" />
<img src="..." class="ox-object-contain" />`;

  extrasClasses: UtilityClass[] = [
    { name: 'ox-z-{0..1000}', css: 'z-index: 0 | 10 | 20 | 30 | 40 | 50 | 100 | 1000 !important', description: 'Control de capas de superposición z-index', responsive: true },
    { name: 'ox-opacity-{0..100}', css: 'opacity: 0 | 0.25 | 0.5 | 0.75 | 1 !important', description: 'Niveles de opacidad y transparencia', responsive: true },
    { name: 'ox-object-cover', css: 'object-fit: cover !important', description: 'Escala imagen/video cubriendo el área sin deformar', responsive: true },
    { name: 'ox-object-contain', css: 'object-fit: contain !important', description: 'Escala manteniendo proporción completa', responsive: true },
    { name: 'ox-object-fill', css: 'object-fit: fill !important', description: 'Estira imagen para llenar el contenedor', responsive: true },
    { name: 'ox-float-start', css: 'float: left !important', description: 'Flota elemento a la izquierda', responsive: true },
    { name: 'ox-float-end', css: 'float: right !important', description: 'Flota elemento a la derecha', responsive: true },
    { name: 'ox-float-none', css: 'float: none !important', description: 'Remueve flotado', responsive: true },
    { name: 'ox-clearfix', css: '::after { display: block; clear: both; content: "" }', description: 'Limpiador de elementos flotados en el padre', responsive: true },
    { name: 'ox-align-top / middle / bottom', css: 'vertical-align: top / middle / bottom !important', description: 'Alineación vertical para elementos en línea o celdas', responsive: true },
    { name: 'oxygen-ui-flex-center', css: 'display: flex; justify-content: center; align-items: center', description: 'Helper rápido de centrado flex', responsive: false }
  ];
}
