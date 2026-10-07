import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IconComponent, 
  ButtonComponent, 
  BadgeComponent,
  CardComponent,
  DropdownComponent,
  SelectButtonComponent,
  ToggleButtonComponent,
  SliderComponent,
  InputComponent,
  TooltipDirective,
  ToastComponent,
  ToastService,
  OX_ICONS, 
  OxIconName, 
  OxIconVariant,
  OxIconSize, 
  OxIconColor 
} from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-icon-demo',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IconComponent, 
    ButtonComponent, 
    BadgeComponent,
    CardComponent,
    DropdownComponent,
    SelectButtonComponent,
    ToggleButtonComponent,
    SliderComponent,
    InputComponent,
    TooltipDirective,
    ToastComponent,
    DocCodeComponent, 
    DocApiTableComponent
  ],
  template: `
    <div class="ox-page-container">
      <ox-toast></ox-toast>

      <div class="ox-header-hero">
        <div class="ox-badge-wrapper" style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem;">
          <ox-badge value="Componente UI" severity="primary" size="sm"></ox-badge>
          <ox-badge [value]="allIconKeys.length + '+ Iconos SVG'" severity="info" size="sm"></ox-badge>
        </div>
        <h1 class="ox-page-title">Icon (Iconos SVG Nativos)</h1>
        <p class="ox-page-subtitle">
          Componente de iconos SVG vectoriales ultra ligero y de alto rendimiento. Totalmente personalizable con tamaños, colores temáticos, grosores de trazo, rotación y animación de giro (spin).
        </p>
      </div>

      <!-- PLAYGROUND INTERACTIVO -->
      <ox-card class="ox-mb-4">
        <div style="padding: 1.5rem;">
          <div class="ox-playground-header">
            <h3 style="display: flex; align-items: center; gap: 8px; margin: 0 0 0.25rem 0;">
              <ox-icon name="sliders" size="md" color="primary"></ox-icon>
              Playground Interactivo
            </h3>
            <p style="color: #64748b; font-size: 0.875rem; margin: 0 0 1.5rem 0;">
              Prueba en vivo cómo cambia el icono con diferentes tamaños, colores, grosor y animación usando componentes nativos de Oxygen UI.
            </p>
          </div>

          <div class="ox-playground-body">
            <div class="ox-preview-stage">
              <div class="ox-preview-icon-wrapper">
                <ox-icon 
                  [name]="selectedDemoIcon()"
                  [size]="selectedSize()"
                  [color]="selectedColor()"
                  [strokeWidth]="selectedStrokeWidth()"
                  [variant]="selectedVariant()"
                  [spin]="isSpinning()"
                  [rotate]="selectedRotate()">
                </ox-icon>
              </div>
              <div class="ox-preview-label">
                <code>&lt;ox-icon name="{{ selectedDemoIcon() }}" size="{{ selectedSize() }}" color="{{ selectedColor() }}" variant="{{ selectedVariant() }}" [strokeWidth]="{{ selectedStrokeWidth() }}" [spin]="{{ isSpinning() }}" [rotate]="{{ selectedRotate() }}"&gt;&lt;/ox-icon&gt;</code>
              </div>
            </div>

            <!-- CONTROLES NATIVOS OXYGEN UI -->
            <div class="ox-controls-panel">
              <!-- Icono Seleccionado -->
              <div class="ox-control-group">
                <label class="ox-control-label">Icono de Muestra</label>
                <ox-dropdown 
                  [options]="sampleIconOptions" 
                  [ngModel]="selectedDemoIcon()" 
                  (ngModelChange)="selectedDemoIcon.set($event)"
                  optionLabel="label"
                  optionValue="value"
                  [filter]="true">
                </ox-dropdown>
              </div>

              <!-- Estilo / Variante -->
              <div class="ox-control-group">
                <label class="ox-control-label">Variante de Estilo: <strong>{{ selectedVariant() }}</strong></label>
                <ox-select-button 
                  [options]="variantOptions" 
                  [ngModel]="selectedVariant()" 
                  (ngModelChange)="selectedVariant.set($event)">
                </ox-select-button>
              </div>

              <!-- Tamaño -->
              <div class="ox-control-group">
                <label class="ox-control-label">Tamaño (size): <strong>{{ selectedSize() }}</strong></label>
                <ox-select-button 
                  [options]="sizeButtonOptions" 
                  [ngModel]="selectedSize()" 
                  (ngModelChange)="selectedSize.set($event)">
                </ox-select-button>
              </div>

              <!-- Color -->
              <div class="ox-control-group">
                <label class="ox-control-label">Color (color): <strong>{{ selectedColor() }}</strong></label>
                <div class="ox-color-chips">
                  @for (c of colorOptions; track c.id) {
                    <button 
                      type="button" 
                      class="ox-color-chip" 
                      [style.background]="c.hex"
                      [class.ox-color-chip-active]="selectedColor() === c.id"
                      (click)="selectedColor.set(c.id)"
                      [title]="c.id">
                    </button>
                  }
                </div>
              </div>

              <!-- Grosor de Trazo -->
              <div class="ox-control-group">
                <label class="ox-control-label">Grosor de Trazo (strokeWidth): <strong>{{ selectedStrokeWidth() }}px</strong></label>
                <div style="padding: 0.5rem 0;">
                  <ox-slider 
                    [ngModel]="selectedStrokeWidth()" 
                    (ngModelChange)="selectedStrokeWidth.set($event)"
                    [min]="1" 
                    [max]="3.5" 
                    [step]="0.5">
                  </ox-slider>
                </div>
              </div>

              <!-- Rotación & Spin -->
              <div class="ox-control-group-row" style="display: flex; gap: 1rem; align-items: flex-end;">
                <div class="ox-control-group" style="flex: 1">
                  <label class="ox-control-label">Rotación</label>
                  <ox-dropdown 
                    [options]="rotateOptions" 
                    [ngModel]="selectedRotate()" 
                    (ngModelChange)="selectedRotate.set(+$event)">
                  </ox-dropdown>
                </div>

                <div class="ox-control-group" style="flex: 1">
                  <label class="ox-control-label">Animación</label>
                  <ox-toggle-button 
                    [ngModel]="isSpinning()" 
                    (ngModelChange)="isSpinning.set($event)"
                    onLabel="Giro Activo" 
                    offLabel="Sin Giro"
                    onIcon="rotate-cw"
                    offIcon="rotate-cw">
                  </ox-toggle-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ox-card>

      <!-- DEMO 1: TAMAÑOS -->
      <app-doc-code
        title="1. Escala de Tamaños"
        description="Opciones estándar: xs (14px), sm (16px), md (20px), lg (24px), xl (32px), 2xl (40px), 3xl (48px) o valores numéricos en píxeles."
        [html]="sizesHtml"
        [ts]="sampleTs">
        <div class="ox-flex ox-align-items-center ox-gap-3 ox-flex-wrap">
          <div class="ox-size-card"><ox-icon name="heart" size="xs"></ox-icon><span>xs (14px)</span></div>
          <div class="ox-size-card"><ox-icon name="heart" size="sm"></ox-icon><span>sm (16px)</span></div>
          <div class="ox-size-card"><ox-icon name="heart" size="md"></ox-icon><span>md (20px)</span></div>
          <div class="ox-size-card"><ox-icon name="heart" size="lg"></ox-icon><span>lg (24px)</span></div>
          <div class="ox-size-card"><ox-icon name="heart" size="xl"></ox-icon><span>xl (32px)</span></div>
          <div class="ox-size-card"><ox-icon name="heart" size="2xl"></ox-icon><span>2xl (40px)</span></div>
          <div class="ox-size-card"><ox-icon name="heart" size="3xl"></ox-icon><span>3xl (48px)</span></div>
        </div>
      </app-doc-code>

      <!-- DEMO 2: COLORES SEMÁNTICOS -->
      <app-doc-code
        title="2. Colores Semánticos & Herencia"
        description="Conectados automáticamente a la paleta de Oxygen UI o colores hexadecimales directos."
        [html]="colorsHtml"
        [ts]="sampleTs">
        <div class="ox-flex ox-align-items-center ox-gap-4 ox-flex-wrap">
          <div class="ox-flex ox-align-items-center ox-gap-2"><ox-icon name="check-circle" size="lg" color="primary"></ox-icon><span>Primary</span></div>
          <div class="ox-flex ox-align-items-center ox-gap-2"><ox-icon name="check-circle" size="lg" color="success"></ox-icon><span>Success</span></div>
          <div class="ox-flex ox-align-items-center ox-gap-2"><ox-icon name="alert-triangle" size="lg" color="warning"></ox-icon><span>Warning</span></div>
          <div class="ox-flex ox-align-items-center ox-gap-2"><ox-icon name="x-circle" size="lg" color="danger"></ox-icon><span>Danger</span></div>
          <div class="ox-flex ox-align-items-center ox-gap-2"><ox-icon name="info" size="lg" color="info"></ox-icon><span>Info</span></div>
          <div class="ox-flex ox-align-items-center ox-gap-2"><ox-icon name="settings" size="lg" color="secondary"></ox-icon><span>Secondary</span></div>
          <div class="ox-flex ox-align-items-center ox-gap-2"><ox-icon name="star" size="lg" color="#8b5cf6"></ox-icon><span>#8b5cf6</span></div>
        </div>
      </app-doc-code>

      <!-- DEMO 3: VARIANTES OUTLINE VS FILL -->
      <app-doc-code
        title="3. Variantes de Estilo: Outline vs Fill"
        description="Cada icono puede usarse en su versión de contorno (outline) o de relleno sólido (fill) mediante la prop variant='fill' o [fill]='true'."
        [html]="variantsHtml"
        [ts]="sampleTs">
        <div class="ox-flex ox-align-items-center ox-gap-4 ox-flex-wrap">
          <div class="ox-flex ox-flex-column ox-align-items-center ox-gap-2" style="background: #f8fafc; padding: 12px 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div class="ox-flex ox-gap-3"><ox-icon name="heart" size="xl" color="danger"></ox-icon><ox-icon name="heart" variant="fill" size="xl" color="danger"></ox-icon></div>
            <span style="font-size: 0.75rem; color: #64748b;">heart (outline / fill)</span>
          </div>

          <div class="ox-flex ox-flex-column ox-align-items-center ox-gap-2" style="background: #f8fafc; padding: 12px 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div class="ox-flex ox-gap-3"><ox-icon name="star" size="xl" color="warning"></ox-icon><ox-icon name="star-fill" size="xl" color="warning"></ox-icon></div>
            <span style="font-size: 0.75rem; color: #64748b;">star (outline / fill)</span>
          </div>

          <div class="ox-flex ox-flex-column ox-align-items-center ox-gap-2" style="background: #f8fafc; padding: 12px 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div class="ox-flex ox-gap-3"><ox-icon name="bookmark" size="xl" color="primary"></ox-icon><ox-icon name="bookmark" [fill]="true" size="xl" color="primary"></ox-icon></div>
            <span style="font-size: 0.75rem; color: #64748b;">bookmark (outline / fill)</span>
          </div>

          <div class="ox-flex ox-flex-column ox-align-items-center ox-gap-2" style="background: #f8fafc; padding: 12px 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div class="ox-flex ox-gap-3"><ox-icon name="bell" size="xl" color="#8b5cf6"></ox-icon><ox-icon name="bell-fill" size="xl" color="#8b5cf6"></ox-icon></div>
            <span style="font-size: 0.75rem; color: #64748b;">bell (outline / fill)</span>
          </div>

          <div class="ox-flex ox-flex-column ox-align-items-center ox-gap-2" style="background: #f8fafc; padding: 12px 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div class="ox-flex ox-gap-3"><ox-icon name="folder" size="xl" color="warning"></ox-icon><ox-icon name="folder-fill" size="xl" color="warning"></ox-icon></div>
            <span style="font-size: 0.75rem; color: #64748b;">folder (outline / fill)</span>
          </div>

          <div class="ox-flex ox-flex-column ox-align-items-center ox-gap-2" style="background: #f8fafc; padding: 12px 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div class="ox-flex ox-gap-3"><ox-icon name="shield" size="xl" color="success"></ox-icon><ox-icon name="shield-fill" size="xl" color="success"></ox-icon></div>
            <span style="font-size: 0.75rem; color: #64748b;">shield (outline / fill)</span>
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 4: INTEGRACIÓN CON BOTONES Y COMPONENTES -->
      <app-doc-code
        title="4. Integración en Botones y Componentes"
        description="Los iconos se alinean automáticamente al centro vertical junto al texto o dentro de botones."
        [html]="componentsHtml"
        [ts]="sampleTs">
        <div class="ox-flex ox-align-items-center ox-gap-3 ox-flex-wrap">
          <ox-button variant="primary" icon="download">Descargar Archivo</ox-button>
          <ox-button variant="outline-primary" icon="share-2">Compartir</ox-button>
          <ox-button variant="danger" icon="trash-2-fill">Eliminar</ox-button>
          <ox-button variant="secondary" icon="loader">Cargando...</ox-button>
        </div>
      </app-doc-code>

      <!-- CATÁLOGO COMPLETO DE ICONOS CON BUSCADOR -->
      <ox-card class="ox-catalog-card">
        <div style="padding: 1.5rem;">
          <div class="ox-catalog-header">
            <div>
              <h2 class="ox-catalog-title" style="display: flex; align-items: center; gap: 8px;">
                <ox-icon name="grid" size="md" color="primary"></ox-icon>
                Catálogo Completo ({{ allIconKeys.length }} Iconos)
              </h2>
              <p class="ox-catalog-desc">Haz clic en cualquier tarjeta para copiar el código HTML del icono al portapapeles.</p>
            </div>

            <div class="ox-search-container" style="max-width: 380px; width: 100%;">
              <ox-input 
                placeholder="Buscar icono por nombre (ej: user, check, mail)..."
                [ngModel]="searchQuery()"
                (ngModelChange)="searchQuery.set($event)"
                icon="search">
              </ox-input>
            </div>
          </div>

          <!-- FILTRO DE CATEGORÍAS -->
          <div class="ox-cat-chips-bar">
            @for (cat of categories; track cat) {
              <button 
                type="button" 
                class="ox-category-pill"
                [class.ox-category-pill-active]="selectedCategory() === cat"
                (click)="selectedCategory.set(cat)">
                {{ cat }}
                <span class="ox-pill-count">{{ getCategoryCount(cat) }}</span>
              </button>
            }
          </div>

          <!-- GRILLA DE ICONOS -->
          <div class="ox-icons-grid">
            @for (key of filteredIcons(); track key) {
              <div 
                class="ox-icon-card"
                [class.ox-icon-card-copied]="copiedIconName() === key"
                (click)="copyIconCode(key)"
                [oxTooltip]="copiedIconName() === key ? '¡Copiado al portapapeles!' : 'Copiar <ox-icon name=&quot;' + key + '&quot;></ox-icon>'"
                tooltipPosition="top">
                <div class="ox-card-icon-slot">
                  <ox-icon [name]="key" size="lg"></ox-icon>
                </div>
                <span class="ox-card-icon-name">{{ key }}</span>
                <span class="ox-card-copy-hint">
                  {{ copiedIconName() === key ? '¡Copiado!' : 'Copiar' }}
                </span>
              </div>
            } @empty {
              <div class="ox-no-icons">
                <div class="ox-no-icons-icon" style="display: flex; justify-content: center; margin-bottom: 0.5rem;">
                  <ox-icon name="search" size="3xl" color="muted"></ox-icon>
                </div>
                <p>No se encontraron iconos que coincidan con "<strong>{{ searchQuery() }}</strong>"</p>
                <div style="margin-top: 1rem;">
                  <ox-button 
                    variant="outline-primary" 
                    icon="refresh-cw" 
                    (onClick)="searchQuery.set(''); selectedCategory.set('Todos')">
                    Ver todos los iconos
                  </ox-button>
                </div>
              </div>
            }
          </div>
        </div>
      </ox-card>

      <!-- API REFERENCE -->
      <app-doc-api-table
        title="API Reference: IconComponent (<ox-icon>)"
        [properties]="iconProps">
      </app-doc-api-table>
    </div>
  `,
  styles: [`
    .ox-page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding-bottom: 4rem;
    }
    .ox-header-hero {
      margin-bottom: 2rem;
    }
    .ox-badge-wrapper {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    .ox-badge-pill {
      background: color-mix(in srgb, var(--oxy-primary, #0066ff), transparent 88%);
      color: var(--oxy-primary, #0066ff);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 999px;
      text-transform: uppercase;
    }
    .ox-badge-ver {
      background: #f1f5f9;
      color: #64748b;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 999px;
    }
    .ox-page-title {
      font-size: 2.25rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 0.75rem 0;
    }
    .ox-page-subtitle {
      font-size: 1.0625rem;
      color: #475569;
      line-height: 1.6;
      margin: 0;
    }

    /* PLAYGROUND */
    .ox-playground-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .ox-playground-header h3 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 0.25rem 0;
    }
    .ox-playground-header p {
      font-size: 0.875rem;
      color: #64748b;
      margin: 0 0 1.25rem 0;
    }
    .ox-playground-body {
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: 2rem;
      align-items: center;
    }
    @media (max-width: 860px) {
      .ox-playground-body {
        grid-template-columns: 1fr;
      }
    }
    .ox-preview-stage {
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      border-radius: 10px;
      padding: 2.5rem 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      min-height: 220px;
    }
    .ox-preview-icon-wrapper {
      padding: 1rem;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ox-preview-label {
      background: #0f172a;
      color: #38bdf8;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      font-size: 0.75rem;
      text-align: center;
      max-width: 100%;
      overflow-x: auto;
    }
    .ox-controls-panel {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .ox-control-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .ox-control-group-row {
      display: flex;
      gap: 1rem;
    }
    .ox-control-label {
      font-size: 0.8125rem;
      font-weight: 600;
      color: #334155;
    }
    .ox-select {
      padding: 0.5rem 0.75rem;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 0.8125rem;
      background: #ffffff;
      outline: none;
    }
    .ox-btn-group {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
    .ox-option-btn {
      padding: 4px 10px;
      border: 1px solid #cbd5e1;
      background: #f8fafc;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      color: #475569;
      cursor: pointer;
      transition: all 0.15s;
    }
    .ox-option-btn:hover {
      background: #eef2ff;
      color: var(--oxy-primary, #0066ff);
    }
    .ox-option-active {
      background: var(--oxy-primary, #0066ff) !important;
      color: #ffffff !important;
      border-color: var(--oxy-primary, #0066ff) !important;
    }
    .ox-color-chips {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    .ox-color-chip {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid #ffffff;
      box-shadow: 0 0 0 1px #cbd5e1;
      cursor: pointer;
      transition: transform 0.15s;
    }
    .ox-color-chip:hover {
      transform: scale(1.15);
    }
    .ox-color-chip-active {
      box-shadow: 0 0 0 2px var(--oxy-primary, #0066ff);
      transform: scale(1.15);
    }
    .ox-range-input {
      width: 100%;
      cursor: pointer;
    }

    /* DEMO CARDS */
    .ox-size-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      min-width: 90px;
      color: var(--oxy-primary, #0066ff);
    }
    .ox-size-card span {
      font-size: 0.75rem;
      color: #64748b;
      font-weight: 600;
    }

    /* CATALOG */
    .ox-catalog-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 2rem;
      margin: 3rem 0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .ox-catalog-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }
    .ox-catalog-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 0.25rem 0;
    }
    .ox-catalog-desc {
      font-size: 0.875rem;
      color: #64748b;
      margin: 0;
    }
    .ox-search-container {
      position: relative;
      min-width: 320px;
      max-width: 480px;
      flex: 1;
    }
    .ox-search-svg {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      color: #94a3b8;
    }
    .ox-icon-search-input {
      width: 100%;
      padding: 0.625rem 2.25rem 0.625rem 2.25rem;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 0.875rem;
      outline: none;
    }
    .ox-icon-search-input:focus {
      border-color: var(--oxy-primary, #0066ff);
      box-shadow: 0 0 0 3px rgba(0,102,255,0.15);
    }
    .ox-clear-search {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #94a3b8;
      cursor: pointer;
    }
    .ox-cat-chips-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #f1f5f9;
    }
    .ox-category-pill {
      padding: 5px 12px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      background: #f8fafc;
      color: #475569;
      font-size: 0.8125rem;
      font-weight: 500;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s;
    }
    .ox-category-pill:hover {
      background: #eef2ff;
      color: var(--oxy-primary, #0066ff);
    }
    .ox-category-pill-active {
      background: var(--oxy-primary, #0066ff) !important;
      color: #ffffff !important;
      border-color: var(--oxy-primary, #0066ff) !important;
    }
    .ox-pill-count {
      background: rgba(0,0,0,0.08);
      padding: 1px 5px;
      border-radius: 999px;
      font-size: 0.6875rem;
      font-weight: 600;
    }
    .ox-category-pill-active .ox-pill-count {
      background: rgba(255,255,255,0.25);
      color: #ffffff;
    }

    /* ICONS GRID */
    .ox-icons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 0.75rem;
    }
    .ox-icon-card {
      background: #ffffff;
      border: 1px solid #f1f5f9;
      border-radius: 8px;
      padding: 1.25rem 0.5rem 0.75rem 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s ease-in-out;
      position: relative;
    }
    .ox-icon-card:hover {
      border-color: var(--oxy-primary, #0066ff);
      box-shadow: 0 4px 12px rgba(0,102,255,0.1);
      transform: translateY(-2px);
    }
    .ox-icon-card:hover .ox-card-copy-hint {
      opacity: 1;
    }
    .ox-icon-card-copied {
      background: #ecfdf5 !important;
      border-color: #10b981 !important;
    }
    .ox-card-icon-slot {
      color: #334155;
      margin-bottom: 0.75rem;
      transition: color 0.15s;
    }
    .ox-icon-card:hover .ox-card-icon-slot {
      color: var(--oxy-primary, #0066ff);
    }
    .ox-card-icon-name {
      font-size: 0.75rem;
      font-weight: 500;
      color: #64748b;
      text-align: center;
      word-break: break-word;
      padding: 0 4px;
    }
    .ox-card-copy-hint {
      font-size: 0.6875rem;
      font-weight: 600;
      color: var(--oxy-primary, #0066ff);
      opacity: 0;
      transition: opacity 0.15s;
      margin-top: 4px;
    }
    .ox-icon-card-copied .ox-card-copy-hint {
      opacity: 1;
      color: #059669;
    }
    .ox-no-icons {
      grid-column: 1 / -1;
      padding: 3rem 1rem;
      text-align: center;
      color: #64748b;
    }
    .ox-no-icons-icon {
      font-size: 2.5rem;
    }
    .ox-reset-filter-btn {
      margin-top: 0.5rem;
      padding: 6px 14px;
      background: var(--oxy-primary, #0066ff);
      color: #ffffff;
      border: none;
      border-radius: 6px;
      font-size: 0.8125rem;
      cursor: pointer;
    }

    /* FLOATING TOAST */
    .ox-toast-floating {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #0f172a;
      color: #ffffff;
      padding: 0.75rem 1.25rem;
      border-radius: 8px;
      font-size: 0.875rem;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);
      z-index: 9999;
    }
    .ox-toast-floating code {
      color: #38bdf8;
    }
  `]
})
export class IconDemoComponent {
  private toastService = inject(ToastService);

