import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  PanelMenuComponent, 
  PanelMenuItem, 
  MegaMenuComponent, 
  MegaMenuItem, 
  BadgeComponent, 
  ToastComponent,
  ToastService 
} from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-panel-menu-demo',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    PanelMenuComponent, 
    MegaMenuComponent, 
    BadgeComponent, 
    ToastComponent, 
    DocCodeComponent, 
    DocApiTableComponent
  ],
  providers: [ToastService],
  template: `
    <div class="demo-container">
      <ox-toast></ox-toast>

      <header class="demo-header">
        <div class="demo-title-badge">
          <ox-badge value="Navigation & Menus" severity="primary"></ox-badge>
        </div>
        <h1 class="demo-title">PanelMenu & MegaMenu</h1>
        <p class="demo-description">
          Componentes avanzados de navegación para dashboards, sidebars multinivel y portales empresariales con menús desplegables en cuadrícula de múltiples columnas.
        </p>
      </header>

      <!-- 1. PanelMenu (Accordion Sidebar) -->
      <app-doc-code
        title="1. PanelMenu (Menú Acordeón Multinivel)"
        description="Ideal para paneles laterales (Sidebars). Soporta múltiples niveles de subelementos anidados, badges de estado y apertura única o múltiple."
        [html]="panelMenuHtml">
        <div class="p-4 max-w-md mx-auto">
          <ox-panel-menu [model]="panelMenuItems()" [multiple]="false"></ox-panel-menu>
        </div>
      </app-doc-code>

      <!-- 2. MegaMenu (Horizontal Multi-Column) -->
      <app-doc-code
        title="2. MegaMenu Horizontal (Cuadrícula de Columnas)"
        description="Barra de navegación de escritorio con desplegables multi-columna organizados por categorías, iconos y descripciones detalladas."
        [html]="megaMenuHorizontalHtml">
        <div class="p-4">
          <ox-mega-menu [model]="megaMenuItems()" orientation="horizontal">
            <div start class="font-bold text-lg text-primary-600 dark:text-primary-400 mr-4 flex items-center gap-2">
              <span class="p-1.5 bg-primary-500/10 rounded-lg text-primary-500">⚡</span>
              Oxygen Portal
            </div>
            <div end class="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Buscar en el portal..." 
                class="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 outline-none" />
            </div>
          </ox-mega-menu>
        </div>
      </app-doc-code>

      <!-- 3. MegaMenu (Vertical Flyout) -->
      <app-doc-code
        title="3. MegaMenu Vertical (Flyout lateral)"
        description="Menú vertical compacto con paneles flotantes a la derecha para marketplaces o catálogos extensos."
        [html]="megaMenuVerticalHtml">
        <div class="p-4">
          <ox-mega-menu [model]="megaMenuVerticalItems()" orientation="vertical"></ox-mega-menu>
        </div>
      </app-doc-code>

      <!-- API Reference -->
      <section class="demo-section">
        <app-doc-api-table title="ox-panel-menu API" [properties]="panelMenuProperties"></app-doc-api-table>
        <div class="mt-8">
          <app-doc-api-table title="ox-mega-menu API" [properties]="megaMenuProperties"></app-doc-api-table>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-container {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
      max-width: 960px;
    }
    .demo-header {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .demo-title {
      font-size: 2.25rem;
      font-weight: 700;
      color: var(--ox-text-primary, #0f172a);
      margin: 0;
    }
    .demo-description {
      font-size: 1.125rem;
      color: var(--ox-text-secondary, #64748b);
      margin: 0;
      line-height: 1.6;
    }
    .demo-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `]
})
export class PanelMenuDemoComponent {
  constructor(private toastService: ToastService) {}

  panelMenuItems = signal<PanelMenuItem[]>([
    {
      label: 'Panel de Control',
      icon: 'layout',
      expanded: true,
      items: [
        { 
          label: 'Métricas & Estadísticas', 
          icon: 'chart-bar',
          command: () => this.showToast('Navegando a Métricas') 
        },
        { 
          label: 'Análisis de Rendimiento', 
          icon: 'activity',
          badge: 'Nuevo',
          badgeSeverity: 'success',
          command: () => this.showToast('Navegando a Análisis')
        }
      ]
    },
    {
      label: 'Administración de Usuarios',
      icon: 'users',
      items: [
        {
          label: 'Gestión de Cuentas',
          icon: 'user',
          items: [
            { label: 'Usuarios Activos', icon: 'user-check', command: () => this.showToast('Usuarios Activos') },
            { label: 'Pendientes de Aprobación', icon: 'clock', badge: '5', badgeSeverity: 'warning' },
            { label: 'Usuarios Bloqueados', icon: 'lock' }
          ]
        },
        { label: 'Roles y Permisos', icon: 'shield' },
        { label: 'Registro de Actividad', icon: 'history' }
      ]
    },
    {
      label: 'Configuración del Sistema',
      icon: 'settings',
      items: [
        { label: 'General & Perfil', icon: 'sliders' },
        { label: 'Seguridad & Autenticación', icon: 'lock' },
        { label: 'Notificaciones & Emails', icon: 'bell', badge: '12', badgeSeverity: 'danger' }
      ]
    },
    {
      label: 'Documentación API',
      icon: 'file-text',
      url: 'https://github.com',
      target: '_blank'
    }
  ]);

