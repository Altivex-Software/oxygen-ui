import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';
import { IconComponent } from 'oxygen-ui';

@Component({
  selector: 'app-motion-utility-demo',
  standalone: true,
  imports: [CommonModule, DocCodeComponent, UtilityTableComponent, IconComponent],
  template: `
    <div class="ox-page-container">
      <div class="ox-header-hero">
        <h1 class="ox-page-title">Movimiento, Transiciones & Animaciones</h1>
        <p class="ox-page-subtitle">
          Crea micro-interacciones dinámicas, transformaciones escalares y rotaciones suaves utilizando utilidades de transición y keyframes nativos.
        </p>
      </div>

      <!-- DEMO 1: TRANSICIONES Y HOVER SCALE -->
      <app-doc-code
        title="1. Transiciones & Transformaciones de Escala (.ox-transition, .ox-scale-*)"
        description="Combina .ox-transition con .ox-duration-* y estados hover para efectos interactivos fluidos."
        [html]="transitionsHtml">
        <div class="ox-demo-box ox-flex ox-flex-wrap ox-gap-4 ox-align-items-center">
          <div class="ox-preview-card ox-transition ox-duration-300 ox-hover-scale-110 ox-shadow-sm ox-rounded-md ox-bg-primary ox-text-white ox-cursor-pointer">
            Hover: Scale 110%
          </div>
          <div class="ox-preview-card ox-transition ox-duration-300 ox-hover-scale-95 ox-shadow-sm ox-rounded-md ox-bg-secondary ox-text-white ox-cursor-pointer">
            Hover: Scale 95%
          </div>
          <div class="ox-preview-card ox-transition-all ox-duration-500 ox-ease-in-out ox-hover-scale-105 ox-hover-shadow-md ox-rounded-md ox-border ox-cursor-pointer">
            Ease-in-out + Sombra
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 2: ROTACIONES -->
      <app-doc-code
        title="2. Rotaciones (.ox-rotate-*)"
        description="Aplica rotaciones angulares fijas o interactivas con .ox-rotate-*."
        [html]="rotateHtml">
        <div class="ox-demo-box ox-flex ox-flex-wrap ox-gap-4 ox-align-items-center">
          <div class="ox-preview-card ox-rotate-0 ox-border ox-rounded-md">0°</div>
          <div class="ox-preview-card ox-rotate-45 ox-border ox-rounded-md ox-bg-primary ox-text-white">45°</div>
          <div class="ox-preview-card ox-rotate-90 ox-border ox-rounded-md">90°</div>
          <div class="ox-preview-card ox-rotate-n45 ox-border ox-rounded-md ox-bg-danger ox-text-white">-45°</div>
        </div>
      </app-doc-code>

      <!-- DEMO 3: ANIMACIONES PREDEFINIDAS -->
      <app-doc-code
        title="3. Animaciones Preconstruidas (.ox-animate-*)"
        description="Keyframes optimizados para loaders giratorios, esqueletos de carga (skeleton), rebotes elásticos y radares de notificación."
        [html]="animationsHtml">
        <div class="ox-demo-box">
          <div class="ox-anim-grid">
            <!-- Card 1: Spin -->
            <div class="ox-anim-card">
              <div class="ox-anim-stage">
                <ox-icon name="loader" size="2rem" class="ox-animate-spin ox-text-primary"></ox-icon>
              </div>
              <div class="ox-anim-info">
                <code class="ox-anim-badge">.ox-animate-spin</code>
                <span class="ox-anim-desc">Spinner 360° continuo</span>
              </div>
            </div>

            <!-- Card 2: Pulse (Skeleton) -->
            <div class="ox-anim-card">
              <div class="ox-anim-stage">
                <div class="ox-skeleton-preview ox-animate-pulse">
                  <div class="ox-skeleton-line ox-w-75"></div>
                  <div class="ox-skeleton-line ox-w-50"></div>
                </div>
              </div>
              <div class="ox-anim-info">
                <code class="ox-anim-badge">.ox-animate-pulse</code>
                <span class="ox-anim-desc">Skeleton loading suave</span>
              </div>
            </div>

            <!-- Card 3: Bounce -->
            <div class="ox-anim-card">
              <div class="ox-anim-stage">
                <div class="ox-bounce-dot ox-animate-bounce ox-bg-success"></div>
              </div>
              <div class="ox-anim-info">
                <code class="ox-anim-badge">.ox-animate-bounce</code>
                <span class="ox-anim-desc">Rebote vertical</span>
              </div>
            </div>

            <!-- Card 4: Ping -->
            <div class="ox-anim-card">
              <div class="ox-anim-stage">
                <span class="ox-ping-wrapper">
                  <span class="ox-animate-ping ox-ping-beacon"></span>
                  <span class="ox-ping-core"></span>
                </span>
              </div>
              <div class="ox-anim-info">
                <code class="ox-anim-badge">.ox-animate-ping</code>
                <span class="ox-anim-desc">Radar / Notificación</span>
              </div>
            </div>
          </div>
        </div>
      </app-doc-code>

      <!-- TABLA DE CLASES -->
      <app-utility-table 
        title="Referencia de Clases de Transición & Animación" 
        [classes]="motionClasses">
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
      padding: 1.5rem;
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      border-radius: 8px;
    }
    .ox-preview-card {
      padding: 1rem 1.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #fff;
    }

    /* Anim Showcase Grid */
    .ox-anim-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      width: 100%;
    }

    .ox-anim-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 1.25rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      transition: border-color 0.2s ease, transform 0.2s ease;
    }

    .ox-anim-card:hover {
      border-color: #cbd5e1;
      transform: translateY(-2px);
    }

    .ox-anim-stage {
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.75rem;
      width: 100%;
    }

    .ox-anim-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
    }

    .ox-anim-badge {
      background: #eff6ff;
      color: #1d4ed8;
      padding: 0.25rem 0.6rem;
      border-radius: 4px;
      font-size: 0.8125rem;
      font-weight: 600;
      border: 1px solid #dbeafe;
    }

    .ox-anim-desc {
      font-size: 0.75rem;
      color: #64748b;
    }

    /* Skeleton preview */
    .ox-skeleton-preview {
      width: 100%;
      max-width: 130px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .ox-skeleton-line {
      height: 10px;
      background: #cbd5e1;
      border-radius: 4px;
    }

    .ox-w-75 { width: 75%; }
    .ox-w-50 { width: 50%; }

    /* Bounce dot */
    .ox-bounce-dot {
      width: 22px;
      height: 22px;
      border-radius: 50%;
    }

    /* Ping beacon */
    .ox-ping-wrapper {
      position: relative;
      display: inline-flex;
      width: 18px;
      height: 18px;
    }

    .ox-ping-beacon {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: #dc3545;
      opacity: 0.75;
    }

    .ox-ping-core {
      position: relative;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #dc3545;
    }
  `]
})
export class MotionUtilityDemoComponent {
  transitionsHtml = `<div class="ox-transition ox-duration-300 ox-hover-scale-110 ox-bg-primary ox-text-white">
  Hover: Scale 110%
</div>

<div class="ox-transition-all ox-duration-500 ox-ease-in-out ox-hover-shadow-md">
  Ease-in-out + Sombra
</div>`;