  selectedDemoIcon = signal<OxIconName>('heart');
  selectedVariant = signal<OxIconVariant>('outline');
  selectedSize = signal<OxIconSize>('xl');
  selectedColor = signal<OxIconColor>('danger');
  selectedStrokeWidth = signal<number>(2);
  selectedRotate = signal<number>(0);
  isSpinning = signal<boolean>(false);

  searchQuery = signal<string>('');
  selectedCategory = signal<string>('Todos');
  copiedIconName = signal<string | null>(null);

  variantOptions = [
    { label: 'Outline (Línea)', value: 'outline' },
    { label: 'Fill (Relleno)', value: 'fill' }
  ];

  sizeButtonOptions = [
    { label: 'xs', value: 'xs' },
    { label: 'sm', value: 'sm' },
    { label: 'md', value: 'md' },
    { label: 'lg', value: 'lg' },
    { label: 'xl', value: 'xl' },
    { label: '2xl', value: '2xl' },
    { label: '3xl', value: '3xl' }
  ];

  rotateOptions = [
    { label: '0° (Normal)', value: 0 },
    { label: '90°', value: 90 },
    { label: '180°', value: 180 },
    { label: '270°', value: 270 }
  ];

  colorOptions = [
    { id: 'primary', hex: '#0066ff' },
    { id: 'secondary', hex: '#64748b' },
    { id: 'success', hex: '#28a745' },
    { id: 'danger', hex: '#e74c3c' },
    { id: 'warning', hex: '#f1c40f' },
    { id: 'info', hex: '#3498db' },
    { id: 'dark', hex: '#0f172a' },
    { id: '#8b5cf6', hex: '#8b5cf6' },
    { id: '#ec4899', hex: '#ec4899' }
  ];

