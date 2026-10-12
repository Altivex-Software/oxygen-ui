import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from 'valence-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-skeleton-demo',
  standalone: true,
  imports: [CommonModule, SkeletonComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="val-page-container">
      <h1>Skeleton</h1>
      <p class="val-description">
        Marcador de posición visual (placeholder) con animaciones de carga para mejorar la experiencia percibida mientras se obtienen datos.
      </p>

      <!-- 1. FORMAS Y ANIMACIONES -->
      <section class="val-section">
        <h2>Formas y Animaciones</h2>
        <div class="val-flex val-flex-column val-gap-4">
          <div class="val-card val-p-4">
            <h3 class="val-fw-bold val-mb-2">Animación por defecto (Wave)</h3>
            <div class="val-flex val-align-items-center val-gap-4">
              <val-skeleton shape="circle" width="4rem" height="4rem"></val-skeleton>
              <div class="val-flex val-flex-column val-gap-2 val-w-100" style="width: 200px;">
                <val-skeleton width="100%" height="1.5rem"></val-skeleton>
                <val-skeleton width="70%" height="1rem"></val-skeleton>
              </div>
            </div>
          </div>
          
          <div class="val-card val-p-4">
            <h3 class="val-fw-bold val-mb-2">Animación de latido (Pulse)</h3>
            <div class="val-flex val-align-items-center val-gap-4">
              <val-skeleton shape="circle" width="4rem" height="4rem" animation="pulse"></val-skeleton>
              <div class="val-flex val-flex-column val-gap-2 val-w-100" style="width: 200px;">
                <val-skeleton width="100%" height="1.5rem" animation="pulse"></val-skeleton>
                <val-skeleton width="70%" height="1rem" animation="pulse"></val-skeleton>
              </div>
            </div>
          </div>
          
          <div class="val-card val-p-4">
            <h3 class="val-fw-bold val-mb-2">Sin Animación</h3>
            <div class="val-flex val-align-items-center val-gap-4">
              <val-skeleton shape="circle" width="4rem" height="4rem" animation="none"></val-skeleton>
              <div class="val-flex val-flex-column val-gap-2 val-w-100" style="width: 200px;">
                <val-skeleton width="100%" height="1.5rem" animation="none"></val-skeleton>
                <val-skeleton width="70%" height="1rem" animation="none"></val-skeleton>
              </div>
            </div>
          </div>
        </div>

        <app-doc-code 
          title="Skeleton Formas"
          [htmlCode]="shapesHtml"
          [tsCode]="shapesTs">
        </app-doc-code>
      </section>
      
      <!-- 2. EJEMPLO PRÁCTICO -->
      <section class="val-section">
        <h2>Ejemplo Práctico &mdash; Tarjeta de Perfil en Carga</h2>
        <div class="val-card val-p-4">
          <div class="val-flex val-flex-column val-gap-4">
            <!-- Header falso -->
            <div class="val-flex val-align-items-center val-gap-4 val-mb-2">
              <val-skeleton shape="circle" width="3rem" height="3rem"></val-skeleton>
              <div class="val-flex val-flex-column val-gap-2" style="flex: 1;">
                <val-skeleton width="150px" height="1.2rem"></val-skeleton>
                <val-skeleton width="100px" height="0.8rem"></val-skeleton>
              </div>
            </div>
            
            <!-- Contenido falso -->
            <val-skeleton width="100%" height="1rem" class="val-mb-2"></val-skeleton>
            <val-skeleton width="100%" height="1rem" class="val-mb-2"></val-skeleton>
            <val-skeleton width="80%" height="1rem" class="val-mb-2"></val-skeleton>
            <val-skeleton width="100%" height="120px" borderRadius="12px" class="val-mt-4"></val-skeleton>
          </div>
        </div>

        <app-doc-code 
          title="Skeleton de Perfil"
          [htmlCode]="cardHtml"
          [tsCode]="shapesTs">
        </app-doc-code>
      </section>

      <!-- API REFERENCE -->
      <section class="val-section">
        <h2>API Reference &mdash; &lt;val-skeleton&gt;</h2>
        <app-doc-api-table [properties]="skeletonProperties"></app-doc-api-table>
      </section>
    </div>
  `
})
export class SkeletonDemoComponent {
  shapesHtml = `<!-- Avatar y líneas -->
<val-skeleton shape="circle" width="4rem" height="4rem"></val-skeleton>
<val-skeleton width="100%" height="1.5rem"></val-skeleton>
<val-skeleton width="70%" height="1rem"></val-skeleton>

<!-- Variantes de animación -->
<val-skeleton animation="wave" width="100%" height="2rem"></val-skeleton>
<val-skeleton animation="pulse" width="100%" height="2rem"></val-skeleton>
<val-skeleton animation="none" width="100%" height="2rem"></val-skeleton>`;

  cardHtml = `<div class="val-flex val-align-items-center val-gap-4 val-mb-2">
  <val-skeleton shape="circle" width="3rem" height="3rem"></val-skeleton>
  <div class="val-flex val-flex-column val-gap-2" style="flex: 1;">
    <val-skeleton width="150px" height="1.2rem"></val-skeleton>
    <val-skeleton width="100px" height="0.8rem"></val-skeleton>
  </div>
</div>
<val-skeleton width="100%" height="1rem"></val-skeleton>
<val-skeleton width="100%" height="120px" borderRadius="12px"></val-skeleton>`;

  shapesTs = `import { Component } from '@angular/core';
import { SkeletonComponent } from 'valence-ui';

@Component({
  standalone: true,
  imports: [SkeletonComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {}`;

  skeletonProperties: ApiProperty[] = [
    { name: 'shape', type: "'rectangle' | 'circle'", default: "'rectangle'", description: 'Forma geométrica del placeholder.' },
    { name: 'animation', type: "'wave' | 'pulse' | 'none'", default: "'wave'", description: 'Efecto de animación visual durante la carga.' },
    { name: 'width', type: 'string', default: "'100%'", description: 'Ancho del elemento con unidades CSS (ej: 4rem, 100%, 200px).' },
    { name: 'height', type: 'string', default: "'1rem'", description: 'Alto del elemento con unidades CSS (ej: 1.5rem, 120px).' },
    { name: 'borderRadius', type: 'string', default: 'undefined', description: 'Radio de bordes personalizado (para shape="rectangle").' }
  ];
}
