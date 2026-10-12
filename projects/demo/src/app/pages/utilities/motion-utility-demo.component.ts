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
} from 'valence-ui';

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
    <div class="val-page-container">
      <div class="val-header-hero">
        <h1 class="val-page-title">Movimiento, Transiciones & Animaciones</h1>
        <p class="val-page-subtitle">
          Catálogo completo de más de 60 animaciones (estilo Animate.css), keyframes acelerados por hardware y Playground interactivo utilizando los componentes nativos de Valence UI.
        </p>
      </div>

      <!-- ============================================== -->
      <!-- PLAYGROUND INTERACTIVO DE ANIMACIONES           -->
      <!-- ============================================== -->
      <div class="val-playground-card val-mb-5">
        <div class="val-playground-header">
          <div class="val-flex val-align-items-center val-gap-3">
            <span class="val-playground-badge">
              <val-icon name="play" size="1.25rem"></val-icon>
            </span>
            <div>
              <h2 class="val-playground-title">Playground Interactivo de Animaciones</h2>
              <p class="val-playground-desc">Prueba cualquier animación en vivo sobre los componentes de la librería.</p>
            </div>
          </div>
          <val-button variant="primary" (onClick)="replayAnimation()">
            <val-icon name="rotate-cw" size="1rem"></val-icon>
            Replay
          </val-button>
        </div>

        <div class="val-playground-body">
          <!-- CONTROLES -->
          <div class="val-controls-panel">
            <!-- 1. Familia -->
            <div class="val-control-group">
              <label class="val-control-label">Familia de Animación</label>
              <div class="val-category-chips">
                @for (cat of categories; track cat) {
                  <val-button 
                    [variant]="selectedCategory() === cat ? 'primary' : 'outline-secondary'"
                    size="sm"
                    (onClick)="selectCategory(cat)">
                    {{ cat }}
                  </val-button>
                }
              </div>
            </div>

            <!-- 2. Efecto (val-dropdown) -->
            <div class="val-control-group">
              <label class="val-control-label">Efecto de Animación</label>
              <val-dropdown 
                [options]="animDropdownOptions()" 
                [(ngModel)]="selectedAnimClass" 
                (ngModelChange)="onSelectAnim($event)">
              </val-dropdown>
            </div>

            <!-- 3. Componente Objetivo (val-dropdown) -->
            <div class="val-control-group">
              <label class="val-control-label">Componente a Animar</label>
              <val-dropdown 
                [options]="targetComponentOptions" 
                [(ngModel)]="selectedTargetType" 
                (ngModelChange)="replayAnimation()">
              </val-dropdown>
            </div>

            <!-- 4. Velocidad & Bucle (val-dropdown & val-input-switch) -->
            <div class="val-control-row">
              <div class="val-control-group val-flex-1">
                <label class="val-control-label">Velocidad</label>
                <val-dropdown 
                  [options]="speedDropdownOptions" 
                  [(ngModel)]="selectedSpeed" 
                  (ngModelChange)="onSpeedChange($event)">
                </val-dropdown>
              </div>

              <div class="val-control-group">
                <label class="val-control-label">Bucle continuo</label>
                <div class="val-flex val-align-items-center val-gap-2 val-pt-1">
                  <val-input-switch 
                    [(checked)]="isInfinite" 
                    color="primary"
                    (checkedChange)="onToggleInfinite($event)">
                  </val-input-switch>
                  <span class="val-fs-xs val-fw-bold val-text-muted">.val-anim-infinite</span>
                </div>
              </div>
            </div>
          </div>

          <!-- ESCENARIO DE VISUALIZACIÓN -->
          <div class="val-stage-panel">
            <div class="val-stage-box">
              @if (isAnimating()) {
                <div [class]="currentAppliedClass()" class="val-anim-stage-wrapper">
                  
                  @switch (selectedTargetType()) {
                    @case ('card') {
                      <val-card boxShadow="md" class="val-demo-target-card">
                        <div class="val-flex val-align-items-center val-gap-3 val-p-3">
                          <val-icon [name]="targetIcon()" size="2rem" color="primary"></val-icon>
                          <div>
                            <h4 class="val-m-0 val-fs-md val-fw-bold">{{ selectedAnimName() }}</h4>
                            <span class="val-fs-xs val-text-muted">{{ selectedAnimClass() }}</span>
                          </div>
                        </div>
                      </val-card>
                    }

                    @case ('button') {
                      <val-button variant="primary" size="lg">
                        <val-icon [name]="targetIcon()" size="1.25rem"></val-icon>
                        {{ selectedAnimName() }}
                      </val-button>
                    }

                    @case ('alert') {
                      <val-alert severity="info" variant="glass" [closable]="false">
                        <strong>{{ selectedAnimName() }}:</strong> Animación aplicada al componente Alert de Valence UI.
                      </val-alert>
                    }

                    @case ('badge') {
                      <div class="val-flex val-align-items-center val-gap-2">
                        <val-badge severity="danger" size="lg" [value]="selectedAnimName()"></val-badge>
                        <val-tag severity="success" [value]="selectedAnimClass()"></val-tag>
                      </div>
                    }

                    @default {
                      <div class="val-anim-target-card">
                        <div class="val-target-icon">
                          <val-icon [name]="targetIcon()" size="2rem"></val-icon>
                        </div>
                        <strong class="val-target-title">{{ selectedAnimName() }}</strong>
                        <span class="val-target-sub">{{ selectedAnimClass() }}</span>
                      </div>
                    }
                  }

                </div>
              }
            </div>

            <div class="val-snippet-bar">
              <code class="val-snippet-text">&lt;div class="{{ currentAppliedClass() }}"&gt;...&lt;/div&gt;</code>
              <val-button variant="secondary" size="sm" (onClick)="copySnippet()">
                <val-icon [name]="copied() ? 'check' : 'copy'" size="1rem"></val-icon>
                {{ copied() ? 'Copiado' : 'Copiar' }}
              </val-button>
            </div>
          </div>
        </div>
      </div>

      <!-- ============================================== -->
      <!-- DEMO 1: TRANSICIONES Y HOVER SCALE             -->
      <!-- ============================================== -->
      <app-doc-code
        title="1. Transiciones & Transformaciones de Escala (.val-transition, .val-scale-*)"
        description="Combina .val-transition con .val-duration-* y estados hover para efectos interactivos fluidos."
        [html]="transitionsHtml">
        <div class="val-demo-box val-flex val-flex-wrap val-gap-4 val-align-items-center">
          <div class="val-preview-card val-transition val-duration-300 val-hover-scale-110 val-shadow-sm val-rounded-md val-bg-primary val-text-white val-cursor-pointer">
            Hover: Scale 110%
          </div>
          <div class="val-preview-card val-transition val-duration-300 val-hover-scale-95 val-shadow-sm val-rounded-md val-bg-secondary val-text-white val-cursor-pointer">
            Hover: Scale 95%
          </div>
          <div class="val-preview-card val-transition-all val-duration-500 val-ease-in-out val-hover-scale-105 val-hover-shadow-md val-rounded-md val-border val-cursor-pointer">
            Ease-in-out + Sombra
          </div>
        </div>
      </app-doc-code>

      <!-- ============================================== -->
      <!-- DEMO 2: ROTACIONES Y ÁNGULOS                   -->
      <!-- ============================================== -->
      <app-doc-code
        title="2. Rotaciones (.val-rotate-*)"
        description="Aplica rotaciones angulares fijas o interactivas con .val-rotate-*."
        [html]="rotateHtml">
        <div class="val-demo-box val-flex val-flex-wrap val-gap-4 val-align-items-center">
          <div class="val-preview-card val-rotate-0 val-border val-rounded-md">0°</div>
          <div class="val-preview-card val-rotate-45 val-border val-rounded-md val-bg-primary val-text-white">45°</div>
          <div class="val-preview-card val-rotate-90 val-border val-rounded-md">90°</div>
          <div class="val-preview-card val-rotate-n45 val-border val-rounded-md val-bg-danger val-text-white">-45°</div>
        </div>
      </app-doc-code>

      <!-- ============================================== -->
      <!-- DEMO 3: UI LOOPS & NOTIFICACIONES               -->
      <!-- ============================================== -->
      <app-doc-code
        title="3. Animaciones Funcionales de UI (.val-animate-*)"
        description="Keyframes optimizados para spinners de carga, esqueletos (skeletons), rebotes y notificaciones tipo radar."
        [html]="uiLoopsHtml">
        <div class="val-demo-box">
          <div class="val-anim-grid">
            <div class="val-anim-card" (click)="triggerSpecific('val-animate-spin')">
              <div class="val-anim-stage">
                <val-icon name="loader" size="2rem" class="val-animate-spin val-text-primary"></val-icon>
              </div>
              <div class="val-anim-info">
                <code class="val-anim-badge">.val-animate-spin</code>
                <span class="val-anim-desc">Spinner 360° continuo</span>
              </div>
            </div>

            <div class="val-anim-card" (click)="triggerSpecific('val-animate-pulse')">
              <div class="val-anim-stage">
                <div class="val-skeleton-preview val-animate-pulse">
                  <div class="val-skeleton-line" style="width: 80%;"></div>
                  <div class="val-skeleton-line" style="width: 50%;"></div>
                </div>
              </div>
              <div class="val-anim-info">
                <code class="val-anim-badge">.val-animate-pulse</code>
                <span class="val-anim-desc">Skeleton loading suave</span>
              </div>
            </div>

            <div class="val-anim-card" (click)="triggerSpecific('val-animate-bounce')">
              <div class="val-anim-stage">
                <div class="val-bounce-dot val-animate-bounce val-bg-success"></div>
              </div>
              <div class="val-anim-info">
                <code class="val-anim-badge">.val-animate-bounce</code>
                <span class="val-anim-desc">Rebote vertical</span>
              </div>
            </div>

            <div class="val-anim-card" (click)="triggerSpecific('val-animate-ping')">
              <div class="val-anim-stage">
                <span class="val-ping-wrapper">
                  <span class="val-animate-ping val-ping-beacon"></span>
                  <span class="val-ping-core"></span>
                </span>
              </div>
              <div class="val-anim-info">
                <code class="val-anim-badge">.val-animate-ping</code>
                <span class="val-anim-desc">Radar / Notificación</span>
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
      padding: 1.5rem;
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      border-radius: 8px;
    }
    .val-preview-card {
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
    .val-playground-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .val-playground-header {
      padding: 1.25rem 1.5rem;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .val-playground-badge {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: #0066ff;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .val-playground-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
    }
    .val-playground-desc {
      font-size: 0.8125rem;
      color: #64748b;
      margin: 0;
    }

    .val-playground-body {
      display: grid;
      grid-template-columns: 360px 1fr;
      min-height: 380px;
    }
    @media (max-width: 960px) {
      .val-playground-body {
        grid-template-columns: 1fr;
      }
    }

    .val-controls-panel {
      padding: 1.5rem;
      border-right: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      background: #ffffff;
    }
    .val-control-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .val-control-row {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }
    .val-control-label {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #475569;
    }
    .val-category-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
    }

    .val-stage-panel {
      padding: 1.5rem;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.5rem;
    }
    .val-stage-box {
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
    .val-anim-stage-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .val-demo-target-card {
      min-width: 240px;
      padding: 1.25rem 1.5rem;
    }
    .val-anim-target-card {
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
    .val-target-icon {
      margin-bottom: 0.5rem;
    }
    .val-target-title {
      font-size: 1.125rem;
      font-weight: 700;
    }
    .val-target-sub {
      font-size: 0.75rem;
      opacity: 0.85;
      font-family: monospace;
      margin-top: 2px;
    }

    .val-snippet-bar {
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
    .val-snippet-text {
      color: #38bdf8;
      overflow-x: auto;
      white-space: nowrap;
    }

    /* Anim Showcase Grid */
    .val-anim-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      width: 100%;
    }
    .val-anim-card {
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
    .val-anim-card:hover {
      border-color: #0066ff;
      transform: translateY(-2px);
    }
    .val-anim-stage {
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.75rem;
      width: 100%;
    }
    .val-anim-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
    }
    .val-anim-badge {
      background: #eff6ff;
      color: #1d4ed8;
      padding: 0.25rem 0.6rem;
      border-radius: 4px;
      font-size: 0.8125rem;
      font-weight: 600;
      border: 1px solid #dbeafe;
    }
    .val-anim-desc {
      font-size: 0.75rem;
      color: #64748b;
    }

    /* Skeleton preview */
    .val-skeleton-preview {
      width: 100%;
      max-width: 130px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .val-skeleton-line {
      height: 10px;
      background: #cbd5e1;
      border-radius: 4px;
    }
    .val-bounce-dot {
      width: 22px;
      height: 22px;
      border-radius: 50%;
    }
    .val-ping-wrapper {
      position: relative;
      display: inline-flex;
      width: 18px;
      height: 18px;
    }
    .val-ping-beacon {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: #dc3545;
      opacity: 0.75;
    }
    .val-ping-core {
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
  selectedAnimClass = signal<string>('val-anim-fade-in-up');
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
    { label: 'Valence Card (<val-card>)', value: 'card' },
    { label: 'Valence Button (<val-button>)', value: 'button' },
    { label: 'Valence Alert (<val-alert>)', value: 'alert' },
    { label: 'Valence Badge & Tag (<val-badge>)', value: 'badge' },
    { label: 'Hero Gradient Box', value: 'hero' }
  ];

  speedDropdownOptions: DropdownOption<string>[] = [
    { label: 'Normal (1s)', value: '' },
    { label: 'Faster (500ms)', value: 'val-anim-faster' },
    { label: 'Fast (800ms)', value: 'val-anim-fast' },
    { label: 'Slow (2s)', value: 'val-anim-slow' },
    { label: 'Slower (3s)', value: 'val-anim-slower' }
  ];

  allAnimations: AnimationItem[] = [
    // Fades
    { name: 'Fade In', className: 'val-anim-fade-in', category: 'Fades', description: 'Aparición suave' },
    { name: 'Fade In Up', className: 'val-anim-fade-in-up', category: 'Fades', description: 'Entrada fade desde abajo' },
    { name: 'Fade In Down', className: 'val-anim-fade-in-down', category: 'Fades', description: 'Entrada fade desde arriba' },
    { name: 'Fade In Left', className: 'val-anim-fade-in-left', category: 'Fades', description: 'Entrada fade desde la izquierda' },
    { name: 'Fade In Right', className: 'val-anim-fade-in-right', category: 'Fades', description: 'Entrada fade desde la derecha' },
    { name: 'Fade Out', className: 'val-anim-fade-out', category: 'Fades', description: 'Desvanecimiento hacia transparente' },
    { name: 'Fade Out Up', className: 'val-anim-fade-out-up', category: 'Fades', description: 'Salida hacia arriba' },
    { name: 'Fade Out Down', className: 'val-anim-fade-out-down', category: 'Fades', description: 'Salida hacia abajo' },

    // Zooms
    { name: 'Zoom In', className: 'val-anim-zoom-in', category: 'Zooms', description: 'Aparición con zoom progresivo' },
    { name: 'Zoom In Up', className: 'val-anim-zoom-in-up', category: 'Zooms', description: 'Entrada zoom desde abajo' },
    { name: 'Zoom In Down', className: 'val-anim-zoom-in-down', category: 'Zooms', description: 'Entrada zoom desde arriba' },
    { name: 'Zoom In Left', className: 'val-anim-zoom-in-left', category: 'Zooms', description: 'Entrada zoom desde la izquierda' },
    { name: 'Zoom In Right', className: 'val-anim-zoom-in-right', category: 'Zooms', description: 'Entrada zoom desde la derecha' },
    { name: 'Zoom Out', className: 'val-anim-zoom-out', category: 'Zooms', description: 'Desaparición con reducción' },
    { name: 'Zoom Out Up', className: 'val-anim-zoom-out-up', category: 'Zooms', description: 'Salida con reducción hacia arriba' },
    { name: 'Zoom Out Down', className: 'val-anim-zoom-out-down', category: 'Zooms', description: 'Salida con reducción hacia abajo' },

    // Slides
    { name: 'Slide In Up', className: 'val-anim-slide-in-up', category: 'Slides', description: 'Deslizamiento desde abajo' },
    { name: 'Slide In Down', className: 'val-anim-slide-in-down', category: 'Slides', description: 'Deslizamiento desde arriba' },
    { name: 'Slide In Left', className: 'val-anim-slide-in-left', category: 'Slides', description: 'Deslizamiento desde la izquierda' },
    { name: 'Slide In Right', className: 'val-anim-slide-in-right', category: 'Slides', description: 'Deslizamiento desde la derecha' },
    { name: 'Slide Out Up', className: 'val-anim-slide-out-up', category: 'Slides', description: 'Salida deslizante hacia arriba' },
    { name: 'Slide Out Down', className: 'val-anim-slide-out-down', category: 'Slides', description: 'Salida deslizante hacia abajo' },
    { name: 'Slide Out Left', className: 'val-anim-slide-out-left', category: 'Slides', description: 'Salida deslizante hacia la izquierda' },
    { name: 'Slide Out Right', className: 'val-anim-slide-out-right', category: 'Slides', description: 'Salida deslizante hacia la derecha' },

    // Bounces
    { name: 'Bounce In', className: 'val-anim-bounce-in', category: 'Bounces', description: 'Entrada con rebote elástico' },
    { name: 'Bounce In Up', className: 'val-anim-bounce-in-up', category: 'Bounces', description: 'Entrada con rebote desde abajo' },
    { name: 'Bounce In Down', className: 'val-anim-bounce-in-down', category: 'Bounces', description: 'Entrada con rebote desde arriba' },
    { name: 'Bounce In Left', className: 'val-anim-bounce-in-left', category: 'Bounces', description: 'Entrada con rebote desde la izquierda' },
    { name: 'Bounce In Right', className: 'val-anim-bounce-in-right', category: 'Bounces', description: 'Entrada con rebote desde la derecha' },
    { name: 'Bounce Out', className: 'val-anim-bounce-out', category: 'Bounces', description: 'Salida con rebote' },
    { name: 'Bounce Out Up', className: 'val-anim-bounce-out-up', category: 'Bounces', description: 'Salida con rebote hacia arriba' },
    { name: 'Bounce Out Down', className: 'val-anim-bounce-out-down', category: 'Bounces', description: 'Salida con rebote hacia abajo' },

    // Attention
    { name: 'Shake (X)', className: 'val-anim-shake-x', category: 'Attention', description: 'Sacudida horizontal (error)' },
    { name: 'Shake (Y)', className: 'val-anim-shake-y', category: 'Attention', description: 'Sacudida vertical' },
    { name: 'Heartbeat', className: 'val-anim-heartbeat', category: 'Attention', description: 'Latido cardíaco' },
    { name: 'Tada', className: 'val-anim-tada', category: 'Attention', description: 'Efecto de celebración / logro' },
    { name: 'Wobble', className: 'val-anim-wobble', category: 'Attention', description: 'Bamboleo lateral dinámico' },
    { name: 'Jello', className: 'val-anim-jello', category: 'Attention', description: 'Efecto gelatina elástica' },
    { name: 'Rubber Band', className: 'val-anim-rubber-band', category: 'Attention', description: 'Estiramiento de banda elástica' },
    { name: 'Flash', className: 'val-anim-flash', category: 'Attention', description: 'Destello de atención' },
    { name: 'Head Shake', className: 'val-anim-head-shake', category: 'Attention', description: 'Negación con la cabeza' },
    { name: 'Swing', className: 'val-anim-swing', category: 'Attention', description: 'Péndulo oscilante superior' },

    // Flippers
    { name: 'Flip (3D)', className: 'val-anim-flip', category: 'Flippers', description: 'Giro completo 3D' },
    { name: 'Flip In X', className: 'val-anim-flip-in-x', category: 'Flippers', description: 'Volteo 3D en eje horizontal' },
    { name: 'Flip In Y', className: 'val-anim-flip-in-y', category: 'Flippers', description: 'Volteo 3D en eje vertical' },
    { name: 'Flip Out X', className: 'val-anim-flip-out-x', category: 'Flippers', description: 'Salida con volteo en eje X' },
    { name: 'Flip Out Y', className: 'val-anim-flip-out-y', category: 'Flippers', description: 'Salida con volteo en eje Y' },

    // Rotating & Specials
    { name: 'Rotate In', className: 'val-anim-rotate-in', category: 'Rotating & Specials', description: 'Entrada rotativa angular' },
    { name: 'Rotate In Down Left', className: 'val-anim-rotate-in-down-left', category: 'Rotating & Specials', description: 'Rotación desde esquina inferior izquierda' },
    { name: 'Rotate In Down Right', className: 'val-anim-rotate-in-down-right', category: 'Rotating & Specials', description: 'Rotación desde esquina inferior derecha' },
    { name: 'Rotate Out', className: 'val-anim-rotate-out', category: 'Rotating & Specials', description: 'Salida rotativa' },
    { name: 'Roll In', className: 'val-anim-roll-in', category: 'Rotating & Specials', description: 'Rodamiento de entrada' },
    { name: 'Roll Out', className: 'val-anim-roll-out', category: 'Rotating & Specials', description: 'Rodamiento de salida' }
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
    const inf = this.isInfinite() ? 'val-anim-infinite' : '';
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
      snippet = `<val-button class="${this.currentAppliedClass()}" variant="primary">Botón Animado</val-button>`;
    } else if (target === 'card') {
      snippet = `<val-card class="${this.currentAppliedClass()}">Tarjeta con contenido animado</val-card>`;
    } else if (target === 'alert') {
      snippet = `<val-alert class="${this.currentAppliedClass()}" severity="info">Mensaje animado</val-alert>`;
    }
    navigator.clipboard.writeText(snippet);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  // Demos estáticos
  transitionsHtml = `<div class="val-transition val-duration-300 val-hover-scale-110 val-bg-primary val-text-white">
  Hover: Scale 110%
</div>

<div class="val-transition-all val-duration-500 val-ease-in-out val-hover-shadow-md">
  Ease-in-out + Sombra
</div>`;

  rotateHtml = `<div class="val-rotate-45 val-bg-primary val-text-white">45°</div>
<div class="val-rotate-90">90°</div>
<div class="val-rotate-n45 val-bg-danger val-text-white">-45°</div>`;

  uiLoopsHtml = `<!-- 1. Spinner de carga -->
<val-icon name="loader" class="val-animate-spin val-text-primary"></val-icon>

<!-- 2. Skeleton Loading -->
<div class="val-animate-pulse val-rounded val-bg-secondary val-opacity-50"></div>

<!-- 3. Rebote elástico -->
<div class="val-rounded-circle val-bg-success val-animate-bounce"></div>

<!-- 4. Indicador ping / radar -->
<span class="val-relative val-flex">
  <span class="val-animate-ping val-absolute val-rounded-circle val-bg-danger"></span>
  <span class="val-relative val-rounded-circle val-bg-danger"></span>
</span>`;

  motionClasses: UtilityClass[] = [
    // Transiciones y Transform
    { name: '.val-transition', css: 'transition-property: color, background-color, transform, etc.', description: 'Aplica transición estándar', responsive: false },
    { name: '.val-transition-all', css: 'transition-property: all', description: 'Transición para todas las propiedades', responsive: false },
    { name: '.val-duration-150 / 300 / 500 / 1000', css: 'transition-duration: 150ms / 300ms / 500ms / 1s', description: 'Duración de la animación', responsive: false },
    { name: '.val-scale-50 / 90 / 100 / 105 / 110 / 125 / 150', css: 'transform: scale(...)', description: 'Escalado proporcional', responsive: false },
    { name: '.val-rotate-0 / 45 / 90 / 180 / n45 / n90', css: 'transform: rotate(...)', description: 'Rotación angular positiva o negativa', responsive: false },

    // Fades
    { name: '.val-anim-fade-in / -up / -down / -left / -right', css: 'animation: val-fade-in* 1s both', description: 'Entradas con desvanecimiento direccional', responsive: false },
    { name: '.val-anim-fade-out / -up / -down / -left / -right', css: 'animation: val-fade-out* 1s both', description: 'Salidas con desvanecimiento direccional', responsive: false },

    // Zooms
    { name: '.val-anim-zoom-in / -up / -down / -left / -right', css: 'animation: val-zoom-in* 1s both', description: 'Entradas con efecto zoom', responsive: false },
    { name: '.val-anim-zoom-out / -up / -down', css: 'animation: val-zoom-out* 1s both', description: 'Salidas con reducción de escala', responsive: false },

    // Slides
    { name: '.val-anim-slide-in-up / -down / -left / -right', css: 'animation: val-slide-in* 1s both', description: 'Entradas deslizantes', responsive: false },
    { name: '.val-anim-slide-out-up / -down / -left / -right', css: 'animation: val-slide-out* 1s both', description: 'Salidas deslizantes', responsive: false },

    // Bounces
    { name: '.val-anim-bounce-in / -up / -down / -left / -right', css: 'animation: val-bounce-in* 1s both', description: 'Entradas con rebote dinámico', responsive: false },
    { name: '.val-anim-bounce-out / -up / -down', css: 'animation: val-bounce-out* 1s both', description: 'Salidas con rebote', responsive: false },

    // Attention
    { name: '.val-anim-shake-x / .val-anim-shake-y', css: 'animation: val-shake-* 1s both', description: 'Sacudida horizontal (error) o vertical', responsive: false },
    { name: '.val-anim-heartbeat', css: 'animation: val-heartbeat 1.3s infinite', description: 'Latido cardíaco para likes/favoritos', responsive: false },
    { name: '.val-anim-tada', css: 'animation: val-tada 1s both', description: 'Efecto de celebración / éxito', responsive: false },
    { name: '.val-anim-wobble / .val-anim-jello / .val-anim-rubber-band', css: 'animation: ox-* 1s both', description: 'Efectos elásticos de atención', responsive: false },
    { name: '.val-anim-flash / .val-anim-head-shake / .val-anim-swing', css: 'animation: ox-* 1s both', description: 'Destellos y oscilaciones', responsive: false },

    // Flippers & Specials
    { name: '.val-anim-flip / .val-anim-flip-in-x / .val-anim-flip-in-y', css: 'animation: val-flip* 1s both', description: 'Volteos 3D espaciales', responsive: false },
    { name: '.val-anim-rotate-in / .val-anim-roll-in / .val-anim-roll-out', css: 'animation: ox-* 1s both', description: 'Rotaciones y rodamientos especiales', responsive: false },

    // Modifiers
    { name: '.val-anim-infinite', css: 'animation-iteration-count: infinite', description: 'Reproducción en bucle continuo', responsive: false },
    { name: '.val-anim-faster / .val-anim-fast', css: 'animation-duration: 500ms / 800ms', description: 'Modificadores de velocidad rápida', responsive: false },
    { name: '.val-anim-slow / .val-anim-slower', css: 'animation-duration: 2s / 3s', description: 'Modificadores de velocidad lenta', responsive: false },

    // UI Loops
    { name: '.val-animate-spin', css: 'animation: val-spin 1s linear infinite', description: 'Giro continuo de 360° para loaders', responsive: false },
    { name: '.val-animate-pulse', css: 'animation: val-pulse 2s infinite', description: 'Efecto de pulso para skeletons', responsive: false },
    { name: '.val-animate-bounce', css: 'animation: val-bounce 1s infinite', description: 'Rebote vertical continuo', responsive: false },
    { name: '.val-animate-ping', css: 'animation: val-ping 1s infinite', description: 'Efecto de onda expansiva de radar', responsive: false }
  ];
}