  sampleIcons: OxIconName[] = [
    'heart', 'star', 'bookmark', 'bell', 'user', 'settings', 
    'check-circle', 'alert-triangle', 'download', 'mail', 
    'camera', 'shopping-cart', 'loader', 'zap', 'bar-chart', 
    'terminal', 'git-branch', 'sparkles', 'wallet', 'plane',
    'github', 'discord', 'facebook', 'instagram', 'youtube', 'whatsapp'
  ];

  sampleIconOptions = [
    'heart', 'star', 'bookmark', 'bell', 'user', 'settings', 
    'check-circle', 'alert-triangle', 'download', 'mail', 
    'camera', 'shopping-cart', 'loader', 'zap', 'bar-chart', 
    'terminal', 'git-branch', 'sparkles', 'wallet', 'plane',
    'github', 'discord', 'facebook', 'instagram', 'youtube', 'whatsapp'
  ].map(name => ({ label: name, value: name, icon: name }));

  allIconKeys = Object.keys(OX_ICONS) as OxIconName[];

  categories = [
    'Todos',
    'UI & General',
    'UI & General (Fill)',
    'Marcas & Redes Sociales',
    'Marcas & Redes Sociales (Fill)',
    'Editor de Texto',
    'Acciones & Estados',
    'Acciones & Estados (Fill)',
    'Navegación & Flechas',
    'Comunicación',
    'Comunicación (Fill)',
    'Archivos & Documentos',
    'Archivos & Documentos (Fill)',
    'Dispositivos',
    'Dispositivos (Fill)',
    'Multimedia',
    'Multimedia (Fill)',
    'Comercio & Finanzas',
    'Comercio & Finanzas (Fill)',
    'Seguridad & Tiempo',
    'Seguridad & Tiempo (Fill)',
    'Gráficos & Analítica',
    'Desarrollo & Código',
    'Transporte & Viajes',
    'Clima & Elementos',
    'Clima & Elementos (Fill)'
  ];

