import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  ButtonComponent, 
  CardComponent, 
  BadgeComponent, 
  TagComponent,
  AlertComponent, 
  IconComponent,
  InputSwitchComponent,
  DropdownComponent,
  FormFieldComponent,
  FormFieldPrefixDirective
} from 'valence-ui';

export interface ThemePreset {
  name: string;
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  borderRadius: string;
  fontFamily: string;
}

@Component({
  selector: 'app-theme-builder-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    CardComponent,
    BadgeComponent,
    TagComponent,
    AlertComponent,
    IconComponent,
    InputSwitchComponent,
    DropdownComponent,
    FormFieldComponent,
    FormFieldPrefixDirective
  ],
  template: `
    <div class="theme-builder-container">
      <!-- HEADER -->
      <div class="val-flex val-items-center val-justify-between val-flex-wrap val-gap-4 val-mb-6">
        <div>
          <h1 class="val-text-3xl val-font-bold val-text-slate-900 dark:val-text-white val-mb-2">Theme Builder & Generador de Tokens</h1>
          <p class="val-text-slate-600 dark:val-text-slate-400">
            Personaliza en tiempo real la paleta de colores, radios de borde y tipografía de Valence UI. Previsualiza los cambios al instante y exporta el código en CSS, SCSS o JSON.
          </p>
        </div>
        <div class="val-flex val-gap-2">
          <val-button label="Restablecer" variant="outline-secondary" icon="refresh-cw" (onClick)="resetDefaults()"></val-button>
        </div>
      </div>

      <!-- MAIN WORKSPACE -->
      <div class="val-grid val-grid-cols-1 lg:val-grid-cols-12 val-gap-6">
        
        <!-- CONTROLS PANEL (LEFT 5 COLS) -->
        <div class="lg:val-col-span-5 val-space-y-6">
          
          <!-- PRESETS -->
          <val-card>
            <h3 class="val-text-sm val-font-bold val-uppercase val-tracking-wider val-text-slate-500 val-mb-3 val-flex val-items-center val-gap-2">
              <val-icon name="palette" size="1rem"></val-icon> Presets Rápidos
            </h3>
            <div class="val-grid val-grid-cols-2 sm:val-grid-cols-3 val-gap-2">
              @for (preset of presets; track preset.name) {
                <button 
                  type="button" 
                  class="preset-chip val-flex val-items-center val-gap-2 val-p-2 val-rounded-lg val-border val-border-slate-200 dark:val-border-slate-700 val-text-xs val-font-medium hover:val-border-blue-500 val-transition-all"
                  [class.active]="selectedPreset() === preset.name"
                  (click)="applyPreset(preset)">
                  <span class="val-w-4 val-h-4 val-rounded-full val-flex-shrink-0" [style.background-color]="preset.primary"></span>
                  <span class="val-truncate">{{ preset.name }}</span>
                </button>
              }
            </div>
          </val-card>

          <!-- COLORS CUSTOMIZER -->
          <val-card>
            <h3 class="val-text-sm val-font-bold val-uppercase val-tracking-wider val-text-slate-500 val-mb-4 val-flex val-items-center val-gap-2">
              <val-icon name="sliders" size="1rem"></val-icon> Paleta de Colores
            </h3>

            <div class="val-space-y-3">
              <!-- Primary -->
              <div class="color-picker-row val-flex val-items-center val-justify-between">
                <label class="val-text-sm val-font-medium val-text-slate-700 dark:val-text-slate-300">Color Primario</label>
                <div class="val-flex val-items-center val-gap-2">
                  <input type="color" [(ngModel)]="primaryColor" (ngModelChange)="onColorChange()" class="val-w-8 val-h-8 val-rounded val-cursor-pointer val-border-0" />
                  <input type="text" [(ngModel)]="primaryColor" (ngModelChange)="onColorChange()" class="val-w-24 val-p-1 val-text-xs val-border val-border-slate-300 dark:val-border-slate-700 val-rounded dark:val-bg-slate-800" />
                </div>
              </div>

              <!-- Secondary -->
              <div class="color-picker-row val-flex val-items-center val-justify-between">
                <label class="val-text-sm val-font-medium val-text-slate-700 dark:val-text-slate-300">Color Secundario</label>
                <div class="val-flex val-items-center val-gap-2">
                  <input type="color" [(ngModel)]="secondaryColor" (ngModelChange)="onColorChange()" class="val-w-8 val-h-8 val-rounded val-cursor-pointer val-border-0" />
                  <input type="text" [(ngModel)]="secondaryColor" (ngModelChange)="onColorChange()" class="val-w-24 val-p-1 val-text-xs val-border val-border-slate-300 dark:val-border-slate-700 val-rounded dark:val-bg-slate-800" />
                </div>
              </div>

              <!-- Success -->
              <div class="color-picker-row val-flex val-items-center val-justify-between">
                <label class="val-text-sm val-font-medium val-text-slate-700 dark:val-text-slate-300">Éxito (Success)</label>
                <div class="val-flex val-items-center val-gap-2">
                  <input type="color" [(ngModel)]="successColor" (ngModelChange)="onColorChange()" class="val-w-8 val-h-8 val-rounded val-cursor-pointer val-border-0" />
                  <input type="text" [(ngModel)]="successColor" (ngModelChange)="onColorChange()" class="val-w-24 val-p-1 val-text-xs val-border val-border-slate-300 dark:val-border-slate-700 val-rounded dark:val-bg-slate-800" />
                </div>
              </div>

              <!-- Warning -->
              <div class="color-picker-row val-flex val-items-center val-justify-between">
                <label class="val-text-sm val-font-medium val-text-slate-700 dark:val-text-slate-300">Advertencia (Warning)</label>
                <div class="val-flex val-items-center val-gap-2">
                  <input type="color" [(ngModel)]="warningColor" (ngModelChange)="onColorChange()" class="val-w-8 val-h-8 val-rounded val-cursor-pointer val-border-0" />
                  <input type="text" [(ngModel)]="warningColor" (ngModelChange)="onColorChange()" class="val-w-24 val-p-1 val-text-xs val-border val-border-slate-300 dark:val-border-slate-700 val-rounded dark:val-bg-slate-800" />
                </div>
              </div>

              <!-- Danger -->
              <div class="color-picker-row val-flex val-items-center val-justify-between">
                <label class="val-text-sm val-font-medium val-text-slate-700 dark:val-text-slate-300">Peligro (Danger)</label>
                <div class="val-flex val-items-center val-gap-2">
                  <input type="color" [(ngModel)]="dangerColor" (ngModelChange)="onColorChange()" class="val-w-8 val-h-8 val-rounded val-cursor-pointer val-border-0" />
                  <input type="text" [(ngModel)]="dangerColor" (ngModelChange)="onColorChange()" class="val-w-24 val-p-1 val-text-xs val-border val-border-slate-300 dark:val-border-slate-700 val-rounded dark:val-bg-slate-800" />
                </div>
              </div>

              <!-- Info -->
              <div class="color-picker-row val-flex val-items-center val-justify-between">
                <label class="val-text-sm val-font-medium val-text-slate-700 dark:val-text-slate-300">Información (Info)</label>
                <div class="val-flex val-items-center val-gap-2">
                  <input type="color" [(ngModel)]="infoColor" (ngModelChange)="onColorChange()" class="val-w-8 val-h-8 val-rounded val-cursor-pointer val-border-0" />
                  <input type="text" [(ngModel)]="infoColor" (ngModelChange)="onColorChange()" class="val-w-24 val-p-1 val-text-xs val-border val-border-slate-300 dark:val-border-slate-700 val-rounded dark:val-bg-slate-800" />
                </div>
              </div>
            </div>
          </val-card>

          <!-- GEOMETRY & TYPOGRAPHY -->
          <val-card>
            <h3 class="val-text-sm val-font-bold val-uppercase val-tracking-wider val-text-slate-500 val-mb-4 val-flex val-items-center val-gap-2">
              <val-icon name="type" size="1rem"></val-icon> Geometría & Tipografía
            </h3>

            <div class="val-space-y-4">
              <!-- Border Radius -->
              <div>
                <div class="val-flex val-justify-between val-text-sm val-mb-2">
                  <span class="val-font-medium val-text-slate-700 dark:val-text-slate-300">Radio de Bordes (Border Radius)</span>
                  <span class="val-text-xs val-text-slate-500">{{ borderRadius }}px</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="24" 
                  step="2" 
                  [(ngModel)]="borderRadius" 
                  (ngModelChange)="onGeometryChange()" 
                  class="val-w-full val-cursor-pointer" />
                <div class="val-flex val-justify-between val-text-[10px] val-text-slate-400 val-mt-1">
                  <span>Recto (0px)</span>
                  <span>Estándar (6px)</span>
                  <span>Suave (12px)</span>
                  <span>Píldora (24px)</span>
                </div>
              </div>

              <!-- Font Family -->
              <div>
                <label class="val-text-sm val-font-medium val-text-slate-700 dark:val-text-slate-300 val-block val-mb-1">Familia Tipográfica</label>
                <select [(ngModel)]="fontFamily" (ngModelChange)="onGeometryChange()" class="val-w-full val-p-2 val-border val-border-slate-300 dark:val-border-slate-700 val-rounded-lg dark:val-bg-slate-800 val-text-sm">
                  <option value="'Manrope', sans-serif">Manrope (Modern & Crisp)</option>
                  <option value="'Inter', sans-serif">Inter (Clean Enterprise)</option>
                  <option value="'Outfit', sans-serif">Outfit (Geometric & Bold)</option>
                  <option value="'Roboto', sans-serif">Roboto (Material Standard)</option>
                  <option value="'Fira Code', monospace">Fira Code (Tech / Code)</option>
                </select>
              </div>
            </div>
          </val-card>
        </div>

        <!-- LIVE PREVIEW & EXPORT (RIGHT 7 COLS) -->
        <div class="lg:val-col-span-7 val-space-y-6">
          
          <!-- LIVE PREVIEW CANVAS -->
          <div class="theme-preview-box val-p-6 val-rounded-2xl val-border val-border-slate-200 dark:val-border-slate-800 val-bg-slate-50/50 dark:val-bg-slate-900/50" [style]="previewStyles()">
            <div class="val-flex val-items-center val-justify-between val-mb-4">
              <span class="val-text-xs val-font-bold val-uppercase val-tracking-wider val-text-slate-500 val-flex val-items-center val-gap-1.5">
                <span class="val-w-2 val-h-2 val-rounded-full val-bg-emerald-500 val-animate-pulse"></span>
                Previsualización en Vivo de Componentes
              </span>
              <span class="val-text-xs val-text-slate-400">Tokens aplicados en tiempo real</span>
            </div>

            <!-- PREVIEW COMPONENTS -->
            <div class="val-space-y-6">
              
              <!-- Buttons & Actions -->
              <div>
                <div class="val-text-xs val-font-semibold val-text-slate-500 val-mb-2">Botones & Acciones</div>
                <div class="val-flex val-flex-wrap val-gap-3">
                  <val-button label="Primario" variant="primary" icon="check"></val-button>
                  <val-button label="Secundario" variant="outline-secondary"></val-button>
                  <val-button label="Éxito" variant="success" icon="thumbs-up"></val-button>
                  <val-button label="Peligro" variant="danger" icon="trash-2"></val-button>
                  <val-button label="Deshabilitado" [disabled]="true"></val-button>
                </div>
              </div>

              <!-- Badges & Tags -->
              <div>
                <div class="val-text-xs val-font-semibold val-text-slate-500 val-mb-2">Badges & Tags</div>
                <div class="val-flex val-flex-wrap val-gap-2">
                  <val-badge value="Primary Live" severity="primary"></val-badge>
                  <val-badge value="Approved" severity="success"></val-badge>
                  <val-badge value="Attention" severity="warning"></val-badge>
                  <val-badge value="Critical" severity="danger"></val-badge>
                  <val-badge value="Info Note" severity="info"></val-badge>
                </div>
              </div>

              <!-- Form Controls -->
              <div>
                <div class="val-text-xs val-font-semibold val-text-slate-500 val-mb-2">Campos de Entrada (FormField)</div>
                <div class="val-grid val-grid-cols-1 sm:val-grid-cols-2 val-gap-4">
                  <val-form-field label="Nombre de Usuario">
                    <val-icon valPrefix name="user"></val-icon>
                    <input class="val-input-native" placeholder="Ingresa tu usuario..." />
                  </val-form-field>

                  <val-form-field label="Correo Electrónico" hint="Enviaremos un enlace de confirmación">
                    <val-icon valPrefix name="mail"></val-icon>
                    <input class="val-input-native" type="email" placeholder="usuario@valence.dev" />
                  </val-form-field>
                </div>
              </div>

              <!-- Tags & Interactive Switches -->
              <div class="val-flex val-items-center val-justify-between val-flex-wrap val-gap-4">
                <div class="val-flex val-flex-wrap val-gap-2">
                  <val-tag value="Nuevo" severity="primary"></val-tag>
                  <val-tag value="En Producción" severity="success"></val-tag>
                  <val-tag value="Beta" severity="warning"></val-tag>
                </div>

                <div class="val-flex val-items-center val-gap-3">
                  <span class="val-text-xs val-font-medium val-text-slate-600 dark:val-text-slate-400">Notificaciones</span>
                  <val-input-switch [(ngModel)]="previewSwitch"></val-input-switch>
                </div>
              </div>

              <!-- Dropdown Selector -->
              <div class="val-max-w-xs">
                <label class="val-text-xs val-font-medium val-text-slate-500 val-mb-1 val-block">Selector de Plan</label>
                <val-dropdown 
                  [options]="planOptions" 
                  [(ngModel)]="selectedPlan" 
                  placeholder="Selecciona un plan">
                </val-dropdown>
              </div>

              <!-- Alert & Card -->
              <val-alert severity="info" title="Tema Dinámico Activo">
                Los estilos CSS Variables se actualizan reactivamente sin recargar la página.
              </val-alert>
            </div>
          </div>

          <!-- EXPORTER TABS & CODE GENERATOR -->
          <val-card>
            <div class="val-flex val-items-center val-justify-between val-flex-wrap val-gap-2 val-mb-4">
              <div class="val-flex val-gap-2">
                <button 
                  type="button"
                  class="val-px-3 val-py-1.5 val-rounded-md val-text-xs val-font-semibold val-transition-all"
                  [class.val-bg-blue-600]="activeTab === 'css'"
                  [class.val-text-white]="activeTab === 'css'"
                  [class.val-text-slate-600]="activeTab !== 'css'"
                  (click)="activeTab = 'css'">
                  CSS Variables
                </button>
                <button 
                  type="button"
                  class="val-px-3 val-py-1.5 val-rounded-md val-text-xs val-font-semibold val-transition-all"
                  [class.val-bg-blue-600]="activeTab === 'scss'"
                  [class.val-text-white]="activeTab === 'scss'"
                  [class.val-text-slate-600]="activeTab !== 'scss'"
                  (click)="activeTab = 'scss'">
                  SCSS Map
                </button>
                <button 
                  type="button"
                  class="val-px-3 val-py-1.5 val-rounded-md val-text-xs val-font-semibold val-transition-all"
                  [class.val-bg-blue-600]="activeTab === 'json'"
                  [class.val-text-white]="activeTab === 'json'"
                  [class.val-text-slate-600]="activeTab !== 'json'"
                  (click)="activeTab = 'json'">
                  JSON Tokens
                </button>
              </div>

              <val-button 
                [label]="copied ? '¡Copiado!' : 'Copiar al Portapapeles'" 
                [icon]="copied ? 'check' : 'copy'" 
                variant="primary" 
                size="sm" 
                (onClick)="copyToClipboard()">
              </val-button>
            </div>

            <pre class="code-export-box val-p-4 val-rounded-xl val-bg-slate-900 val-text-emerald-400 val-text-xs val-font-mono val-overflow-x-auto val-max-h-64"><code>{{ generatedCode() }}</code></pre>
          </val-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .theme-builder-container {
      max-width: 1300px;
      margin: 0 auto;
      padding: 1.5rem;
    }
    .preset-chip {
      cursor: pointer;
      background: var(--val-surface-card, #ffffff);
      &:hover {
        transform: translateY(-1px);
      }
      &.active {
        border-color: #3b82f6;
        background-color: rgba(59, 130, 246, 0.08);
      }
    }
    .color-picker-row {
      padding: 0.25rem 0;
    }
    .code-export-box {
      border: 1px solid #1e293b;
      line-height: 1.5;
    }
  `]
})
export class ThemeBuilderDemoComponent {
  selectedPreset = signal<string>('Ocean Blue');
  activeTab: 'css' | 'scss' | 'json' = 'css';
  copied = false;

