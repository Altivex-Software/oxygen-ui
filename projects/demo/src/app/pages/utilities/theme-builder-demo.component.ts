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
} from 'oxygen-ui';

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
      <div class="ox-flex ox-items-center ox-justify-between ox-flex-wrap ox-gap-4 ox-mb-6">
        <div>
          <h1 class="ox-text-3xl ox-font-bold ox-text-slate-900 dark:ox-text-white ox-mb-2">Theme Builder & Generador de Tokens</h1>
          <p class="ox-text-slate-600 dark:ox-text-slate-400">
            Personaliza en tiempo real la paleta de colores, radios de borde y tipografía de Oxygen UI. Previsualiza los cambios al instante y exporta el código en CSS, SCSS o JSON.
          </p>
        </div>
        <div class="ox-flex ox-gap-2">
          <ox-button label="Restablecer" variant="outline-secondary" icon="refresh-cw" (onClick)="resetDefaults()"></ox-button>
        </div>
      </div>

      <!-- MAIN WORKSPACE -->
      <div class="ox-grid ox-grid-cols-1 lg:ox-grid-cols-12 ox-gap-6">
        
        <!-- CONTROLS PANEL (LEFT 5 COLS) -->
        <div class="lg:ox-col-span-5 ox-space-y-6">
          
          <!-- PRESETS -->
          <ox-card>
            <h3 class="ox-text-sm ox-font-bold ox-uppercase ox-tracking-wider ox-text-slate-500 ox-mb-3 ox-flex ox-items-center ox-gap-2">
              <ox-icon name="palette" size="1rem"></ox-icon> Presets Rápidos
            </h3>
            <div class="ox-grid ox-grid-cols-2 sm:ox-grid-cols-3 ox-gap-2">
              @for (preset of presets; track preset.name) {
                <button 
                  type="button" 
                  class="preset-chip ox-flex ox-items-center ox-gap-2 ox-p-2 ox-rounded-lg ox-border ox-border-slate-200 dark:ox-border-slate-700 ox-text-xs ox-font-medium hover:ox-border-blue-500 ox-transition-all"
                  [class.active]="selectedPreset() === preset.name"
                  (click)="applyPreset(preset)">
                  <span class="ox-w-4 ox-h-4 ox-rounded-full ox-flex-shrink-0" [style.background-color]="preset.primary"></span>
                  <span class="ox-truncate">{{ preset.name }}</span>
                </button>
              }
            </div>
          </ox-card>

          <!-- COLORS CUSTOMIZER -->
          <ox-card>
            <h3 class="ox-text-sm ox-font-bold ox-uppercase ox-tracking-wider ox-text-slate-500 ox-mb-4 ox-flex ox-items-center ox-gap-2">
              <ox-icon name="sliders" size="1rem"></ox-icon> Paleta de Colores
            </h3>

            <div class="ox-space-y-3">
              <!-- Primary -->
              <div class="color-picker-row ox-flex ox-items-center ox-justify-between">
                <label class="ox-text-sm ox-font-medium ox-text-slate-700 dark:ox-text-slate-300">Color Primario</label>
                <div class="ox-flex ox-items-center ox-gap-2">
                  <input type="color" [(ngModel)]="primaryColor" (ngModelChange)="onColorChange()" class="ox-w-8 ox-h-8 ox-rounded ox-cursor-pointer ox-border-0" />
                  <input type="text" [(ngModel)]="primaryColor" (ngModelChange)="onColorChange()" class="ox-w-24 ox-p-1 ox-text-xs ox-border ox-border-slate-300 dark:ox-border-slate-700 ox-rounded dark:ox-bg-slate-800" />
                </div>
              </div>

              <!-- Secondary -->
              <div class="color-picker-row ox-flex ox-items-center ox-justify-between">
                <label class="ox-text-sm ox-font-medium ox-text-slate-700 dark:ox-text-slate-300">Color Secundario</label>
                <div class="ox-flex ox-items-center ox-gap-2">
                  <input type="color" [(ngModel)]="secondaryColor" (ngModelChange)="onColorChange()" class="ox-w-8 ox-h-8 ox-rounded ox-cursor-pointer ox-border-0" />
                  <input type="text" [(ngModel)]="secondaryColor" (ngModelChange)="onColorChange()" class="ox-w-24 ox-p-1 ox-text-xs ox-border ox-border-slate-300 dark:ox-border-slate-700 ox-rounded dark:ox-bg-slate-800" />
                </div>
              </div>

              <!-- Success -->
              <div class="color-picker-row ox-flex ox-items-center ox-justify-between">
                <label class="ox-text-sm ox-font-medium ox-text-slate-700 dark:ox-text-slate-300">Éxito (Success)</label>
                <div class="ox-flex ox-items-center ox-gap-2">
                  <input type="color" [(ngModel)]="successColor" (ngModelChange)="onColorChange()" class="ox-w-8 ox-h-8 ox-rounded ox-cursor-pointer ox-border-0" />
                  <input type="text" [(ngModel)]="successColor" (ngModelChange)="onColorChange()" class="ox-w-24 ox-p-1 ox-text-xs ox-border ox-border-slate-300 dark:ox-border-slate-700 ox-rounded dark:ox-bg-slate-800" />
                </div>
              </div>

              <!-- Warning -->
              <div class="color-picker-row ox-flex ox-items-center ox-justify-between">
                <label class="ox-text-sm ox-font-medium ox-text-slate-700 dark:ox-text-slate-300">Advertencia (Warning)</label>
                <div class="ox-flex ox-items-center ox-gap-2">
                  <input type="color" [(ngModel)]="warningColor" (ngModelChange)="onColorChange()" class="ox-w-8 ox-h-8 ox-rounded ox-cursor-pointer ox-border-0" />
                  <input type="text" [(ngModel)]="warningColor" (ngModelChange)="onColorChange()" class="ox-w-24 ox-p-1 ox-text-xs ox-border ox-border-slate-300 dark:ox-border-slate-700 ox-rounded dark:ox-bg-slate-800" />
                </div>
              </div>

              <!-- Danger -->
              <div class="color-picker-row ox-flex ox-items-center ox-justify-between">
                <label class="ox-text-sm ox-font-medium ox-text-slate-700 dark:ox-text-slate-300">Peligro (Danger)</label>
                <div class="ox-flex ox-items-center ox-gap-2">
                  <input type="color" [(ngModel)]="dangerColor" (ngModelChange)="onColorChange()" class="ox-w-8 ox-h-8 ox-rounded ox-cursor-pointer ox-border-0" />
                  <input type="text" [(ngModel)]="dangerColor" (ngModelChange)="onColorChange()" class="ox-w-24 ox-p-1 ox-text-xs ox-border ox-border-slate-300 dark:ox-border-slate-700 ox-rounded dark:ox-bg-slate-800" />
                </div>
              </div>

              <!-- Info -->
              <div class="color-picker-row ox-flex ox-items-center ox-justify-between">
                <label class="ox-text-sm ox-font-medium ox-text-slate-700 dark:ox-text-slate-300">Información (Info)</label>
                <div class="ox-flex ox-items-center ox-gap-2">
                  <input type="color" [(ngModel)]="infoColor" (ngModelChange)="onColorChange()" class="ox-w-8 ox-h-8 ox-rounded ox-cursor-pointer ox-border-0" />
                  <input type="text" [(ngModel)]="infoColor" (ngModelChange)="onColorChange()" class="ox-w-24 ox-p-1 ox-text-xs ox-border ox-border-slate-300 dark:ox-border-slate-700 ox-rounded dark:ox-bg-slate-800" />
                </div>
              </div>
            </div>
          </ox-card>

          <!-- GEOMETRY & TYPOGRAPHY -->
          <ox-card>
            <h3 class="ox-text-sm ox-font-bold ox-uppercase ox-tracking-wider ox-text-slate-500 ox-mb-4 ox-flex ox-items-center ox-gap-2">
              <ox-icon name="type" size="1rem"></ox-icon> Geometría & Tipografía
            </h3>

            <div class="ox-space-y-4">
              <!-- Border Radius -->
              <div>
                <div class="ox-flex ox-justify-between ox-text-sm ox-mb-2">
                  <span class="ox-font-medium ox-text-slate-700 dark:ox-text-slate-300">Radio de Bordes (Border Radius)</span>
                  <span class="ox-text-xs ox-text-slate-500">{{ borderRadius }}px</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="24" 
                  step="2" 
                  [(ngModel)]="borderRadius" 
                  (ngModelChange)="onGeometryChange()" 
                  class="ox-w-full ox-cursor-pointer" />
                <div class="ox-flex ox-justify-between ox-text-[10px] ox-text-slate-400 ox-mt-1">
                  <span>Recto (0px)</span>
                  <span>Estándar (6px)</span>
                  <span>Suave (12px)</span>
                  <span>Píldora (24px)</span>
                </div>
              </div>

              <!-- Font Family -->
              <div>
                <label class="ox-text-sm ox-font-medium ox-text-slate-700 dark:ox-text-slate-300 ox-block ox-mb-1">Familia Tipográfica</label>
                <select [(ngModel)]="fontFamily" (ngModelChange)="onGeometryChange()" class="ox-w-full ox-p-2 ox-border ox-border-slate-300 dark:ox-border-slate-700 ox-rounded-lg dark:ox-bg-slate-800 ox-text-sm">
                  <option value="'Manrope', sans-serif">Manrope (Modern & Crisp)</option>
                  <option value="'Inter', sans-serif">Inter (Clean Enterprise)</option>
                  <option value="'Outfit', sans-serif">Outfit (Geometric & Bold)</option>
                  <option value="'Roboto', sans-serif">Roboto (Material Standard)</option>
                  <option value="'Fira Code', monospace">Fira Code (Tech / Code)</option>
                </select>
              </div>
            </div>
          </ox-card>
        </div>

        <!-- LIVE PREVIEW & EXPORT (RIGHT 7 COLS) -->
        <div class="lg:ox-col-span-7 ox-space-y-6">
          
          <!-- LIVE PREVIEW CANVAS -->
          <div class="theme-preview-box ox-p-6 ox-rounded-2xl ox-border ox-border-slate-200 dark:ox-border-slate-800 ox-bg-slate-50/50 dark:ox-bg-slate-900/50" [style]="previewStyles()">
            <div class="ox-flex ox-items-center ox-justify-between ox-mb-4">
              <span class="ox-text-xs ox-font-bold ox-uppercase ox-tracking-wider ox-text-slate-500 ox-flex ox-items-center ox-gap-1.5">
                <span class="ox-w-2 ox-h-2 ox-rounded-full ox-bg-emerald-500 ox-animate-pulse"></span>
                Previsualización en Vivo de Componentes
              </span>
              <span class="ox-text-xs ox-text-slate-400">Tokens aplicados en tiempo real</span>
            </div>

            <!-- PREVIEW COMPONENTS -->
            <div class="ox-space-y-6">
              
              <!-- Buttons & Actions -->
              <div>
                <div class="ox-text-xs ox-font-semibold ox-text-slate-500 ox-mb-2">Botones & Acciones</div>
                <div class="ox-flex ox-flex-wrap ox-gap-3">
                  <ox-button label="Primario" variant="primary" icon="check"></ox-button>
                  <ox-button label="Secundario" variant="outline-secondary"></ox-button>
                  <ox-button label="Éxito" variant="success" icon="thumbs-up"></ox-button>
                  <ox-button label="Peligro" variant="danger" icon="trash-2"></ox-button>
                  <ox-button label="Deshabilitado" [disabled]="true"></ox-button>
                </div>
              </div>

              <!-- Badges & Tags -->
              <div>
                <div class="ox-text-xs ox-font-semibold ox-text-slate-500 ox-mb-2">Badges & Tags</div>
                <div class="ox-flex ox-flex-wrap ox-gap-2">
                  <ox-badge value="Primary Live" severity="primary"></ox-badge>
                  <ox-badge value="Approved" severity="success"></ox-badge>
                  <ox-badge value="Attention" severity="warning"></ox-badge>
                  <ox-badge value="Critical" severity="danger"></ox-badge>
                  <ox-badge value="Info Note" severity="info"></ox-badge>
                </div>
              </div>

              <!-- Form Controls -->
              <div>
                <div class="ox-text-xs ox-font-semibold ox-text-slate-500 ox-mb-2">Campos de Entrada (FormField)</div>
                <div class="ox-grid ox-grid-cols-1 sm:ox-grid-cols-2 ox-gap-4">
                  <ox-form-field label="Nombre de Usuario">
                    <ox-icon oxPrefix name="user"></ox-icon>
                    <input class="ox-input-native" placeholder="Ingresa tu usuario..." />
                  </ox-form-field>

                  <ox-form-field label="Correo Electrónico" hint="Enviaremos un enlace de confirmación">
                    <ox-icon oxPrefix name="mail"></ox-icon>
                    <input class="ox-input-native" type="email" placeholder="usuario@oxygen.dev" />
                  </ox-form-field>
                </div>
              </div>

              <!-- Tags & Interactive Switches -->
              <div class="ox-flex ox-items-center ox-justify-between ox-flex-wrap ox-gap-4">
                <div class="ox-flex ox-flex-wrap ox-gap-2">
                  <ox-tag value="Nuevo" severity="primary"></ox-tag>
                  <ox-tag value="En Producción" severity="success"></ox-tag>
                  <ox-tag value="Beta" severity="warning"></ox-tag>
                </div>

                <div class="ox-flex ox-items-center ox-gap-3">
                  <span class="ox-text-xs ox-font-medium ox-text-slate-600 dark:ox-text-slate-400">Notificaciones</span>
                  <ox-input-switch [(ngModel)]="previewSwitch"></ox-input-switch>
                </div>
              </div>

              <!-- Dropdown Selector -->
              <div class="ox-max-w-xs">
                <label class="ox-text-xs ox-font-medium ox-text-slate-500 ox-mb-1 ox-block">Selector de Plan</label>
                <ox-dropdown 
                  [options]="planOptions" 
                  [(ngModel)]="selectedPlan" 
                  placeholder="Selecciona un plan">
                </ox-dropdown>
              </div>

              <!-- Alert & Card -->
              <ox-alert severity="info" title="Tema Dinámico Activo">
                Los estilos CSS Variables se actualizan reactivamente sin recargar la página.
              </ox-alert>
            </div>
          </div>

          <!-- EXPORTER TABS & CODE GENERATOR -->
          <ox-card>
            <div class="ox-flex ox-items-center ox-justify-between ox-flex-wrap ox-gap-2 ox-mb-4">
              <div class="ox-flex ox-gap-2">
                <button 
                  type="button"
                  class="ox-px-3 ox-py-1.5 ox-rounded-md ox-text-xs ox-font-semibold ox-transition-all"
                  [class.ox-bg-blue-600]="activeTab === 'css'"
                  [class.ox-text-white]="activeTab === 'css'"
                  [class.ox-text-slate-600]="activeTab !== 'css'"
                  (click)="activeTab = 'css'">
                  CSS Variables
                </button>
                <button 
                  type="button"
                  class="ox-px-3 ox-py-1.5 ox-rounded-md ox-text-xs ox-font-semibold ox-transition-all"
                  [class.ox-bg-blue-600]="activeTab === 'scss'"
                  [class.ox-text-white]="activeTab === 'scss'"
                  [class.ox-text-slate-600]="activeTab !== 'scss'"
                  (click)="activeTab = 'scss'">
                  SCSS Map
                </button>
                <button 
                  type="button"
                  class="ox-px-3 ox-py-1.5 ox-rounded-md ox-text-xs ox-font-semibold ox-transition-all"
                  [class.ox-bg-blue-600]="activeTab === 'json'"
                  [class.ox-text-white]="activeTab === 'json'"
                  [class.ox-text-slate-600]="activeTab !== 'json'"
                  (click)="activeTab = 'json'">
                  JSON Tokens
                </button>
              </div>

              <ox-button 
                [label]="copied ? '¡Copiado!' : 'Copiar al Portapapeles'" 
                [icon]="copied ? 'check' : 'copy'" 
                variant="primary" 
                size="sm" 
                (onClick)="copyToClipboard()">
              </ox-button>
            </div>

            <pre class="code-export-box ox-p-4 ox-rounded-xl ox-bg-slate-900 ox-text-emerald-400 ox-text-xs ox-font-mono ox-overflow-x-auto ox-max-h-64"><code>{{ generatedCode() }}</code></pre>
          </ox-card>
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
      background: var(--oxy-surface-card, #ffffff);
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
      --oxy-primary: ${this.primaryColor};
      --oxy-primary-hover: ${this.primaryColor}dd;
      --oxy-secondary: ${this.secondaryColor};
      --oxy-success: ${this.successColor};
      --oxy-warning: ${this.warningColor};
      --oxy-danger: ${this.dangerColor};
      --oxy-info: ${this.infoColor};
      --oxy-border-radius: ${this.borderRadius}px;
      --radius-sm: ${Math.max(2, parseInt(this.borderRadius) - 4)}px;
      --radius-md: ${this.borderRadius}px;
      --radius-lg: ${parseInt(this.borderRadius) + 4}px;
      font-family: ${this.fontFamily};
    `;
  });

  generatedCode = computed(() => {
    if (this.activeTab === 'css') {
      return `:root {
  /* Oxygen UI Custom Palette */
  --oxy-primary: ${this.primaryColor};
  --oxy-secondary: ${this.secondaryColor};
  --oxy-success: ${this.successColor};
  --oxy-warning: ${this.warningColor};
  --oxy-danger: ${this.dangerColor};
  --oxy-info: ${this.infoColor};

  /* Geometry & Typography */
  --oxy-border-radius: ${this.borderRadius}px;
  --radius-sm: ${Math.max(2, parseInt(this.borderRadius) - 4)}px;
  --radius-md: ${this.borderRadius}px;
  --radius-lg: ${parseInt(this.borderRadius) + 4}px;
  --font-primary: ${this.fontFamily};
}`;
    } else if (this.activeTab === 'scss') {
      return `// Oxygen UI Theme Variables
$oxy-primary: ${this.primaryColor};
$oxy-secondary: ${this.secondaryColor};
$oxy-success: ${this.successColor};
$oxy-warning: ${this.warningColor};
$oxy-danger: ${this.dangerColor};
$oxy-info: ${this.infoColor};

$oxy-border-radius: ${this.borderRadius}px;
$oxy-font-family: ${this.fontFamily};`;
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