  megaMenuItems = signal<MegaMenuItem[]>([
    {
      label: 'Productos & Soluciones',
      icon: 'grid',
      items: [
        [
          {
            label: 'Plataforma Core',
            icon: 'layers',
            items: [
              { label: 'Design System', description: 'Componentes modernos para Angular 18+', icon: 'palette' },
              { label: 'Icon Suite', description: '150+ iconos vectoriales Outline & Fill', icon: 'star', badge: 'Pro', badgeSeverity: 'primary' },
              { label: 'Motion Engine', description: 'Animaciones fluidas y transiciones', icon: 'zap' }
            ]
          }
        ],
        [
          {
            label: 'Integraciones',
            icon: 'share-2',
            items: [
              { label: 'GitHub Sync', description: 'Despliegue y sincronización continua', icon: 'github' },
              { label: 'Cloud Storage', description: 'Almacenamiento seguro en la nube', icon: 'hard-drive' },
              { label: 'Webhooks & API', description: 'Eventos en tiempo real para tu backend', icon: 'code' }
            ]
          }
        ],
        [
          {
            label: 'Seguridad',
            icon: 'shield',
            items: [
              { label: 'SSO & OAuth2', description: 'Autenticación empresarial segura', icon: 'lock' },
              { label: 'Auditoría & Logs', description: 'Trazabilidad y conformidad GDPR', icon: 'file-text' }
            ]
          }
        ]
      ]
    },
    {
      label: 'Recursos',
      icon: 'bookmark',
      items: [
        [
          {
            label: 'Aprendizaje',
            icon: 'book-open',
            items: [
              { label: 'Guía de Inicio Rápido', description: 'Configura tu primer proyecto en minutos', icon: 'compass' },
              { label: 'Tutoriales en Video', description: 'Aprende con ejemplos paso a paso', icon: 'video' },
              { label: 'Changelog & Novedades', description: 'Últimas actualizaciones y parches', icon: 'tag' }
            ]
          }
        ],
        [
          {
            label: 'Comunidad',
            icon: 'message-circle',
            items: [
              { label: 'Discord Server', description: 'Habla directamente con los desarrolladores', icon: 'discord' },
              { label: 'Foro de Soporte', description: 'Preguntas y respuestas de la comunidad', icon: 'help-circle' }
            ]
          }
        ]
      ]
    },
    {
      label: 'Precios',
      icon: 'dollar-sign',
      routerLink: '/components/button'
    }
  ]);

  megaMenuVerticalItems = signal<MegaMenuItem[]>([
    {
      label: 'Electrónica & Computación',
      icon: 'monitor',
      items: [
        [
          {
            label: 'Computadores',
            items: [
              { label: 'Laptops Ultrafinas', description: 'Portabilidad y rendimiento', icon: 'laptop' },
              { label: 'Workstations', description: 'Para diseño y desarrollo 3D', icon: 'cpu' }
            ]
          }
        ],
        [
          {
            label: 'Accesorios',
            items: [
              { label: 'Monitores 4K', description: 'Paneles IPS de alta fidelidad', icon: 'monitor' },
              { label: 'Teclados Mecánicos', description: 'Switches customizables', icon: 'grid' }
            ]
          }
        ]
      ]
    },
    {
      label: 'Servicios en la Nube',
      icon: 'cloud',
      items: [
        [
          {
            label: 'Infraestructura',
            items: [
              { label: 'Servidores Dedicados', icon: 'server' },
              { label: 'Bases de Datos Gestionadas', icon: 'database' }
            ]
          }
        ]
      ]
    }
  ]);

  private showToast(msg: string) {
    this.toastService.add({
      summary: 'Acción Ejecutada',
      detail: msg,
      severity: 'info'
    });
  }

  panelMenuHtml = `<ox-panel-menu [model]="panelMenuItems" [multiple]="false"></ox-panel-menu>`;

  megaMenuHorizontalHtml = `<ox-mega-menu [model]="megaMenuItems" orientation="horizontal">
  <div start class="font-bold mr-4">Oxygen Portal</div>
  <div end>
    <input type="text" placeholder="Buscar..." />
  </div>
</ox-mega-menu>`;

  megaMenuVerticalHtml = `<ox-mega-menu [model]="megaMenuVerticalItems" orientation="vertical"></ox-mega-menu>`;

  panelMenuProperties: ApiProperty[] = [
    { name: 'model', type: 'PanelMenuItem[]', default: '[]', description: 'Lista jerárquica de elementos para el menú acordeón.' },
    { name: 'multiple', type: 'boolean', default: 'false', description: 'Permite mantener múltiples paneles principales abiertos simultáneamente.' }
  ];

  megaMenuProperties: ApiProperty[] = [
    { name: 'model', type: 'MegaMenuItem[]', default: '[]', description: 'Estructura de menús y subcolumnas para el megamenú.' },
    { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Disposición horizontal o vertical del menú.' }
  ];
}
