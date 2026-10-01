import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-skeleton-demo',
  standalone: true,
  imports: [CommonModule, SkeletonComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Skeleton</h1>
      <p class="ox-description">
        Marcador de posición visual (placeholder) con animaciones de carga para mejorar la experiencia percibida mientras se obtienen datos.
      </p>

      <!-- 1. FORMAS Y ANIMACIONES -->
      <section class="ox-section">
        <h2>Formas y Animaciones</h2>
        <div class="ox-flex ox-flex-column ox-gap-4">
          <div class="ox-card ox-p-4">
            <h3 class="ox-fw-bold ox-mb-2">Animación por defecto (Wave)</h3>
            <div class="ox-flex ox-align-items-center ox-gap-4">
              <ox-skeleton shape="circle" width="4rem" height="4rem"></ox-skeleton>
              <div class="ox-flex ox-flex-column ox-gap-2 ox-w-100" style="width: 200px;">
                <ox-skeleton width="100%" height="1.5rem"></ox-skeleton>
                <ox-skeleton width="70%" height="1rem"></ox-skeleton>
              </div>
            </div>
          </div>
          
          <div class="ox-card ox-p-4">
            <h3 class="ox-fw-bold ox-mb-2">Animación de latido (Pulse)</h3>
            <div class="ox-flex ox-align-items-center ox-gap-4">
              <ox-skeleton shape="circle" width="4rem" height="4rem" animation="pulse"></ox-skeleton>
              <div class="ox-flex ox-flex-column ox-gap-2 ox-w-100" style="width: 200px;">
                <ox-skeleton width="100%" height="1.5rem" animation="pulse"></ox-skeleton>
                <ox-skeleton width="70%" height="1rem" animation="pulse"></ox-skeleton>
              </div>
            </div>
          </div>
          
          <div class="ox-card ox-p-4">
            <h3 class="ox-fw-bold ox-mb-2">Sin Animación</h3>
            <div class="ox-flex ox-align-items-center ox-gap-4">
              <ox-skeleton shape="circle" width="4rem" height="4rem" animation="none"></ox-skeleton>
              <div class="ox-flex ox-flex-column ox-gap-2 ox-w-100" style="width: 200px;">
                <ox-skeleton width="100%" height="1.5rem" animation="none"></ox-skeleton>
                <ox-skeleton width="70%" height="1rem" animation="none"></ox-skeleton>
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
      <section class="ox-section">
        <h2>Ejemplo Práctico &mdash; Tarjeta de Perfil en Carga</h2>
        <div class="ox-card ox-p-4">
          <div class="ox-flex ox-flex-column ox-gap-4">
            <!-- Header falso -->
            <div class="ox-flex ox-align-items-center ox-gap-4 ox-mb-2">
              <ox-skeleton shape="circle" width="3rem" height="3rem"></ox-skeleton>
              <div class="ox-flex ox-flex-column ox-gap-2" style="flex: 1;">
                <ox-skeleton width="150px" height="1.2rem"></ox-skeleton>
                <ox-skeleton width="100px" height="0.8rem"></ox-skeleton>
              </div>
            </div>
            
            <!-- Contenido falso -->
            <ox-skeleton width="100%" height="1rem" class="ox-mb-2"></ox-skeleton>
            <ox-skeleton width="100%" height="1rem" class="ox-mb-2"></ox-skeleton>
            <ox-skeleton width="80%" height="1rem" class="ox-mb-2"></ox-skeleton>
            <ox-skeleton width="100%" height="120px" borderRadius="12px" class="ox-mt-4"></ox-skeleton>
          </div>
        </div>

        <app-doc-code 
          title="Skeleton de Perfil"
          [htmlCode]="cardHtml"
          [tsCode]="shapesTs">
        </app-doc-code>
      </section>

      <!-- API REFERENCE -->
      <section class="ox-section">
        <h2>API Reference &mdash; &lt;ox-skeleton&gt;</h2>
        <app-doc-api-table [properties]="skeletonProperties"></app-doc-api-table>
      </section>
    </div>
  `
})
export class SkeletonDemoComponent {
  shapesHtml = `<!-- Avatar y líneas -->
<ox-skeleton shape="circle" width="4rem" height="4rem"></ox-skeleton>
<ox-skeleton width="100%" height="1.5rem"></ox-skeleton>
<ox-skeleton width="70%" height="1rem"></ox-skeleton>

<!-- Variantes de animación -->
<ox-skeleton animation="wave" width="100%" height="2rem"></ox-skeleton>
<ox-skeleton animation="pulse" width="100%" height="2rem"></ox-skeleton>
<ox-skeleton animation="none" width="100%" height="2rem"></ox-skeleton>`;

  cardHtml = `<div class="ox-flex ox-align-items-center ox-gap-4 ox-mb-2">
  <ox-skeleton shape="circle" width="3rem" height="3rem"></ox-skeleton>
  <div class="ox-flex ox-flex-column ox-gap-2" style="flex: 1;">
    <ox-skeleton width="150px" height="1.2rem"></ox-skeleton>
    <ox-skeleton width="100px" height="0.8rem"></ox-skeleton>
  </div>
</div>
<ox-skeleton width="100%" height="1rem"></ox-skeleton>
<ox-skeleton width="100%" height="120px" borderRadius="12px"></ox-skeleton>`;

  shapesTs = `import { Component } from '@angular/core';
import { SkeletonComponent } from 'oxygen-ui';

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
