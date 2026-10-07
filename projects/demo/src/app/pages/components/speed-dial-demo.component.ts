import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeedDialComponent, SpeedDialItem, ToastService, ToastComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-speed-dial-demo',
  standalone: true,
  imports: [CommonModule, SpeedDialComponent, ToastComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <ox-toast></ox-toast>

      <h1>Speed Dial (Botón de Acción Flotante)</h1>
      <p class="ox-description">
        Botón de acción flotante (FAB) que se expande desplegando múltiples acciones con animaciones escalonadas y direcciones configurables.
      </p>

      <!-- 1. DIRECCIÓN UP -->
      <app-doc-code
        title="1. Dirección Hacia Arriba (Up) con Tooltips"
        description="Haz clic en el botón circular para desplegar las acciones verticalmente."
        [html]="upHtml"
        [ts]="speedDialTs">
        <div style="height: 260px; position: relative; background: #f8fafc; border-radius: 8px; border: 1px dashed #cbd5e1;">
          <div style="position: absolute; bottom: 20px; left: 30px;">
            <ox-speed-dial 
              [model]="items" 
              direction="up" 
              [showLabels]="true">
            </ox-speed-dial>
          </div>
        </div>
      </app-doc-code>

      <!-- 2. DIRECCIÓN RIGHT -->
      <app-doc-code
        title="2. Dirección Hacia la Derecha (Right)"
        description="Despliegue horizontal para barras de herramientas o menús inline."
        [html]="rightHtml"
        [ts]="speedDialTs">
        <div style="height: 140px; position: relative; background: #f8fafc; border-radius: 8px; border: 1px dashed #cbd5e1;">
          <div style="position: absolute; top: 40px; left: 30px;">
            <ox-speed-dial 
              [model]="mediaItems" 
              direction="right">
            </ox-speed-dial>
          </div>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: SpeedDialComponent"
        [properties]="speedDialProps"
        [events]="speedDialEvents">
      </app-doc-api-table>
    </div>
  `
})
export class SpeedDialDemoComponent {
  private toastService = inject(ToastService);

  items: SpeedDialItem[] = [
    {
      icon: 'plus',
      label: 'Crear Nuevo',
      tooltip: 'Añadir nuevo registro',
      command: () => this.toastService.add({ severity: 'success', summary: 'Crear', detail: 'Acción ejecutada' })
    },
    {
      icon: 'edit-2',
      label: 'Editar',
      tooltip: 'Editar elemento',
      command: () => this.toastService.add({ severity: 'info', summary: 'Editar', detail: 'Abriendo editor' })
    },
    {
      icon: 'trash-2',
      label: 'Eliminar',
      tooltip: 'Borrar registro',
      command: () => this.toastService.add({ severity: 'error', summary: 'Eliminar', detail: 'Registro borrado' })
    },
    {
      icon: 'share-2',
      label: 'Compartir',
      tooltip: 'Copiar enlace',
      command: () => this.toastService.add({ severity: 'success', summary: 'Compartir', detail: 'Enlace copiado' })
    }
  ];

  mediaItems: SpeedDialItem[] = [
    { icon: 'camera', tooltip: 'Cámara', command: () => this.toastService.add({ severity: 'info', summary: 'Cámara', detail: 'Cámara activada' }) },
    { icon: 'folder', tooltip: 'Subir Archivo', command: () => this.toastService.add({ severity: 'info', summary: 'Archivo', detail: 'Explorador abierto' }) },
    { icon: 'map-pin', tooltip: 'Ubicación', command: () => this.toastService.add({ severity: 'info', summary: 'Ubicación', detail: 'Ubicación compartida' }) }
  ];

  upHtml = `<ox-speed-dial 
  [model]="items" 
  direction="up" 
  [showLabels]="true">
</ox-speed-dial>`;

  rightHtml = `<ox-speed-dial 
  [model]="mediaItems" 
  direction="right">
</ox-speed-dial>`;

  speedDialTs = `items: SpeedDialItem[] = [
  { icon: 'plus', label: 'Crear', command: () => console.log('Crear') },
  { icon: 'edit-2', label: 'Editar', command: () => console.log('Editar') }
];`;

  speedDialProps: ApiProperty[] = [
    {
      name: 'model',
      type: 'SpeedDialItem[]',
      default: '[]',
      description: 'Colección de elementos y acciones del SpeedDial.'
    },
    {
      name: 'direction',
      type: "'up' | 'down' | 'left' | 'right'",
      default: "'up'",
      description: 'Dirección hacia donde se expanden las acciones flotantes.'
    },
    {
      name: 'showLabels',
      type: 'boolean',
      default: 'false',
      description: 'Muestra textos descriptivos fijos al lado de cada botón de acción.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Deshabilita el botón primario.'
    }
  ];

  speedDialEvents: ApiEvent[] = [
    {
      name: 'onVisibleChange',
      parameters: 'boolean',
      description: 'Emitido cuando el menú se expande (true) o se colapsa (false).'
    }
  ];
}