  rotateHtml = `<div class="ox-rotate-45 ox-bg-primary ox-text-white">45°</div>
<div class="ox-rotate-90">90°</div>
<div class="ox-rotate-n45 ox-bg-danger ox-text-white">-45°</div>`;

  animationsHtml = `<!-- 1. Spinner de carga -->
<ox-icon name="loader" class="ox-animate-spin ox-text-primary"></ox-icon>

<!-- 2. Skeleton Loading -->
<div class="ox-animate-pulse ox-rounded ox-bg-secondary ox-opacity-50"></div>

<!-- 3. Rebote elástico -->
<div class="ox-rounded-circle ox-bg-success ox-animate-bounce"></div>

<!-- 4. Indicador ping / radar -->
<span class="ox-relative ox-flex">
  <span class="ox-animate-ping ox-absolute ox-rounded-circle ox-bg-danger"></span>
  <span class="ox-relative ox-rounded-circle ox-bg-danger"></span>
</span>`;

  motionClasses: UtilityClass[] = [
    { name: '.ox-transition', css: 'transition-property: color, background-color, transform, etc.', description: 'Aplica transición estándar', responsive: false },
    { name: '.ox-transition-all', css: 'transition-property: all', description: 'Transición para todas las propiedades', responsive: false },
    { name: '.ox-transition-none', css: 'transition-property: none', description: 'Desactiva transiciones', responsive: false },
    { name: '.ox-duration-150 / 200 / 300 / 500 / 1000', css: 'transition-duration: 150ms / 200ms / 300ms / 500ms / 1s', description: 'Duración de la animación', responsive: false },
    { name: '.ox-ease-linear / in / out / in-out', css: 'transition-timing-function: cubic-bezier(...)', description: 'Curva de aceleración', responsive: false },
    { name: '.ox-delay-150 / 200 / 300 / 500', css: 'transition-delay: 150ms / 200ms / 300ms / 500ms', description: 'Retardo de inicio de animación', responsive: false },
    { name: '.ox-scale-50 / 75 / 90 / 95 / 100 / 105 / 110 / 125 / 150', css: 'transform: scale(...)', description: 'Escalado proporcional', responsive: false },
    { name: '.ox-rotate-0 / 45 / 90 / 180 / n45 / n90', css: 'transform: rotate(...)', description: 'Rotación angular positiva o negativa', responsive: false },
    { name: '.ox-animate-spin', css: 'animation: ox-spin 1s linear infinite', description: 'Giro continuo de 360°', responsive: false },
    { name: '.ox-animate-pulse', css: 'animation: ox-pulse 2s cubic-bezier(...) infinite', description: 'Efecto de pulso suave', responsive: false },
    { name: '.ox-animate-bounce', css: 'animation: ox-bounce 1s infinite', description: 'Rebote vertical continuo', responsive: false },
    { name: '.ox-animate-ping', css: 'animation: ox-ping 1s infinite', description: 'Efecto de onda expansiva', responsive: false },
    { name: '.ox-animate-fade-in', css: 'animation: ox-fade-in 0.25s forwards', description: 'Aparición suave con desplazamiento', responsive: false }
  ];
}
