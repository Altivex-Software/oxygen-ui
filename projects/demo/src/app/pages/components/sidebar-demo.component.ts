import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent, ButtonComponent } from 'valence-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-sidebar-demo',
  standalone: true,
  imports: [CommonModule, SidebarComponent, ButtonComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="val-page-container">
      <h1>Sidebar</h1>
      <p class="val-description">
        Panel lateral superpuesto deslizable que aparece desde cualquiera de los 4 bordes de la pantalla (left, right, top, bottom).
      </p>

      <!-- 1. POSICIONES -->
      <app-doc-code 
        title="1. Posicionamiento del Sidebar"
        description="Apertura interactiva desde izquierda, derecha, arriba y abajo."
        [htmlCode]="sidebarHtml"
        [tsCode]="sidebarTs">
        <div class="val-flex val-gap-2 val-flex-wrap">
          <val-button label="Izquierda" (onClick)="left = true"></val-button>
          <val-button label="Derecha" severity="secondary" (onClick)="right = true"></val-button>
          <val-button label="Arriba" severity="info" (onClick)="top = true"></val-button>
          <val-button label="Abajo" severity="warn" (onClick)="bottom = true"></val-button>
        </div>
      </app-doc-code>

      <val-sidebar [(visible)]="left" position="left" header="Menú Lateral">
        <div style="padding: 1rem 0;">
          <p style="color: #64748b; font-size: 0.875rem;">Panel desplegado desde la izquierda.</p>
        </div>
      </val-sidebar>

      <val-sidebar [(visible)]="right" position="right" header="Notificaciones">
        <div style="padding: 1rem 0;">
          <p style="color: #64748b; font-size: 0.875rem;">Panel de notificaciones desde la derecha.</p>
        </div>
      </val-sidebar>

      <val-sidebar [(visible)]="top" position="top" header="Banner Superior">
        <div style="padding: 1rem 0;">
          <p style="color: #64748b; font-size: 0.875rem;">Contenido emergente desde la parte superior.</p>
        </div>
      </val-sidebar>

      <val-sidebar [(visible)]="bottom" position="bottom" header="Panel Inferior">
        <div style="padding: 1rem 0;">
          <p style="color: #64748b; font-size: 0.875rem;">Panel modal deslizable desde abajo.</p>
        </div>
      </val-sidebar>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: SidebarComponent"
        [properties]="sidebarProperties" 
        [events]="sidebarEvents">
      </app-doc-api-table>
    </div>
  `
})
export class SidebarDemoComponent {
  left = false;
  right = false;
  top = false;
  bottom = false;

  sidebarHtml = `<val-button label="Abrir Menú" (onClick)="left = true"></val-button>

<val-sidebar [(visible)]="left" position="left" header="Menú Principal">
  <p>Contenido del menú lateral.</p>
</val-sidebar>`;

  sidebarTs = `import { Component } from '@angular/core';
import { SidebarComponent, ButtonComponent } from 'valence-ui';

@Component({
  standalone: true,
  imports: [SidebarComponent, ButtonComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {
  left = false;
}`;

  sidebarProperties: ApiProperty[] = [
    { name: 'visible', type: 'boolean', default: 'false', description: 'Visibilidad del sidebar (soporta [(visible)]).' },
    { name: 'position', type: "'left' | 'right' | 'top' | 'bottom'", default: "'left'", description: 'Borde de la pantalla desde el que emerge el panel.' },
    { name: 'header', type: 'string', default: "''", description: 'Texto del título que aparece en la cabecera.' },
    { name: 'showCloseIcon', type: 'boolean', default: 'true', description: 'Muestra u oculta el botón de cierre (X).' },
    { name: 'dismissible', type: 'boolean', default: 'true', description: 'Cierra el sidebar al hacer clic sobre la máscara oscura.' }
  ];

  sidebarEvents: ApiEvent[] = [
    { name: 'visibleChange', parameters: 'boolean', description: 'Se dispara cuando cambia el estado de visibilidad del sidebar.' },
    { name: 'onShow', parameters: 'void', description: 'Se emite al completarse la animación de apertura.' },
    { name: 'onHide', parameters: 'void', description: 'Se emite cuando el sidebar se oculta.' }
  ];
}