  filteredIcons = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategory();

    return this.allIconKeys.filter(key => {
      const def = OX_ICONS[key];
      const matchCat = cat === 'Todos' || def.category === cat;
      if (!matchCat) return false;

      if (!q) return true;
      return key.toLowerCase().includes(q) || def.category.toLowerCase().includes(q);
    });
  });

  getCategoryCount(category: string): number {
    if (category === 'Todos') return this.allIconKeys.length;
    return this.allIconKeys.filter(k => OX_ICONS[k].category === category).length;
  }

  copyIconCode(name: OxIconName): void {
    const code = `<ox-icon name="${name}"></ox-icon>`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        this.copiedIconName.set(name);
        this.toastService.add({
          severity: 'success',
          summary: '¡Icono Copiado!',
          detail: code
        });
        setTimeout(() => {
          if (this.copiedIconName() === name) this.copiedIconName.set(null);
        }, 1500);
      });
    }
  }

  // Snippets
  sampleTs = `import { Component } from '@angular/core';
import { IconComponent, ButtonComponent } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [IconComponent, ButtonComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {}`;

  sizesHtml = `<ox-icon name="heart" size="xs"></ox-icon>
<ox-icon name="heart" size="sm"></ox-icon>
<ox-icon name="heart" size="md"></ox-icon>
<ox-icon name="heart" size="lg"></ox-icon>
<ox-icon name="heart" size="xl"></ox-icon>
<ox-icon name="heart" size="2xl"></ox-icon>
<ox-icon name="heart" size="3xl"></ox-icon>`;

  colorsHtml = `<ox-icon name="check-circle" size="lg" color="primary"></ox-icon>
<ox-icon name="check-circle" size="lg" color="success"></ox-icon>
<ox-icon name="alert-triangle" size="lg" color="warning"></ox-icon>
<ox-icon name="x-circle" size="lg" color="danger"></ox-icon>
<ox-icon name="info" size="lg" color="info"></ox-icon>
<ox-icon name="star" size="lg" color="#8b5cf6"></ox-icon>`;

  variantsHtml = `<!-- Mediante prop variant="outline" | "fill" -->
<ox-icon name="heart" variant="outline" color="danger"></ox-icon>
<ox-icon name="heart" variant="fill" color="danger"></ox-icon>

<!-- Mediante prop booleana [fill]="true" -->
<ox-icon name="bookmark" [fill]="true" color="primary"></ox-icon>

<!-- Directamente por nombre con sufijo -fill -->
<ox-icon name="star-fill" color="warning"></ox-icon>
<ox-icon name="bell-fill" color="#8b5cf6"></ox-icon>`;

  componentsHtml = `<ox-button variant="primary">
  <ox-icon name="download" size="sm"></ox-icon>
  Descargar Archivo
</ox-button>

<ox-button variant="danger">
  <ox-icon name="trash-2-fill" size="sm"></ox-icon>
  Eliminar
</ox-button>`;

  iconProps: ApiProperty[] = [
    { name: 'name', type: 'OxIconName', default: "'info'", description: 'Nombre del icono SVG en el catálogo (soporta nombres directos y variantes "-fill").' },
    { name: 'variant', type: "'outline' | 'fill'", default: "'outline'", description: 'Variante de visualización: contorno de línea ("outline") o relleno sólido ("fill").' },
    { name: 'fill', type: 'boolean', default: 'false', description: 'Atajo booleano para activar el modo de relleno sólido.' },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | number | string", default: "'md'", description: 'Tamaño del icono. xs=14px, sm=16px, md=20px, lg=24px, xl=32px, 2xl=40px, 3xl=48px o número en px.' },
    { name: 'color', type: "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'muted' | 'white' | 'inherit' | string", default: "'inherit'", description: 'Color semántico del tema o código hexadecimal/rgb.' },
    { name: 'strokeWidth', type: 'number', default: '2', description: 'Grosor de las líneas del trazo SVG (ej: 1.5, 2, 2.5).' },
    { name: 'spin', type: 'boolean', default: 'false', description: 'Activa la animación continua de giro de 360° para loaders y spinners.' },
    { name: 'rotate', type: 'number', default: '0', description: 'Ángulo de rotación en grados (0, 90, 180, 270).' }
  ];
}
