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
  VAL_ICONS, 
  ValIconName, 
  ValIconVariant,
  ValIconSize, 
  ValIconColor 
} from 'valence-ui';
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
    <div class="val-page-container">
      <val-toast></val-toast>

      <div class="val-header-hero">
        <div class="val-badge-wrapper" style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem;">
          <val-badge value="Componente UI" severity="primary" size="sm"></val-badge>
          <val-badge [value]="allIconKeys.length + '+ Iconos SVG'" severity="info" size="sm"></val-badge>
        </div>
        <h1 class="val-page-title">Icon (Iconos SVG Nativos)</h1>
        <p class="val-page-subtitle">
          Componente de iconos SVG vectoriales ultra ligero y de alto rendimiento. Totalmente personalizable con tamaños, colores temáticos, grosores de trazo, rotación y animación de giro (spin).
        </p>
      </div>

      <!-- PLAYGROUND INTERACTIVO -->
      <val-card class="val-mb-4">
        <div style="padding: 1.5rem;">
          <div class="val-playground-header">
            <h3 style="display: flex; align-items: center; gap: 8px; margin: 0 0 0.25rem 0;">
              <val-icon name="sliders" size="md" color="primary"></val-icon>
              Playground Interactivo
            </h3>
            <p style="color: #64748b; font-size: 0.875rem; margin: 0 0 1.5rem 0;">
              Prueba en vivo cómo cambia el icono con diferentes tamaños, colores, grosor y animación usando componentes nativos de Valence UI.
            </p>
          </div>

          <div class="val-playground-body">
            <div class="val-preview-stage">
              <div class="val-preview-icon-wrapper">
                <val-icon 
                  [name]="selectedDemoIcon()"
                  [size]="selectedSize()"
                  [color]="selectedColor()"
                  [strokeWidth]="selectedStrokeWidth()"
                  [variant]="selectedVariant()"
                  [spin]="isSpinning()"
                  [rotate]="selectedRotate()">
                </val-icon>
              </div>
              <div class="val-preview-label">
                <code>&lt;val-icon name="{{ selectedDemoIcon() }}" size="{{ selectedSize() }}" color="{{ selectedColor() }}" variant="{{ selectedVariant() }}" [strokeWidth]="{{ selectedStrokeWidth() }}" [spin]="{{ isSpinning() }}" [rotate]="{{ selectedRotate() }}"&gt;&lt;/val-icon&gt;</code>
              </div>
            </div>

            <!-- CONTROLES NATIVOS OXYGEN UI -->
            <div class="val-controls-panel">
              <!-- Icono Seleccionado -->
              <div class="val-control-group">
                <label class="val-control-label">Icono de Muestra</label>
                <val-dropdown 
                  [options]="sampleIconOptions" 
                  [ngModel]="selectedDemoIcon()" 
                  (ngModelChange)="selectedDemoIcon.set($event)"
                  optionLabel="label"
                  optionValue="value"
                  [filter]="true">
                </val-dropdown>
              </div>

              <!-- Estilo / Variante -->
              <div class="val-control-group">
                <label class="val-control-label">Variante de Estilo: <strong>{{ selectedVariant() }}</strong></label>
                <val-select-button 
                  [options]="variantOptions" 
                  [ngModel]="selectedVariant()" 
                  (ngModelChange)="selectedVariant.set($event)">
                </val-select-button>
              </div>

              <!-- Tamaño -->
              <div class="val-control-group">
                <label class="val-control-label">Tamaño (size): <strong>{{ selectedSize() }}</strong></label>
                <val-select-button 
                  [options]="sizeButtonOptions" 
                  [ngModel]="selectedSize()" 
                  (ngModelChange)="selectedSize.set($event)">
                </val-select-button>
              </div>

              <!-- Color -->
              <div class="val-control-group">
                <label class="val-control-label">Color (color): <strong>{{ selectedColor() }}</strong></label>
                <div class="val-color-chips">
                  @for (c of colorOptions; track c.id) {
                    <button 
                      type="button" 
                      class="val-color-chip" 
                      [style.background]="c.hex"
                      [class.val-color-chip-active]="selectedColor() === c.id"
                      (click)="selectedColor.set(c.id)"
                      [title]="c.id">
                    </button>
                  }
                </div>
              </div>

              <!-- Grosor de Trazo -->
              <div class="val-control-group">
                <label class="val-control-label">Grosor de Trazo (strokeWidth): <strong>{{ selectedStrokeWidth() }}px</strong></label>
                <div style="padding: 0.5rem 0;">
                  <val-slider 
                    [ngModel]="selectedStrokeWidth()" 
                    (ngModelChange)="selectedStrokeWidth.set($event)"
                    [min]="1" 
                    [max]="3.5" 
                    [step]="0.5">
                  </val-slider>
                </div>
              </div>

              <!-- Rotación & Spin -->
              <div class="val-control-group-row" style="display: flex; gap: 1rem; align-items: flex-end;">
                <div class="val-control-group" style="flex: 1">
                  <label class="val-control-label">Rotación</label>
                  <val-dropdown 
                    [options]="rotateOptions" 
                    [ngModel]="selectedRotate()" 
                    (ngModelChange)="selectedRotate.set(+$event)">
                  </val-dropdown>
                </div>

                <div class="val-control-group" style="flex: 1">
                  <label class="val-control-label">Animación</label>
                  <val-toggle-button 
                    [ngModel]="isSpinning()" 
                    (ngModelChange)="isSpinning.set($event)"
                    onLabel="Giro Activo" 
                    offLabel="Sin Giro"
                    onIcon="rotate-cw"
                    offIcon="rotate-cw">
                  </val-toggle-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </val-card>

      <!-- DEMO 1: TAMAÑOS -->
      <app-doc-code
        title="1. Escala de Tamaños"
        description="Opciones estándar: xs (14px), sm (16px), md (20px), lg (24px), xl (32px), 2xl (40px), 3xl (48px) o valores numéricos en píxeles."
        [html]="sizesHtml"
        [ts]="sampleTs">
        <div class="val-flex val-align-items-center val-gap-3 val-flex-wrap">
          <div class="val-size-card"><val-icon name="heart" size="xs"></val-icon><span>xs (14px)</span></div>
          <div class="val-size-card"><val-icon name="heart" size="sm"></val-icon><span>sm (16px)</span></div>
          <div class="val-size-card"><val-icon name="heart" size="md"></val-icon><span>md (20px)</span></div>
          <div class="val-size-card"><val-icon name="heart" size="lg"></val-icon><span>lg (24px)</span></div>
          <div class="val-size-card"><val-icon name="heart" size="xl"></val-icon><span>xl (32px)</span></div>
          <div class="val-size-card"><val-icon name="heart" size="2xl"></val-icon><span>2xl (40px)</span></div>
          <div class="val-size-card"><val-icon name="heart" size="3xl"></val-icon><span>3xl (48px)</span></div>
        </div>
      </app-doc-code>

      <!-- DEMO 2: COLORES SEMÁNTICOS -->
      <app-doc-code
        title="2. Colores Semánticos & Herencia"
        description="Conectados automáticamente a la paleta de Valence UI o colores hexadecimales directos."
        [html]="colorsHtml"
        [ts]="sampleTs">
        <div class="val-flex val-align-items-center val-gap-4 val-flex-wrap">
          <div class="val-flex val-align-items-center val-gap-2"><val-icon name="check-circle" size="lg" color="primary"></val-icon><span>Primary</span></div>
          <div class="val-flex val-align-items-center val-gap-2"><val-icon name="check-circle" size="lg" color="success"></val-icon><span>Success</span></div>
          <div class="val-flex val-align-items-center val-gap-2"><val-icon name="alert-triangle" size="lg" color="warning"></val-icon><span>Warning</span></div>
          <div class="val-flex val-align-items-center val-gap-2"><val-icon name="x-circle" size="lg" color="danger"></val-icon><span>Danger</span></div>
          <div class="val-flex val-align-items-center val-gap-2"><val-icon name="info" size="lg" color="info"></val-icon><span>Info</span></div>
          <div class="val-flex val-align-items-center val-gap-2"><val-icon name="settings" size="lg" color="secondary"></val-icon><span>Secondary</span></div>
          <div class="val-flex val-align-items-center val-gap-2"><val-icon name="star" size="lg" color="#8b5cf6"></val-icon><span>#8b5cf6</span></div>
        </div>
      </app-doc-code>

      <!-- DEMO 3: VARIANTES OUTLINE VS FILL -->
      <app-doc-code
        title="3. Variantes de Estilo: Outline vs Fill"
        description="Cada icono puede usarse en su versión de contorno (outline) o de relleno sólido (fill) mediante la prop variant='fill' o [fill]='true'."
        [html]="variantsHtml"
        [ts]="sampleTs">
        <div class="val-flex val-align-items-center val-gap-4 val-flex-wrap">
          <div class="val-flex val-flex-column val-align-items-center val-gap-2" style="background: #f8fafc; padding: 12px 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div class="val-flex val-gap-3"><val-icon name="heart" size="xl" color="danger"></val-icon><val-icon name="heart" variant="fill" size="xl" color="danger"></val-icon></div>
            <span style="font-size: 0.75rem; color: #64748b;">heart (outline / fill)</span>
          </div>

          <div class="val-flex val-flex-column val-align-items-center val-gap-2" style="background: #f8fafc; padding: 12px 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div class="val-flex val-gap-3"><val-icon name="star" size="xl" color="warning"></val-icon><val-icon name="star-fill" size="xl" color="warning"></val-icon></div>
            <span style="font-size: 0.75rem; color: #64748b;">star (outline / fill)</span>
          </div>

          <div class="val-flex val-flex-column val-align-items-center val-gap-2" style="background: #f8fafc; padding: 12px 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div class="val-flex val-gap-3"><val-icon name="bookmark" size="xl" color="primary"></val-icon><val-icon name="bookmark" [fill]="true" size="xl" color="primary"></val-icon></div>
            <span style="font-size: 0.75rem; color: #64748b;">bookmark (outline / fill)</span>
          </div>

          <div class="val-flex val-flex-column val-align-items-center val-gap-2" style="background: #f8fafc; padding: 12px 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div class="val-flex val-gap-3"><val-icon name="bell" size="xl" color="#8b5cf6"></val-icon><val-icon name="bell-fill" size="xl" color="#8b5cf6"></val-icon></div>
            <span style="font-size: 0.75rem; color: #64748b;">bell (outline / fill)</span>
          </div>

          <div class="val-flex val-flex-column val-align-items-center val-gap-2" style="background: #f8fafc; padding: 12px 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div class="val-flex val-gap-3"><val-icon name="folder" size="xl" color="warning"></val-icon><val-icon name="folder-fill" size="xl" color="warning"></val-icon></div>
            <span style="font-size: 0.75rem; color: #64748b;">folder (outline / fill)</span>
          </div>

          <div class="val-flex val-flex-column val-align-items-center val-gap-2" style="background: #f8fafc; padding: 12px 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div class="val-flex val-gap-3"><val-icon name="shield" size="xl" color="success"></val-icon><val-icon name="shield-fill" size="xl" color="success"></val-icon></div>
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
        <div class="val-flex val-align-items-center val-gap-3 val-flex-wrap">
          <val-button variant="primary" icon="download">Descargar Archivo</val-button>
          <val-button variant="outline-primary" icon="share-2">Compartir</val-button>
          <val-button variant="danger" icon="trash-2-fill">Eliminar</val-button>
          <val-button variant="secondary" icon="loader">Cargando...</val-button>
        </div>
      </app-doc-code>

      <!-- CATÁLOGO COMPLETO DE ICONOS CON BUSCADOR -->
      <val-card class="val-catalog-card">
        <div style="padding: 1.5rem;">
          <div class="val-catalog-header">
            <div>
              <h2 class="val-catalog-title" style="display: flex; align-items: center; gap: 8px;">
                <val-icon name="grid" size="md" color="primary"></val-icon>
                Catálogo Completo ({{ allIconKeys.length }} Iconos)
              </h2>
              <p class="val-catalog-desc">Haz clic en cualquier tarjeta para copiar el código HTML del icono al portapapeles.</p>
            </div>

            <div class="val-search-container" style="max-width: 380px; width: 100%;">
              <val-input 
                placeholder="Buscar icono por nombre (ej: user, check, mail)..."
                [ngModel]="searchQuery()"
                (ngModelChange)="searchQuery.set($event)"
                icon="search">
              </val-input>
            </div>
          </div>

          <!-- FILTRO DE CATEGORÍAS -->
          <div class="val-cat-chips-bar">
            @for (cat of categories; track cat) {
              <button 
                type="button" 
                class="val-category-pill"
                [class.val-category-pill-active]="selectedCategory() === cat"
                (click)="selectedCategory.set(cat)">
                {{ cat }}
                <span class="val-pill-count">{{ getCategoryCount(cat) }}</span>
              </button>
            }
          </div>

          <!-- GRILLA DE ICONOS -->
          <div class="val-icons-grid">
            @for (key of filteredIcons(); track key) {
              <div 
                class="val-icon-card"
                [class.val-icon-card-copied]="copiedIconName() === key"
                (click)="copyIconCode(key)"
                [valTooltip]="copiedIconName() === key ? '¡Copiado al portapapeles!' : 'Copiar <val-icon name=&quot;' + key + '&quot;></val-icon>'"
                tooltipPosition="top">
                <div class="val-card-icon-slot">
                  <val-icon [name]="key" size="lg"></val-icon>
                </div>
                <span class="val-card-icon-name">{{ key }}</span>
                <span class="val-card-copy-hint">
                  {{ copiedIconName() === key ? '¡Copiado!' : 'Copiar' }}
                </span>
              </div>
            } @empty {
              <div class="val-no-icons">
                <div class="val-no-icons-icon" style="display: flex; justify-content: center; margin-bottom: 0.5rem;">
                  <val-icon name="search" size="3xl" color="muted"></val-icon>
                </div>
                <p>No se encontraron iconos que coincidan con "<strong>{{ searchQuery() }}</strong>"</p>
                <div style="margin-top: 1rem;">
                  <val-button 
                    variant="outline-primary" 
                    icon="refresh-cw" 
                    (onClick)="searchQuery.set(''); selectedCategory.set('Todos')">
                    Ver todos los iconos
                  </val-button>
                </div>
              </div>
            }
          </div>
        </div>
      </val-card>

      <!-- API REFERENCE -->
      <app-doc-api-table
        title="API Reference: IconComponent (<val-icon>)"
        [properties]="iconProps">
      </app-doc-api-table>
    </div>
  `,
  styles: [`
    .val-page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding-bottom: 4rem;
    }
    .val-header-hero {
      margin-bottom: 2rem;
    }
    .val-badge-wrapper {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    .val-badge-pill {
      background: color-mix(in srgb, var(--val-primary, #0066ff), transparent 88%);
      color: var(--val-primary, #0066ff);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 999px;
      text-transform: uppercase;
    }
    .val-badge-ver {
      background: #f1f5f9;
      color: #64748b;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 999px;
    }
    .val-page-title {
      font-size: 2.25rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 0.75rem 0;
    }
    .val-page-subtitle {
      font-size: 1.0625rem;
      color: #475569;
      line-height: 1.6;
      margin: 0;
    }

    /* PLAYGROUND */
    .val-playground-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .val-playground-header h3 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 0.25rem 0;
    }
    .val-playground-header p {
      font-size: 0.875rem;
      color: #64748b;
      margin: 0 0 1.25rem 0;
    }
    .val-playground-body {
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: 2rem;
      align-items: center;
    }
    @media (max-width: 860px) {
      .val-playground-body {
        grid-template-columns: 1fr;
      }
    }
    .val-preview-stage {
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
    .val-preview-icon-wrapper {
      padding: 1rem;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .val-preview-label {
      background: #0f172a;
      color: #38bdf8;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      font-size: 0.75rem;
      text-align: center;
      max-width: 100%;
      overflow-x: auto;
    }
    .val-controls-panel {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .val-control-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .val-control-group-row {
      display: flex;
      gap: 1rem;
    }
    .val-control-label {
      font-size: 0.8125rem;
      font-weight: 600;
      color: #334155;
    }
    .val-select {
      padding: 0.5rem 0.75rem;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 0.8125rem;
      background: #ffffff;
      outline: none;
    }
    .val-btn-group {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
    .val-option-btn {
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
    .val-option-btn:hover {
      background: #eef2ff;
      color: var(--val-primary, #0066ff);
    }
    .val-option-active {
      background: var(--val-primary, #0066ff) !important;
      color: #ffffff !important;
      border-color: var(--val-primary, #0066ff) !important;
    }
    .val-color-chips {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    .val-color-chip {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid #ffffff;
      box-shadow: 0 0 0 1px #cbd5e1;
      cursor: pointer;
      transition: transform 0.15s;
    }
    .val-color-chip:hover {
      transform: scale(1.15);
    }
    .val-color-chip-active {
      box-shadow: 0 0 0 2px var(--val-primary, #0066ff);
      transform: scale(1.15);
    }
    .val-range-input {
      width: 100%;
      cursor: pointer;
    }

    /* DEMO CARDS */
    .val-size-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      min-width: 90px;
      color: var(--val-primary, #0066ff);
    }
    .val-size-card span {
      font-size: 0.75rem;
      color: #64748b;
      font-weight: 600;
    }

    /* CATALOG */
    .val-catalog-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 2rem;
      margin: 3rem 0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .val-catalog-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }
    .val-catalog-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 0.25rem 0;
    }
    .val-catalog-desc {
      font-size: 0.875rem;
      color: #64748b;
      margin: 0;
    }
    .val-search-container {
      position: relative;
      min-width: 320px;
      max-width: 480px;
      flex: 1;
    }
    .val-search-svg {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      color: #94a3b8;
    }
    .val-icon-search-input {
      width: 100%;
      padding: 0.625rem 2.25rem 0.625rem 2.25rem;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 0.875rem;
      outline: none;
    }
    .val-icon-search-input:focus {
      border-color: var(--val-primary, #0066ff);
      box-shadow: 0 0 0 3px rgba(0,102,255,0.15);
    }
    .val-clear-search {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #94a3b8;
      cursor: pointer;
    }
    .val-cat-chips-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #f1f5f9;
    }
    .val-category-pill {
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
    .val-category-pill:hover {
      background: #eef2ff;
      color: var(--val-primary, #0066ff);
    }
    .val-category-pill-active {
      background: var(--val-primary, #0066ff) !important;
      color: #ffffff !important;
      border-color: var(--val-primary, #0066ff) !important;
    }
    .val-pill-count {
      background: rgba(0,0,0,0.08);
      padding: 1px 5px;
      border-radius: 999px;
      font-size: 0.6875rem;
      font-weight: 600;
    }
    .val-category-pill-active .val-pill-count {
      background: rgba(255,255,255,0.25);
      color: #ffffff;
    }

    /* ICONS GRID */
    .val-icons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 0.75rem;
    }
    .val-icon-card {
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
    .val-icon-card:hover {
      border-color: var(--val-primary, #0066ff);
      box-shadow: 0 4px 12px rgba(0,102,255,0.1);
      transform: translateY(-2px);
    }
    .val-icon-card:hover .val-card-copy-hint {
      opacity: 1;
    }
    .val-icon-card-copied {
      background: #ecfdf5 !important;
      border-color: #10b981 !important;
    }
    .val-card-icon-slot {
      color: #334155;
      margin-bottom: 0.75rem;
      transition: color 0.15s;
    }
    .val-icon-card:hover .val-card-icon-slot {
      color: var(--val-primary, #0066ff);
    }
    .val-card-icon-name {
      font-size: 0.75rem;
      font-weight: 500;
      color: #64748b;
      text-align: center;
      word-break: break-word;
      padding: 0 4px;
    }
    .val-card-copy-hint {
      font-size: 0.6875rem;
      font-weight: 600;
      color: var(--val-primary, #0066ff);
      opacity: 0;
      transition: opacity 0.15s;
      margin-top: 4px;
    }
    .val-icon-card-copied .val-card-copy-hint {
      opacity: 1;
      color: #059669;
    }
    .val-no-icons {
      grid-column: 1 / -1;
      padding: 3rem 1rem;
      text-align: center;
      color: #64748b;
    }
    .val-no-icons-icon {
      font-size: 2.5rem;
    }
    .val-reset-filter-btn {
      margin-top: 0.5rem;
      padding: 6px 14px;
      background: var(--val-primary, #0066ff);
      color: #ffffff;
      border: none;
      border-radius: 6px;
      font-size: 0.8125rem;
      cursor: pointer;
    }

    /* FLOATING TOAST */
    .val-toast-floating {
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
    .val-toast-floating code {
      color: #38bdf8;
    }
  `]
})
export class IconDemoComponent {
  private toastService = inject(ToastService);

  selectedDemoIcon = signal<ValIconName>('heart');
  selectedVariant = signal<ValIconVariant>('outline');
  selectedSize = signal<ValIconSize>('xl');
  selectedColor = signal<ValIconColor>('danger');
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

  sampleIcons: ValIconName[] = [
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

  allIconKeys = Object.keys(VAL_ICONS) as ValIconName[];

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
      const def = VAL_ICONS[key];
      const matchCat = cat === 'Todos' || def.category === cat;
      if (!matchCat) return false;

      if (!q) return true;
      return key.toLowerCase().includes(q) || def.category.toLowerCase().includes(q);
    });
  });

  getCategoryCount(category: string): number {
    if (category === 'Todos') return this.allIconKeys.length;
    return this.allIconKeys.filter(k => VAL_ICONS[k].category === category).length;
  }

  copyIconCode(name: ValIconName): void {
    const code = `<val-icon name="${name}"></val-icon>`;
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
import { IconComponent, ButtonComponent } from 'valence-ui';

@Component({
  standalone: true,
  imports: [IconComponent, ButtonComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {}`;

  sizesHtml = `<val-icon name="heart" size="xs"></val-icon>
<val-icon name="heart" size="sm"></val-icon>
<val-icon name="heart" size="md"></val-icon>
<val-icon name="heart" size="lg"></val-icon>
<val-icon name="heart" size="xl"></val-icon>
<val-icon name="heart" size="2xl"></val-icon>
<val-icon name="heart" size="3xl"></val-icon>`;

  colorsHtml = `<val-icon name="check-circle" size="lg" color="primary"></val-icon>
<val-icon name="check-circle" size="lg" color="success"></val-icon>
<val-icon name="alert-triangle" size="lg" color="warning"></val-icon>
<val-icon name="x-circle" size="lg" color="danger"></val-icon>
<val-icon name="info" size="lg" color="info"></val-icon>
<val-icon name="star" size="lg" color="#8b5cf6"></val-icon>`;

  variantsHtml = `<!-- Mediante prop variant="outline" | "fill" -->
<val-icon name="heart" variant="outline" color="danger"></val-icon>
<val-icon name="heart" variant="fill" color="danger"></val-icon>

<!-- Mediante prop booleana [fill]="true" -->
<val-icon name="bookmark" [fill]="true" color="primary"></val-icon>

<!-- Directamente por nombre con sufijo -fill -->
<val-icon name="star-fill" color="warning"></val-icon>
<val-icon name="bell-fill" color="#8b5cf6"></val-icon>`;

  componentsHtml = `<val-button variant="primary">
  <val-icon name="download" size="sm"></val-icon>
  Descargar Archivo
</val-button>

<val-button variant="danger">
  <val-icon name="trash-2-fill" size="sm"></val-icon>
  Eliminar
</val-button>`;

  iconProps: ApiProperty[] = [
    { name: 'name', type: 'ValIconName', default: "'info'", description: 'Nombre del icono SVG en el catálogo (soporta nombres directos y variantes "-fill").' },
    { name: 'variant', type: "'outline' | 'fill'", default: "'outline'", description: 'Variante de visualización: contorno de línea ("outline") o relleno sólido ("fill").' },
    { name: 'fill', type: 'boolean', default: 'false', description: 'Atajo booleano para activar el modo de relleno sólido.' },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | number | string", default: "'md'", description: 'Tamaño del icono. xs=14px, sm=16px, md=20px, lg=24px, xl=32px, 2xl=40px, 3xl=48px o número en px.' },
    { name: 'color', type: "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'muted' | 'white' | 'inherit' | string", default: "'inherit'", description: 'Color semántico del tema o código hexadecimal/rgb.' },
    { name: 'strokeWidth', type: 'number', default: '2', description: 'Grosor de las líneas del trazo SVG (ej: 1.5, 2, 2.5).' },
    { name: 'spin', type: 'boolean', default: 'false', description: 'Activa la animación continua de giro de 360° para loaders y spinners.' },
    { name: 'rotate', type: 'number', default: '0', description: 'Ángulo de rotación en grados (0, 90, 180, 270).' }
  ];
}
