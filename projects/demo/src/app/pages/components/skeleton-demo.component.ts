import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent, CardComponent } from 'oxygen-ui';

@Component({
  selector: 'app-skeleton-demo',
  standalone: true,
  imports: [CommonModule, SkeletonComponent, CardComponent],
  template: `
    <div class="ox-page-container">
      <h1>Skeleton</h1>
      <p class="ox-description">Un marcador de posición (placeholder) que muestra a los usuarios que el contenido se está cargando.</p>

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
      </section>
      
      <section class="ox-section">
        <h2>Ejemplo Práctico</h2>
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
            <ox-skeleton width="100%" height="150px" borderRadius="12px" class="ox-mt-4"></ox-skeleton>
          </div>
        </div>
      </section>
    </div>
  `
})
export class SkeletonDemoComponent {}
