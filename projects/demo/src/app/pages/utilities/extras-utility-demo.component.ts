import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';

@Component({
  selector: 'app-extras-utility-demo',
  standalone: true,
  imports: [CommonModule, DocCodeComponent, UtilityTableComponent],
  template: `
    <div class="val-page-container">
      <div class="val-header-hero">
        <h1 class="val-page-title">Extras & Misceláneos</h1>
        <p class="val-page-subtitle">
          Utilidades de capas Z-Index, niveles de opacidad, ajuste de imágenes (object-fit), flotados, clearfix y alineación vertical.
        </p>
      </div>

      <!-- DEMO 1: OPACIDAD -->
      <app-doc-code
        title="1. Opacidad (.val-opacity-0, .val-opacity-25, .val-opacity-50, .val-opacity-75, .val-opacity-100)"
        description="Ajusta los niveles de transparencia de cualquier elemento."
        [html]="opacityHtml">
        <div class="val-demo-box val-flex val-gap-3 val-flex-wrap">
          <div class="val-box val-bg-primary val-text-white val-opacity-100">100%</div>
          <div class="val-box val-bg-primary val-text-white val-opacity-75">75%</div>
          <div class="val-box val-bg-primary val-text-white val-opacity-50">50%</div>
          <div class="val-box val-bg-primary val-text-white val-opacity-25">25%</div>
        </div>
      </app-doc-code>

      <!-- DEMO 2: OBJECT FIT -->
      <app-doc-code
        title="2. Ajuste de Contenido (.val-object-cover, .val-object-contain)"
        description="Controla cómo se escala y recorta una imagen o video dentro de un contenedor fijo."
        [html]="objectFitHtml">
        <div class="val-demo-box val-flex val-gap-3 val-flex-wrap">
          <div class="val-img-box val-rounded val-border val-bg-light val-flex val-align-items-center val-justify-content-center">
            <code>.val-object-cover</code>
          </div>
          <div class="val-img-box val-rounded val-border val-bg-light val-flex val-align-items-center val-justify-content-center">
            <code>.val-object-contain</code>
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
    .val-box {
      padding: 1rem 1.5rem;
      border-radius: 6px;
      font-weight: 700;
      font-size: 0.875rem;
    }
    .val-img-box {
      width: 180px;
      height: 100px;
    }
  `]
})
export class ExtrasUtilityDemoComponent {
  opacityHtml = `<div class="val-opacity-100">100%</div>
<div class="val-opacity-75">75%</div>
<div class="val-opacity-50">50%</div>
<div class="val-opacity-25">25%</div>`;

  objectFitHtml = `<img src="..." class="val-object-cover" />
<img src="..." class="val-object-contain" />`;

  extrasClasses: UtilityClass[] = [
    { name: 'val-z-{0..1000}', css: 'z-index: 0 | 10 | 20 | 30 | 40 | 50 | 100 | 1000 !important', description: 'Control de capas de superposición z-index', responsive: true },
    { name: 'val-opacity-{0..100}', css: 'opacity: 0 | 0.25 | 0.5 | 0.75 | 1 !important', description: 'Niveles de opacidad y transparencia', responsive: true },
    { name: 'val-object-cover', css: 'object-fit: cover !important', description: 'Escala imagen/video cubriendo el área sin deformar', responsive: true },
    { name: 'val-object-contain', css: 'object-fit: contain !important', description: 'Escala manteniendo proporción completa', responsive: true },
    { name: 'val-object-fill', css: 'object-fit: fill !important', description: 'Estira imagen para llenar el contenedor', responsive: true },
    { name: 'val-float-start', css: 'float: left !important', description: 'Flota elemento a la izquierda', responsive: true },
    { name: 'val-float-end', css: 'float: right !important', description: 'Flota elemento a la derecha', responsive: true },
    { name: 'val-float-none', css: 'float: none !important', description: 'Remueve flotado', responsive: true },
    { name: 'val-clearfix', css: '::after { display: block; clear: both; content: "" }', description: 'Limpiador de elementos flotados en el padre', responsive: true },
    { name: 'val-align-top / middle / bottom', css: 'vertical-align: top / middle / bottom !important', description: 'Alineación vertical para elementos en línea o celdas', responsive: true },
    { name: 'valence-ui-flex-center', css: 'display: flex; justify-content: center; align-items: center', description: 'Helper rápido de centrado flex', responsive: false }
  ];
}