  // Customizer state
  primaryColor = '#0066ff';
  secondaryColor = '#64748b';
  successColor = '#10b981';
  warningColor = '#f59e0b';
  dangerColor = '#ef4444';
  infoColor = '#06b6d4';
  borderRadius = '8';
  fontFamily = "'Manrope', sans-serif";

  previewSwitch = true;
  selectedPlan = 'pro';
  planOptions = [
    { label: 'Starter ($0/mes)', value: 'starter' },
    { label: 'Pro Developer ($29/mes)', value: 'pro' },
    { label: 'Enterprise Custom ($99/mes)', value: 'enterprise' }
  ];

  presets: ThemePreset[] = [
    {
      name: 'Ocean Blue',
      primary: '#0066ff',
      secondary: '#64748b',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      info: '#06b6d4',
      borderRadius: '8',
      fontFamily: "'Manrope', sans-serif"
    },
    {
      name: 'Emerald Mint',
      primary: '#059669',
      secondary: '#64748b',
      success: '#10b981',
      warning: '#d97706',
      danger: '#e11d48',
      info: '#0891b2',
      borderRadius: '10',
      fontFamily: "'Inter', sans-serif"
    },
    {
      name: 'Purple Nebula',
      primary: '#7c3aed',
      secondary: '#6b7280',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#f43f5e',
      info: '#38bdf8',
      borderRadius: '12',
      fontFamily: "'Outfit', sans-serif"
    },
    {
      name: 'Sunset Orange',
      primary: '#ea580c',
      secondary: '#78716c',
      success: '#16a34a',
      warning: '#ca8a04',
      danger: '#dc2626',
      info: '#0284c7',
      borderRadius: '6',
      fontFamily: "'Roboto', sans-serif"
    },
    {
      name: 'Cyberpunk Pink',
      primary: '#db2777',
      secondary: '#475569',
      success: '#10b981',
      warning: '#eab308',
      danger: '#e11d48',
      info: '#06b6d4',
      borderRadius: '16',
      fontFamily: "'Outfit', sans-serif"
    },
    {
      name: 'Forest Slate',
      primary: '#0f766e',
      secondary: '#475569',
      success: '#059669',
      warning: '#d97706',
      danger: '#b91c1c',
      info: '#0284c7',
      borderRadius: '4',
      fontFamily: "'Inter', sans-serif"
    }
  ];

