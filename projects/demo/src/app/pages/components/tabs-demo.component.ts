import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent, TabComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-tabs-demo',
  standalone: true,
  imports: [CommonModule, TabsComponent, TabComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Tabs (Pestañas de Navegación)</h1>
      <p class="ox-description">Organiza y segmenta el contenido en paneles con pestañas interactivas.</p>

      <!-- 1. BÁSICO -->
      <app-doc-code
        title="1. Uso Básico"
        description="Pestañas estándar con etiquetas y contenido dinámico."
        [html]="basicHtml"
        [ts]="tabsTs">
        <ox-tabs>
          <ox-tab label="Perfil" icon="👤">
            <div style="padding: 1rem; color: #334155;">
              <h3 style="margin-top: 0;">Información de Perfil</h3>
              <p>Contenido relacionado con el perfil y datos del usuario.</p>
            </div>
          </ox-tab>
          <ox-tab label="Seguridad" icon="🔒">
            <div style="padding: 1rem; color: #334155;">
              <h3 style="margin-top: 0;">Ajustes de Seguridad</h3>
              <p>Cambio de contraseña y autenticación en dos factores.</p>
            </div>
          </ox-tab>
        </ox-tabs>
      </app-doc-code>

      <!-- 2. VARIANTES DE COLOR -->
      <app-doc-code
        title="2. Variantes de Color"
        description="Colores temáticos success, danger y warning."
        [html]="colorHtml"
        [ts]="tabsTs">
        <ox-tabs color="success">
          <ox-tab label="Ventas" icon="📈"><div style="padding: 1rem;">Métricas de ventas en tiempo real.</div></ox-tab>
          <ox-tab label="Ingresos" icon="💰"><div style="padding: 1rem;">Reporte financiero consolidado.</div></ox-tab>
        </ox-tabs>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: TabsComponent & TabComponent"
        [properties]="tabsProps"
        [events]="tabsEvents">
      </app-doc-api-table>
    </div>
  `
})
export class TabsDemoComponent {
  basicHtml = `<ox-tabs>
  <ox-tab label="Perfil" icon="👤">
    <p>Contenido de perfil</p>
  </ox-tab>
  <ox-tab label="Seguridad" icon="🔒">
    <p>Ajustes de seguridad</p>
  </ox-tab>
</ox-tabs>`;

  colorHtml = `<ox-tabs color="success">
  <ox-tab label="Ventas" icon="📈">Contenido de ventas</ox-tab>
  <ox-tab label="Ingresos" icon="💰">Contenido de ingresos</ox-tab>
</ox-tabs>`;

  tabsTs = `import { Component } from '@angular/core';
import { TabsComponent, TabComponent } from 'oxygen-ui';

@Component({
  selector: 'app-my-tabs',
  standalone: true,
  imports: [TabsComponent, TabComponent],
  templateUrl: './my-tabs.component.html'
})
export class MyTabsComponent {}`;

  tabsProps: ApiProperty[] = [
    {
      name: 'color',
      type: "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'",
      default: "'primary'",
      description: 'Color de resaltado del indicador de la pestaña activa.'
    },
    {
      name: 'activeIndex',
      type: 'number',
      default: '0',
      description: 'Índice de la pestaña activa inicial (0-indexed).'
    }
  ];

  tabsEvents: ApiEvent[] = [
    {
      name: 'activeIndexChange',
      parameters: 'number',
      description: 'Emitido cuando el usuario selecciona una pestaña diferente.'
    }
  ];
}