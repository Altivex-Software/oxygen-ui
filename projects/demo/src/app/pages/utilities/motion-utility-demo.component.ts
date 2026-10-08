import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';
import { 
  ButtonComponent, 
  DropdownComponent, 
  DropdownOption,
  InputSwitchComponent, 
  CardComponent, 
  BadgeComponent, 
  AlertComponent, 
  TagComponent, 
  IconComponent 
} from 'oxygen-ui';

interface AnimationItem {
  name: string;
  className: string;
  category: string;
  description: string;
}

@Component({
  selector: 'app-motion-utility-demo',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    DocCodeComponent, 
    UtilityTableComponent, 
    ButtonComponent, 
    DropdownComponent, 
    InputSwitchComponent, 
    CardComponent, 
    BadgeComponent, 
    AlertComponent, 
    TagComponent, 
    IconComponent
  ],
  template: `
    <div class="ox-page-container">
      <div class="ox-header-hero">
        <h1 class="ox-page-title">Movimiento, Transiciones & Animaciones</h1>
        <p class="ox-page-subtitle">
          Catálogo completo de más de 60 animaciones (estilo Animate.css), keyframes acelerados por hardware y Playground interactivo utilizando los componentes nativos de Oxygen UI.
        </p>
      </div>

      <!-- ============================================== -->
      <!-- PLAYGROUND INTERACTIVO DE ANIMACIONES           -->
      <!-- ============================================== -->
      <div class="ox-playground-card ox-mb-5">
        <div class="ox-playground-header">
          <div class="ox-flex ox-align-items-center ox-gap-3">
            <span class="ox-playground-badge">
              <ox-icon name="play" size="1.25rem"></ox-icon>
            </span>
            <div>
              <h2 class="ox-playground-title">Playground Interactivo de Animaciones</h2>
              <p class="ox-playground-desc">Prueba cualquier animación en vivo sobre los componentes de la librería.</p>
            </div>
          </div>
          <ox-button variant="primary" (onClick)="replayAnimation()">
            <ox-icon name="rotate-cw" size="1rem"></ox-icon>
            Replay
          </ox-button>
        </div>

        <div class="ox-playground-body">
          <!-- CONTROLES -->
          <div class="ox-controls-panel">
            <!-- 1. Familia -->
            <div class="ox-control-group">
              <label class="ox-control-label">Familia de Animación</label>
              <div class="ox-category-chips">
                @for (cat of categories; track cat) {
                  <ox-button 
                    [variant]="selectedCategory() === cat ? 'primary' : 'outline-secondary'"
                    size="sm"
                    (onClick)="selectCategory(cat)">
                    {{ cat }}
                  </ox-button>
                }
              </div>
            </div>

            <!-- 2. Efecto (ox-dropdown) -->
            <div class="ox-control-group">
              <label class="ox-control-label">Efecto de Animación</label>
              <ox-dropdown 
                [options]="animDropdownOptions()" 
                [(ngModel)]="selectedAnimClass" 
                (ngModelChange)="onSelectAnim($event)">
              </ox-dropdown>
            </div>

            <!-- 3. Componente Objetivo (ox-dropdown) -->
            <div class="ox-control-group">
              <label class="ox-control-label">Componente a Animar</label>
              <ox-dropdown 
                [options]="targetComponentOptions" 
                [(ngModel)]="selectedTargetType" 
                (ngModelChange)="replayAnimation()">
              </ox-dropdown>
            </div>

            <!-- 4. Velocidad & Bucle (ox-dropdown & ox-input-switch) -->
            <div class="ox-control-row">
              <div class="ox-control-group ox-flex-1">
                <label class="ox-control-label">Velocidad</label>
                <ox-dropdown 
                  [options]="speedDropdownOptions" 
                  [(ngModel)]="selectedSpeed" 
                  (ngModelChange)="onSpeedChange($event)">
                </ox-dropdown>
              </div>

              <div class="ox-control-group">
                <label class="ox-control-label">Bucle continuo</label>
                <div class="ox-flex ox-align-items-center ox-gap-2 ox-pt-1">
                  <ox-input-switch 
                    [(checked)]="isInfinite" 
                    color="primary"
                    (checkedChange)="onToggleInfinite($event)">
                  </ox-input-switch>
                  <span class="ox-fs-xs ox-fw-bold ox-text-muted">.ox-anim-infinite</span>
                </div>
              </div>
            </div>
          </div>

          <!-- ESCENARIO DE VISUALIZACIÓN -->
          <div class="ox-stage-panel">
            <div class="ox-stage-box">
              @if (isAnimating()) {
                <div [class]="currentAppliedClass()" class="ox-anim-stage-wrapper">
                  
                  @switch (selectedTargetType()) {
                    @case ('card') {
                      <ox-card boxShadow="md" class="ox-demo-target-card">
                        <div class="ox-flex ox-align-items-center ox-gap-3 ox-p-3">
                          <ox-icon [name]="targetIcon()" size="2rem" color="primary"></ox-icon>
                          <div>
                            <h4 class="ox-m-0 ox-fs-md ox-fw-bold">{{ selectedAnimName() }}</h4>
                            <span class="ox-fs-xs ox-text-muted">{{ selectedAnimClass() }}</span>
                          </div>
                        </div>
                      </ox-card>
                    }

                    @case ('button') {
                      <ox-button variant="primary" size="lg">
                        <ox-icon [name]="targetIcon()" size="1.25rem"></ox-icon>
                        {{ selectedAnimName() }}
                      </ox-button>
                    }

                    @case ('alert') {
                      <ox-alert severity="info" variant="glass" [closable]="false">
                        <strong>{{ selectedAnimName() }}:</strong> Animación aplicada al componente Alert de Oxygen UI.
                      </ox-alert>
                    }

                    @case ('badge') {
                      <div class="ox-flex ox-align-items-center ox-gap-2">
                        <ox-badge severity="danger" size="lg" [value]="selectedAnimName()"></ox-badge>
                        <ox-tag severity="success" [value]="selectedAnimClass()"></ox-tag>
                      </div>
                    }

                    @default {
                      <div class="ox-anim-target-card">
                        <div class="ox-target-icon">
                          <ox-icon [name]="targetIcon()" size="2rem"></ox-icon>
                        </div>
                        <strong class="ox-target-title">{{ selectedAnimName() }}</strong>
                        <span class="ox-target-sub">{{ selectedAnimClass() }}</span>
                      </div>
                    }
                  }

                </div>
              }
            </div>

            <div class="ox-snippet-bar">
              <code class="ox-snippet-text">&lt;div class="{{ currentAppliedClass() }}"&gt;...&lt;/div&gt;</code>
              <ox-button variant="secondary" size="sm" (onClick)="copySnippet()">
                <ox-icon [name]="copied() ? 'check' : 'copy'" size="1rem"></ox-icon>
                {{ copied() ? 'Copiado' : 'Copiar' }}
              </ox-button>
            </div>
          </div>
        </div>
      </div>

      <!-- ============================================== -->
      <!-- DEMO 1: TRANSICIONES Y HOVER SCALE             -->
      <!-- ============================================== -->
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

      <!-- ============================================== -->
      <!-- DEMO 2: ROTACIONES Y ÁNGULOS                   -->
      <!-- ============================================== -->
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

      <!-- ============================================== -->
      <!-- DEMO 3: UI LOOPS & NOTIFICACIONES               -->
      <!-- ============================================== -->
      <app-doc-code
        title="3. Animaciones Funcionales de UI (.ox-animate-*)"
        description="Keyframes optimizados para spinners de carga, esqueletos (skeletons), rebotes y notificaciones tipo radar."
        [html]="uiLoopsHtml">
        <div class="ox-demo-box">
          <div class="ox-anim-grid">
            <div class="ox-anim-card" (click)="triggerSpecific('ox-animate-spin')">
              <div class="ox-anim-stage">
                <ox-icon name="loader" size="2rem" class="ox-animate-spin ox-text-primary"></ox-icon>
              </div>
              <div class="ox-anim-info">
                <code class="ox-anim-badge">.ox-animate-spin</code>
                <span class="ox-anim-desc">Spinner 360° continuo</span>
              </div>
            </div>

            <div class="ox-anim-card" (click)="triggerSpecific('ox-animate-pulse')">
              <div class="ox-anim-stage">
                <div class="ox-skeleton-preview ox-animate-pulse">
                  <div class="ox-skeleton-line" style="width: 80%;"></div>
                  <div class="ox-skeleton-line" style="width: 50%;"></div>
                </div>
              </div>
              <div class="ox-anim-info">
                <code class="ox-anim-badge">.ox-animate-pulse</code>
                <span class="ox-anim-desc">Skeleton loading suave</span>
              </div>
            </div>

            <div class="ox-anim-card" (click)="triggerSpecific('ox-animate-bounce')">
              <div class="ox-anim-stage">
                <div class="ox-bounce-dot ox-animate-bounce ox-bg-success"></div>
              </div>
              <div class="ox-anim-info">
                <code class="ox-anim-badge">.ox-animate-bounce</code>
                <span class="ox-anim-desc">Rebote vertical</span>
              </div>
            </div>

            <div class="ox-anim-card" (click)="triggerSpecific('ox-animate-ping')">
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

      <!-- ============================================== -->
      <!-- TABLA DE REFERENCIA DE CLASES                  -->
      <!-- ============================================== -->
      <app-utility-table 
        title="Referencia Completa de Clases de Animación" 
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

    /* ==========================================
       PLAYGROUND STYLES
       ========================================== */
    .ox-playground-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .ox-playground-header {
      padding: 1.25rem 1.5rem;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .ox-playground-badge {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: #0066ff;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ox-playground-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
    }
    .ox-playground-desc {
      font-size: 0.8125rem;
      color: #64748b;
      margin: 0;
    }

    .ox-playground-body {
      display: grid;
      grid-template-columns: 360px 1fr;
      min-height: 380px;
    }
    @media (max-width: 960px) {
      .ox-playground-body {
        grid-template-columns: 1fr;
      }
    }

    .ox-controls-panel {
      padding: 1.5rem;
      border-right: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      background: #ffffff;
    }
    .ox-control-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .ox-control-row {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }
    .ox-control-label {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #475569;
    }
    .ox-category-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
    }

    .ox-stage-panel {
      padding: 1.5rem;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.5rem;
    }
    .ox-stage-box {
      flex: 1;
      min-height: 220px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      border: 1px dashed #cbd5e1;
      border-radius: 8px;
      padding: 2rem;
      overflow: hidden;
    }
    .ox-anim-stage-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ox-demo-target-card {
      min-width: 240px;
      padding: 1.25rem 1.5rem;
    }
    .ox-anim-target-card {
      padding: 1.5rem 2rem;
      background: linear-gradient(135deg, #0066ff 0%, #0052cc 100%);
      color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 10px 25px -5px rgba(0, 102, 255, 0.4);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      min-width: 220px;
    }
    .ox-target-icon {
      margin-bottom: 0.5rem;
    }
    .ox-target-title {
      font-size: 1.125rem;
      font-weight: 700;
    }
    .ox-target-sub {
      font-size: 0.75rem;
      opacity: 0.85;
      font-family: monospace;
      margin-top: 2px;
    }

    .ox-snippet-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #0f172a;
      color: #f8fafc;
      padding: 0.6rem 1rem;
      border-radius: 6px;
      font-family: monospace;
      font-size: 0.8125rem;
      gap: 1rem;
    }
    .ox-snippet-text {
      color: #38bdf8;
      overflow-x: auto;
      white-space: nowrap;
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
      cursor: pointer;
      transition: border-color 0.2s ease, transform 0.2s ease;
    }
    .ox-anim-card:hover {
      border-color: #0066ff;
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
    .ox-bounce-dot {
      width: 22px;
      height: 22px;
      border-radius: 50%;
    }
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
  selectedCategory = signal<string>('Fades');
  selectedAnimClass = signal<string>('ox-anim-fade-in-up');
  selectedSpeed = signal<string>('');
  selectedTargetType = signal<string>('card');
  isInfinite = signal<boolean>(false);
  isAnimating = signal<boolean>(true);
  copied = signal<boolean>(false);

  categories = [
    'Fades',
    'Zooms',
    'Slides',
    'Bounces',
    'Attention',
    'Flippers',
    'Rotating & Specials'
  ];

  targetComponentOptions: DropdownOption<string>[] = [
    { label: 'Oxygen Card (<ox-card>)', value: 'card' },
    { label: 'Oxygen Button (<ox-button>)', value: 'button' },
    { label: 'Oxygen Alert (<ox-alert>)', value: 'alert' },
    { label: 'Oxygen Badge & Tag (<ox-badge>)', value: 'badge' },
    { label: 'Hero Gradient Box', value: 'hero' }
  ];

  speedDropdownOptions: DropdownOption<string>[] = [
    { label: 'Normal (1s)', value: '' },
    { label: 'Faster (500ms)', value: 'ox-anim-faster' },
    { label: 'Fast (800ms)', value: 'ox-anim-fast' },
    { label: 'Slow (2s)', value: 'ox-anim-slow' },
    { label: 'Slower (3s)', value: 'ox-anim-slower' }
  ];

  allAnimations: AnimationItem[] = [
    // Fades
    { name: 'Fade In', className: 'ox-anim-fade-in', category: 'Fades', description: 'Aparición suave' },
    { name: 'Fade In Up', className: 'ox-anim-fade-in-up', category: 'Fades', description: 'Entrada fade desde abajo' },
    { name: 'Fade In Down', className: 'ox-anim-fade-in-down', category: 'Fades', description: 'Entrada fade desde arriba' },
    { name: 'Fade In Left', className: 'ox-anim-fade-in-left', category: 'Fades', description: 'Entrada fade desde la izquierda' },
    { name: 'Fade In Right', className: 'ox-anim-fade-in-right', category: 'Fades', description: 'Entrada fade desde la derecha' },
    { name: 'Fade Out', className: 'ox-anim-fade-out', category: 'Fades', description: 'Desvanecimiento hacia transparente' },
    { name: 'Fade Out Up', className: 'ox-anim-fade-out-up', category: 'Fades', description: 'Salida hacia arriba' },
    { name: 'Fade Out Down', className: 'ox-anim-fade-out-down', category: 'Fades', description: 'Salida hacia abajo' },

    // Zooms
    { name: 'Zoom In', className: 'ox-anim-zoom-in', category: 'Zooms', description: 'Aparición con zoom progresivo' },
    { name: 'Zoom In Up', className: 'ox-anim-zoom-in-up', category: 'Zooms', description: 'Entrada zoom desde abajo' },
    { name: 'Zoom In Down', className: 'ox-anim-zoom-in-down', category: 'Zooms', description: 'Entrada zoom desde arriba' },
    { name: 'Zoom In Left', className: 'ox-anim-zoom-in-left', category: 'Zooms', description: 'Entrada zoom desde la izquierda' },
    { name: 'Zoom In Right', className: 'ox-anim-zoom-in-right', category: 'Zooms', description: 'Entrada zoom desde la derecha' },
    { name: 'Zoom Out', className: 'ox-anim-zoom-out', category: 'Zooms', description: 'Desaparición con reducción' },
    { name: 'Zoom Out Up', className: 'ox-anim-zoom-out-up', category: 'Zooms', description: 'Salida con reducción hacia arriba' },
    { name: 'Zoom Out Down', className: 'ox-anim-zoom-out-down', category: 'Zooms', description: 'Salida con reducción hacia abajo' },

    // Slides
    { name: 'Slide In Up', className: 'ox-anim-slide-in-up', category: 'Slides', description: 'Deslizamiento desde abajo' },
    { name: 'Slide In Down', className: 'ox-anim-slide-in-down', category: 'Slides', description: 'Deslizamiento desde arriba' },
    { name: 'Slide In Left', className: 'ox-anim-slide-in-left', category: 'Slides', description: 'Deslizamiento desde la izquierda' },
    { name: 'Slide In Right', className: 'ox-anim-slide-in-right', category: 'Slides', description: 'Deslizamiento desde la derecha' },
    { name: 'Slide Out Up', className: 'ox-anim-slide-out-up', category: 'Slides', description: 'Salida deslizante hacia arriba' },
    { name: 'Slide Out Down', className: 'ox-anim-slide-out-down', category: 'Slides', description: 'Salida deslizante hacia abajo' },
    { name: 'Slide Out Left', className: 'ox-anim-slide-out-left', category: 'Slides', description: 'Salida deslizante hacia la izquierda' },
    { name: 'Slide Out Right', className: 'ox-anim-slide-out-right', category: 'Slides', description: 'Salida deslizante hacia la derecha' },

    // Bounces
    { name: 'Bounce In', className: 'ox-anim-bounce-in', category: 'Bounces', description: 'Entrada con rebote elástico' },
    { name: 'Bounce In Up', className: 'ox-anim-bounce-in-up', category: 'Bounces', description: 'Entrada con rebote desde abajo' },
    { name: 'Bounce In Down', className: 'ox-anim-bounce-in-down', category: 'Bounces', description: 'Entrada con rebote desde arriba' },
    { name: 'Bounce In Left', className: 'ox-anim-bounce-in-left', category: 'Bounces', description: 'Entrada con rebote desde la izquierda' },
    { name: 'Bounce In Right', className: 'ox-anim-bounce-in-right', category: 'Bounces', description: 'Entrada con rebote desde la derecha' },
    { name: 'Bounce Out', className: 'ox-anim-bounce-out', category: 'Bounces', description: 'Salida con rebote' },
    { name: 'Bounce Out Up', className: 'ox-anim-bounce-out-up', category: 'Bounces', description: 'Salida con rebote hacia arriba' },
    { name: 'Bounce Out Down', className: 'ox-anim-bounce-out-down', category: 'Bounces', description: 'Salida con rebote hacia abajo' },

    // Attention
    { name: 'Shake (X)', className: 'ox-anim-shake-x', category: 'Attention', description: 'Sacudida horizontal (error)' },
    { name: 'Shake (Y)', className: 'ox-anim-shake-y', category: 'Attention', description: 'Sacudida vertical' },
    { name: 'Heartbeat', className: 'ox-anim-heartbeat', category: 'Attention', description: 'Latido cardíaco' },
    { name: 'Tada', className: 'ox-anim-tada', category: 'Attention', description: 'Efecto de celebración / logro' },
    { name: 'Wobble', className: 'ox-anim-wobble', category: 'Attention', description: 'Bamboleo lateral dinámico' },
    { name: 'Jello', className: 'ox-anim-jello', category: 'Attention', description: 'Efecto gelatina elástica' },
    { name: 'Rubber Band', className: 'ox-anim-rubber-band', category: 'Attention', description: 'Estiramiento de banda elástica' },
    { name: 'Flash', className: 'ox-anim-flash', category: 'Attention', description: 'Destello de atención' },
    { name: 'Head Shake', className: 'ox-anim-head-shake', category: 'Attention', description: 'Negación con la cabeza' },
    { name: 'Swing', className: 'ox-anim-swing', category: 'Attention', description: 'Péndulo oscilante superior' },

    // Flippers
    { name: 'Flip (3D)', className: 'ox-anim-flip', category: 'Flippers', description: 'Giro completo 3D' },
    { name: 'Flip In X', className: 'ox-anim-flip-in-x', category: 'Flippers', description: 'Volteo 3D en eje horizontal' },
    { name: 'Flip In Y', className: 'ox-anim-flip-in-y', category: 'Flippers', description: 'Volteo 3D en eje vertical' },
    { name: 'Flip Out X', className: 'ox-anim-flip-out-x', category: 'Flippers', description: 'Salida con volteo en eje X' },
    { name: 'Flip Out Y', className: 'ox-anim-flip-out-y', category: 'Flippers', description: 'Salida con volteo en eje Y' },

    // Rotating & Specials
    { name: 'Rotate In', className: 'ox-anim-rotate-in', category: 'Rotating & Specials', description: 'Entrada rotativa angular' },
    { name: 'Rotate In Down Left', className: 'ox-anim-rotate-in-down-left', category: 'Rotating & Specials', description: 'Rotación desde esquina inferior izquierda' },
    { name: 'Rotate In Down Right', className: 'ox-anim-rotate-in-down-right', category: 'Rotating & Specials', description: 'Rotación desde esquina inferior derecha' },
    { name: 'Rotate Out', className: 'ox-anim-rotate-out', category: 'Rotating & Specials', description: 'Salida rotativa' },
    { name: 'Roll In', className: 'ox-anim-roll-in', category: 'Rotating & Specials', description: 'Rodamiento de entrada' },
    { name: 'Roll Out', className: 'ox-anim-roll-out', category: 'Rotating & Specials', description: 'Rodamiento de salida' }
  ];

  animDropdownOptions = computed<DropdownOption<string>[]>(() => {
    const cat = this.selectedCategory();
    return this.allAnimations
      .filter(a => a.category === cat)
      .map(a => ({ label: `${a.name} (${a.className})`, value: a.className }));
  });

  selectedAnimName = computed(() => {
    const cls = this.selectedAnimClass();
    const item = this.allAnimations.find(a => a.className === cls);
    return item ? item.name : 'Fade In Up';
  });

  currentAppliedClass = computed(() => {
    const cls = this.selectedAnimClass();
    const speed = this.selectedSpeed();
    const inf = this.isInfinite() ? 'ox-anim-infinite' : '';
    return `${cls} ${speed} ${inf}`.trim();
  });

  targetIcon = computed(() => {
    const cat = this.selectedCategory();
    switch (cat) {
      case 'Attention': return 'bell';
      case 'Bounces': return 'zap';
      case 'Flippers': return 'layers';
      case 'Zooms': return 'maximize-2';
      case 'Slides': return 'arrow-right';
      default: return 'sparkles';
    }
  });

  selectCategory(cat: string) {
    this.selectedCategory.set(cat);
    const first = this.allAnimations.find(a => a.category === cat);
    if (first) {
      this.selectedAnimClass.set(first.className);
    }
    this.replayAnimation();
  }

  onSelectAnim(cls: string) {
    this.selectedAnimClass.set(cls);
    this.replayAnimation();
  }

  onSpeedChange(speed: string) {
    this.selectedSpeed.set(speed);
    this.replayAnimation();
  }

  onToggleInfinite(checked: boolean) {
    this.isInfinite.set(checked);
    this.replayAnimation();
  }

  triggerSpecific(cls: string) {
    this.selectedAnimClass.set(cls);
    this.replayAnimation();
  }

  replayAnimation() {
    this.isAnimating.set(false);
    setTimeout(() => {
      this.isAnimating.set(true);
    }, 20);
  }

  copySnippet() {
    const target = this.selectedTargetType();
    let snippet = `<div class="${this.currentAppliedClass()}">Contenido</div>`;
    if (target === 'button') {
      snippet = `<ox-button class="${this.currentAppliedClass()}" variant="primary">Botón Animado</ox-button>`;
    } else if (target === 'card') {
      snippet = `<ox-card class="${this.currentAppliedClass()}">Tarjeta con contenido animado</ox-card>`;
    } else if (target === 'alert') {
      snippet = `<ox-alert class="${this.currentAppliedClass()}" severity="info">Mensaje animado</ox-alert>`;
    }
    navigator.clipboard.writeText(snippet);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  // Demos estáticos
  transitionsHtml = `<div class="ox-transition ox-duration-300 ox-hover-scale-110 ox-bg-primary ox-text-white">
  Hover: Scale 110%
</div>

<div class="ox-transition-all ox-duration-500 ox-ease-in-out ox-hover-shadow-md">
  Ease-in-out + Sombra
</div>`;

  rotateHtml = `<div class="ox-rotate-45 ox-bg-primary ox-text-white">45°</div>
<div class="ox-rotate-90">90°</div>
<div class="ox-rotate-n45 ox-bg-danger ox-text-white">-45°</div>`;

  uiLoopsHtml = `<!-- 1. Spinner de carga -->
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
    // Transiciones y Transform
    { name: '.ox-transition', css: 'transition-property: color, background-color, transform, etc.', description: 'Aplica transición estándar', responsive: false },
    { name: '.ox-transition-all', css: 'transition-property: all', description: 'Transición para todas las propiedades', responsive: false },
    { name: '.ox-duration-150 / 300 / 500 / 1000', css: 'transition-duration: 150ms / 300ms / 500ms / 1s', description: 'Duración de la animación', responsive: false },
    { name: '.ox-scale-50 / 90 / 100 / 105 / 110 / 125 / 150', css: 'transform: scale(...)', description: 'Escalado proporcional', responsive: false },
    { name: '.ox-rotate-0 / 45 / 90 / 180 / n45 / n90', css: 'transform: rotate(...)', description: 'Rotación angular positiva o negativa', responsive: false },

    // Fades
    { name: '.ox-anim-fade-in / -up / -down / -left / -right', css: 'animation: ox-fade-in* 1s both', description: 'Entradas con desvanecimiento direccional', responsive: false },
    { name: '.ox-anim-fade-out / -up / -down / -left / -right', css: 'animation: ox-fade-out* 1s both', description: 'Salidas con desvanecimiento direccional', responsive: false },

    // Zooms
    { name: '.ox-anim-zoom-in / -up / -down / -left / -right', css: 'animation: ox-zoom-in* 1s both', description: 'Entradas con efecto zoom', responsive: false },
    { name: '.ox-anim-zoom-out / -up / -down', css: 'animation: ox-zoom-out* 1s both', description: 'Salidas con reducción de escala', responsive: false },

    // Slides
    { name: '.ox-anim-slide-in-up / -down / -left / -right', css: 'animation: ox-slide-in* 1s both', description: 'Entradas deslizantes', responsive: false },
    { name: '.ox-anim-slide-out-up / -down / -left / -right', css: 'animation: ox-slide-out* 1s both', description: 'Salidas deslizantes', responsive: false },

    // Bounces
    { name: '.ox-anim-bounce-in / -up / -down / -left / -right', css: 'animation: ox-bounce-in* 1s both', description: 'Entradas con rebote dinámico', responsive: false },
    { name: '.ox-anim-bounce-out / -up / -down', css: 'animation: ox-bounce-out* 1s both', description: 'Salidas con rebote', responsive: false },

    // Attention
    { name: '.ox-anim-shake-x / .ox-anim-shake-y', css: 'animation: ox-shake-* 1s both', description: 'Sacudida horizontal (error) o vertical', responsive: false },
    { name: '.ox-anim-heartbeat', css: 'animation: ox-heartbeat 1.3s infinite', description: 'Latido cardíaco para likes/favoritos', responsive: false },
    { name: '.ox-anim-tada', css: 'animation: ox-tada 1s both', description: 'Efecto de celebración / éxito', responsive: false },
    { name: '.ox-anim-wobble / .ox-anim-jello / .ox-anim-rubber-band', css: 'animation: ox-* 1s both', description: 'Efectos elásticos de atención', responsive: false },
    { name: '.ox-anim-flash / .ox-anim-head-shake / .ox-anim-swing', css: 'animation: ox-* 1s both', description: 'Destellos y oscilaciones', responsive: false },

    // Flippers & Specials
    { name: '.ox-anim-flip / .ox-anim-flip-in-x / .ox-anim-flip-in-y', css: 'animation: ox-flip* 1s both', description: 'Volteos 3D espaciales', responsive: false },
    { name: '.ox-anim-rotate-in / .ox-anim-roll-in / .ox-anim-roll-out', css: 'animation: ox-* 1s both', description: 'Rotaciones y rodamientos especiales', responsive: false },

    // Modifiers
    { name: '.ox-anim-infinite', css: 'animation-iteration-count: infinite', description: 'Reproducción en bucle continuo', responsive: false },
    { name: '.ox-anim-faster / .ox-anim-fast', css: 'animation-duration: 500ms / 800ms', description: 'Modificadores de velocidad rápida', responsive: false },
    { name: '.ox-anim-slow / .ox-anim-slower', css: 'animation-duration: 2s / 3s', description: 'Modificadores de velocidad lenta', responsive: false },

    // UI Loops
    { name: '.ox-animate-spin', css: 'animation: ox-spin 1s linear infinite', description: 'Giro continuo de 360° para loaders', responsive: false },
    { name: '.ox-animate-pulse', css: 'animation: ox-pulse 2s infinite', description: 'Efecto de pulso para skeletons', responsive: false },
    { name: '.ox-animate-bounce', css: 'animation: ox-bounce 1s infinite', description: 'Rebote vertical continuo', responsive: false },
    { name: '.ox-animate-ping', css: 'animation: ox-ping 1s infinite', description: 'Efecto de onda expansiva de radar', responsive: false }
  ];
}