  previewStyles = computed(() => {
    return `
      --val-primary: ${this.primaryColor};
      --val-primary-hover: ${this.primaryColor}dd;
      --val-secondary: ${this.secondaryColor};
      --val-success: ${this.successColor};
      --val-warning: ${this.warningColor};
      --val-danger: ${this.dangerColor};
      --val-info: ${this.infoColor};
      --val-border-radius: ${this.borderRadius}px;
      --radius-sm: ${Math.max(2, parseInt(this.borderRadius) - 4)}px;
      --radius-md: ${this.borderRadius}px;
      --radius-lg: ${parseInt(this.borderRadius) + 4}px;
      font-family: ${this.fontFamily};
    `;
  });

  generatedCode = computed(() => {
    if (this.activeTab === 'css') {
      return `:root {
  /* Valence UI Custom Palette */
  --val-primary: ${this.primaryColor};
  --val-secondary: ${this.secondaryColor};
  --val-success: ${this.successColor};
  --val-warning: ${this.warningColor};
  --val-danger: ${this.dangerColor};
  --val-info: ${this.infoColor};

  /* Geometry & Typography */
  --val-border-radius: ${this.borderRadius}px;
  --radius-sm: ${Math.max(2, parseInt(this.borderRadius) - 4)}px;
  --radius-md: ${this.borderRadius}px;
  --radius-lg: ${parseInt(this.borderRadius) + 4}px;
  --font-primary: ${this.fontFamily};
}`;
    } else if (this.activeTab === 'scss') {
      return `// Valence UI Theme Variables
$val-primary: ${this.primaryColor};
$val-secondary: ${this.secondaryColor};
$val-success: ${this.successColor};
$val-warning: ${this.warningColor};
$val-danger: ${this.dangerColor};
$val-info: ${this.infoColor};

$val-border-radius: ${this.borderRadius}px;
$val-font-family: ${this.fontFamily};`;
    } else {
      return JSON.stringify({
        theme: this.selectedPreset(),
        colors: {
          primary: this.primaryColor,
          secondary: this.secondaryColor,
          success: this.successColor,
          warning: this.warningColor,
          danger: this.dangerColor,
          info: this.infoColor
        },
        geometry: {
          borderRadius: `${this.borderRadius}px`
        },
        typography: {
          fontFamily: this.fontFamily
        }
      }, null, 2);
    }
  });

  applyPreset(preset: ThemePreset) {
    this.selectedPreset.set(preset.name);
    this.primaryColor = preset.primary;
    this.secondaryColor = preset.secondary;
    this.successColor = preset.success;
    this.warningColor = preset.warning;
    this.dangerColor = preset.danger;
    this.infoColor = preset.info;
    this.borderRadius = preset.borderRadius;
    this.fontFamily = preset.fontFamily;
  }

  onColorChange() {
    this.selectedPreset.set('Personalizado');
  }

  onGeometryChange() {
    this.selectedPreset.set('Personalizado');
  }

  resetDefaults() {
    this.applyPreset(this.presets[0]);
  }

  copyToClipboard() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.generatedCode());
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    }
  }
}
