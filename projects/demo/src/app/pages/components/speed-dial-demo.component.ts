import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  SpeedDialComponent, 
  SpeedDialItem, 
  ToastService, 
  ToastComponent,
  BadgeComponent
} from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-speed-dial-demo',
  standalone: true,
  imports: [
    CommonModule, 
    SpeedDialComponent, 
    ToastComponent, 
    BadgeComponent,
    DocCodeComponent, 
    DocApiTableComponent
  ],
  template: `
    <div class="ox-page-container">
      <ox-toast></ox-toast>

      <div class="ox-flex ox-items-center ox-justify-between ox-flex-wrap ox-gap-4 ox-mb-8">
        <div>
          <h1 class="ox-text-3xl ox-font-bold ox-text-slate-900 dark:ox-text-white ox-mb-2">Speed Dial (Botón de Acción Flotante)</h1>
          <p class="ox-text-slate-600 dark:ox-text-slate-400">
            SpeedDial muestra acciones contextuales agrupadas en un único botón flotante con animaciones escalonadas, despliegue lineal y radial (círculo 360°, semicírculo 180°, cuarto de círculo 90°), tooltips interactivos, etiquetas fijas y máscara backdrop.
          </p>
        </div>
        <div class="ox-flex ox-gap-2">
          <ox-badge value="Linear & Radial 360°" severity="primary"></ox-badge>
          <ox-badge value="Interactive FAB" severity="success"></ox-badge>
        </div>
      </div>

      <!-- 1. BASIC DEMO (ESQUINA INFERIOR DERECHA) -->
      <app-doc-code
        title="1. Basic (Anclado en Esquina Inferior Derecha)"
        description="Uso estándar del botón FAB flotante anclado en la esquina de la pantalla o contenedor, desplegándose verticalmente hacia arriba."
        [html]="basicHtml"
        [ts]="speedDialTs">
        <div style="position: relative; height: 480px; min-height: 480px; width: 100%; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #f8fafc; background-image: radial-gradient(#cbd5e1 1.5px, transparent 1.5px); background-size: 24px 24px;">
          <ox-speed-dial 
            [model]="linearItems" 
            direction="up"
            [style]="{ position: 'absolute', bottom: '32px', right: '32px' }">
          </ox-speed-dial>
        </div>
      </app-doc-code>

      <!-- 2. LINEAR (4 DIRECCIONES: UP, DOWN, LEFT, RIGHT) -->
      <app-doc-code
        title="2. Linear (4 Direcciones: Up, Down, Left, Right)"
        description="Muestra el despliegue lineal en las 4 direcciones principales hacia el interior del contenedor."
        [html]="linearHtml"
        [ts]="speedDialTs">
        <div style="position: relative; height: 540px; min-height: 540px; width: 100%; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #f8fafc; background-image: radial-gradient(#cbd5e1 1.5px, transparent 1.5px); background-size: 24px 24px;">
          <!-- Top: Despliegue Down -->
          <ox-speed-dial 
            [model]="linearItems" 
            direction="down"
            [style]="{ position: 'absolute', top: '32px', left: 'calc(50% - 25px)' }">
          </ox-speed-dial>

          <!-- Bottom: Despliegue Up -->
          <ox-speed-dial 
            [model]="linearItems" 
            direction="up"
            [style]="{ position: 'absolute', bottom: '32px', left: 'calc(50% - 25px)' }">
          </ox-speed-dial>

          <!-- Left: Despliegue Right -->
          <ox-speed-dial 
            [model]="linearItems" 
            direction="right"
            [style]="{ position: 'absolute', left: '32px', top: 'calc(50% - 25px)' }">
          </ox-speed-dial>

          <!-- Right: Despliegue Left -->
          <ox-speed-dial 
            [model]="linearItems" 
            direction="left"
            [style]="{ position: 'absolute', right: '32px', top: 'calc(50% - 25px)' }">
          </ox-speed-dial>
        </div>
      </app-doc-code>

      <!-- 3. CIRCLE (DESPLIEGUE RADIAL 360°) -->
      <app-doc-code
        title="3. Circle (Despliegue Radial Completo 360°)"
        description="Los elementos se distribuyen de forma equidistante en un círculo de 360° alrededor del botón central."
        [html]="circleHtml"
        [ts]="speedDialTs">
        <div style="position: relative; height: 520px; min-height: 520px; width: 100%; display: flex; align-items: center; justify-content: center; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #f8fafc; background-image: radial-gradient(#cbd5e1 1.5px, transparent 1.5px); background-size: 24px 24px;">
          <ox-speed-dial 
            [model]="circleItems" 
            type="circle"
            [radius]="125"
            buttonClass="ox-speed-dial-orange">
          </ox-speed-dial>
        </div>
      </app-doc-code>

      <!-- 4. SEMI CIRCLE (180 GRADOS) -->
      <app-doc-code
        title="4. Semi Circle (Despliegue en Semicírculo 180°)"
        description="Los elementos se despliegan en un arco de 180° orientado hacia el área disponible según la dirección."
        [html]="semiCircleHtml"
        [ts]="speedDialTs">
        <div style="position: relative; height: 560px; min-height: 560px; width: 100%; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #f8fafc; background-image: radial-gradient(#cbd5e1 1.5px, transparent 1.5px); background-size: 24px 24px;">
          <!-- Top: Semicírculo Down -->
          <ox-speed-dial 
            [model]="linearItems" 
            type="semi-circle"
            direction="down"
            [radius]="115"
            buttonClass="ox-speed-dial-success"
            [style]="{ position: 'absolute', top: '32px', left: 'calc(50% - 25px)' }">
          </ox-speed-dial>

          <!-- Bottom: Semicírculo Up -->
          <ox-speed-dial 
            [model]="linearItems" 
            type="semi-circle"
            direction="up"
            [radius]="115"
            buttonClass="ox-speed-dial-success"
            [style]="{ position: 'absolute', bottom: '32px', left: 'calc(50% - 25px)' }">
          </ox-speed-dial>

          <!-- Left: Semicírculo Right -->
          <ox-speed-dial 
            [model]="linearItems" 
            type="semi-circle"
            direction="right"
            [radius]="115"
            buttonClass="ox-speed-dial-success"
            [style]="{ position: 'absolute', left: '32px', top: 'calc(50% - 25px)' }">
          </ox-speed-dial>

          <!-- Right: Semicírculo Left -->
          <ox-speed-dial 
            [model]="linearItems" 
            type="semi-circle"
            direction="left"
            [radius]="115"
            buttonClass="ox-speed-dial-success"
            [style]="{ position: 'absolute', right: '32px', top: 'calc(50% - 25px)' }">
          </ox-speed-dial>
        </div>
      </app-doc-code>

      <!-- 5. QUARTER CIRCLE (4 ESQUINAS) -->
      <app-doc-code
        title="5. Quarter Circle (Cuadrante de 90° en las 4 Esquinas)"
        description="Ideal para esquinas de la interfaz, desplegando los elementos en un arco de 90° orientado hacia el centro del contenedor."
        [html]="quarterCircleHtml"
        [ts]="speedDialTs">
        <div style="position: relative; height: 540px; min-height: 540px; width: 100%; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #f8fafc; background-image: radial-gradient(#cbd5e1 1.5px, transparent 1.5px); background-size: 24px 24px;">
          <!-- Top-Left -->
          <ox-speed-dial 
            [model]="linearItems" 
            type="quarter-circle"
            direction="down-right"
            [radius]="130"
            [style]="{ position: 'absolute', top: '32px', left: '32px' }">
          </ox-speed-dial>

          <!-- Top-Right -->
          <ox-speed-dial 
            [model]="linearItems" 
            type="quarter-circle"
            direction="down-left"
            [radius]="130"
            [style]="{ position: 'absolute', top: '32px', right: '32px' }">
          </ox-speed-dial>

          <!-- Bottom-Left -->
          <ox-speed-dial 
            [model]="linearItems" 
            type="quarter-circle"
            direction="up-right"
            [radius]="130"
            [style]="{ position: 'absolute', bottom: '32px', left: '32px' }">
          </ox-speed-dial>

          <!-- Bottom-Right -->
          <ox-speed-dial 
            [model]="linearItems" 
            type="quarter-circle"
            direction="up-left"
            [radius]="130"
            [style]="{ position: 'absolute', bottom: '32px', right: '32px' }">
          </ox-speed-dial>
        </div>
      </app-doc-code>

      <!-- 6. LABELS FIJAS (ETIQUETAS) -->
      <app-doc-code
        title="6. Despliegue con Etiquetas Fijas (Action Labels)"
        description="Muestra etiquetas de texto descriptivas fijas junto a cada acción secundaria."
        [html]="labelsHtml"
        [ts]="speedDialTs">
        <div style="position: relative; height: 500px; min-height: 500px; width: 100%; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 40px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #f8fafc; background-image: radial-gradient(#cbd5e1 1.5px, transparent 1.5px); background-size: 24px 24px;">
          <ox-speed-dial 
            [model]="crudItems" 
            direction="up" 
            [showLabels]="true"
            buttonClass="ox-speed-dial-primary">
          </ox-speed-dial>
        </div>
      </app-doc-code>

      <!-- 7. MÁSCARA BACKDROP (BLUR) -->
      <app-doc-code
        title="7. Modo con Máscara de Fondo (Backdrop Blur)"
        description="Añade un fondo oscuro difuminado que cubre la pantalla al abrir el botón flotante para enfocar la atención."
        [html]="maskHtml"
        [ts]="speedDialTs">
        <div style="position: relative; height: 480px; min-height: 480px; width: 100%; display: flex; align-items: center; justify-content: center; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #f8fafc; background-image: radial-gradient(#cbd5e1 1.5px, transparent 1.5px); background-size: 24px 24px;">
          <ox-speed-dial 
            [model]="mediaItems" 
            type="circle"
            [radius]="110"
            [mask]="true"
            buttonClass="ox-speed-dial-danger">
          </ox-speed-dial>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: SpeedDialComponent"
        [properties]="speedDialProps"
        [events]="speedDialEvents">
      </app-doc-api-table>
    </div>
  `,
  styles: [`
    .ox-page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1.5rem;
    }
    .canvas-container,
    .speeddial-canvas {
      position: relative !important;
      width: 100% !important;
      min-height: 480px !important;
      height: 480px !important;
      display: block !important;
      box-sizing: border-box !important;
      overflow: visible !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 16px !important;
      background-color: #f8fafc !important;
      background-image: radial-gradient(#cbd5e1 1.5px, transparent 1.5px) !important;
      background-size: 24px 24px !important;
    }
    :host-context(.dark) .canvas-container,
    .dark .canvas-container,
    :host-context(.dark) .speeddial-canvas,
    .dark .speeddial-canvas {
      background-color: #0f172a !important;
      background-image: radial-gradient(#334155 1.5px, transparent 1.5px) !important;
      border-color: #334155 !important;
    }
  `]
})
export class SpeedDialDemoComponent {
  private toastService = inject(ToastService);

  linearItems: SpeedDialItem[] = [
    { icon: 'share-2', tooltip: 'Compartir', command: () => this.toastService.add({ severity: 'info', summary: 'Compartir', detail: 'Enlace copiado' }) },
    { icon: 'upload', tooltip: 'Subir', command: () => this.toastService.add({ severity: 'success', summary: 'Subir', detail: 'Archivo subido' }) },
    { icon: 'trash-2', tooltip: 'Eliminar', command: () => this.toastService.add({ severity: 'error', summary: 'Eliminar', detail: 'Elemento eliminado' }) },
    { icon: 'refresh-cw', tooltip: 'Actualizar', command: () => this.toastService.add({ severity: 'secondary', summary: 'Actualizar', detail: 'Datos sincronizados' }) },
    { icon: 'edit-2', tooltip: 'Editar', command: () => this.toastService.add({ severity: 'warn', summary: 'Editar', detail: 'Modo edición activo' }) }
  ];

  mediaItems: SpeedDialItem[] = [
    { icon: 'camera', tooltip: 'Capturar Foto', command: () => this.toastService.add({ severity: 'info', summary: 'Cámara', detail: 'Cámara activada' }) },
    { icon: 'folder', tooltip: 'Explorador', command: () => this.toastService.add({ severity: 'info', summary: 'Archivo', detail: 'Explorador abierto' }) },
    { icon: 'map-pin', tooltip: 'Ubicación', command: () => this.toastService.add({ severity: 'info', summary: 'Ubicación', detail: 'Coordenadas GPS enviadas' }) },
    { icon: 'heart', tooltip: 'Favorito', command: () => this.toastService.add({ severity: 'error', summary: 'Favorito', detail: 'Guardado en tu lista' }) }
  ];

  circleItems: SpeedDialItem[] = [
    { icon: 'user', tooltip: 'Perfil', command: () => this.toastService.add({ severity: 'info', summary: 'Perfil', detail: 'Perfil de usuario' }) },
    { icon: 'heart', tooltip: 'Favoritos', command: () => this.toastService.add({ severity: 'error', summary: 'Favoritos', detail: 'Lista de favoritos' }) },
    { icon: 'edit-2', tooltip: 'Editar', command: () => this.toastService.add({ severity: 'warn', summary: 'Editar', detail: 'Edición abierta' }) },
    { icon: 'refresh-cw', tooltip: 'Recargar', command: () => this.toastService.add({ severity: 'secondary', summary: 'Recargar', detail: 'Página recargada' }) },
    { icon: 'trash-2', tooltip: 'Borrar', command: () => this.toastService.add({ severity: 'error', summary: 'Borrar', detail: 'Borrado ejecutado' }) },
    { icon: 'upload', tooltip: 'Subir', command: () => this.toastService.add({ severity: 'success', summary: 'Subir', detail: 'Carga completada' }) },
    { icon: 'share-2', tooltip: 'Exportar', command: () => this.toastService.add({ severity: 'info', summary: 'Exportar', detail: 'Exportación completada' }) },
    { icon: 'settings', tooltip: 'Ajustes', command: () => this.toastService.add({ severity: 'secondary', summary: 'Ajustes', detail: 'Configuración abierta' }) }
  ];

  crudItems: SpeedDialItem[] = [
    {
      icon: 'plus',
      label: 'Crear Documento',
      tooltip: 'Nuevo documento',
      command: () => this.toastService.add({ severity: 'success', summary: 'Crear', detail: 'Nuevo documento creado con éxito' })
    },
    {
      icon: 'edit-2',
      label: 'Editar Ficha',
      tooltip: 'Editar registro',
      command: () => this.toastService.add({ severity: 'info', summary: 'Editar', detail: 'Modo de edición activado' })
    },
    {
      icon: 'trash-2',
      label: 'Eliminar Registro',
      tooltip: 'Borrar registro',
      command: () => this.toastService.add({ severity: 'error', summary: 'Eliminar', detail: 'Registro eliminado del sistema' })
    },
    {
      icon: 'share-2',
      label: 'Compartir Enlace',
      tooltip: 'Copiar enlace',
      command: () => this.toastService.add({ severity: 'success', summary: 'Compartir', detail: 'Enlace copiado al portapapeles' })
    }
  ];

  basicHtml = `<div style="position: relative; height: 480px;">
  <ox-speed-dial 
    [model]="items" 
    direction="up" 
    [style]="{ position: 'absolute', bottom: '32px', right: '32px' }">
  </ox-speed-dial>
</div>`;

  linearHtml = `<ox-speed-dial [model]="items" direction="down" [style]="{ position: 'absolute', top: '32px', left: 'calc(50% - 25px)' }"></ox-speed-dial>
<ox-speed-dial [model]="items" direction="up" [style]="{ position: 'absolute', bottom: '32px', left: 'calc(50% - 25px)' }"></ox-speed-dial>
<ox-speed-dial [model]="items" direction="right" [style]="{ position: 'absolute', left: '32px', top: 'calc(50% - 25px)' }"></ox-speed-dial>
<ox-speed-dial [model]="items" direction="left" [style]="{ position: 'absolute', right: '32px', top: 'calc(50% - 25px)' }"></ox-speed-dial>`;

  circleHtml = `<ox-speed-dial 
  [model]="circleItems" 
  type="circle" 
  [radius]="125"
  buttonClass="ox-speed-dial-orange">
</ox-speed-dial>`;

  semiCircleHtml = `<ox-speed-dial [model]="items" type="semi-circle" direction="down" [radius]="115" buttonClass="ox-speed-dial-success" [style]="{ position: 'absolute', top: '32px', left: 'calc(50% - 25px)' }"></ox-speed-dial>
<ox-speed-dial [model]="items" type="semi-circle" direction="left" [radius]="115" buttonClass="ox-speed-dial-success" [style]="{ position: 'absolute', right: '32px', top: 'calc(50% - 25px)' }"></ox-speed-dial>
<ox-speed-dial [model]="items" type="semi-circle" direction="up" [radius]="115" buttonClass="ox-speed-dial-success" [style]="{ position: 'absolute', bottom: '32px', left: 'calc(50% - 25px)' }"></ox-speed-dial>
<ox-speed-dial [model]="items" type="semi-circle" direction="right" [radius]="115" buttonClass="ox-speed-dial-success" [style]="{ position: 'absolute', left: '32px', top: 'calc(50% - 25px)' }"></ox-speed-dial>`;

  quarterCircleHtml = `<ox-speed-dial [model]="items" type="quarter-circle" direction="down-right" [radius]="130" [style]="{ position: 'absolute', top: '32px', left: '32px' }"></ox-speed-dial>
<ox-speed-dial [model]="items" type="quarter-circle" direction="down-left" [radius]="130" [style]="{ position: 'absolute', top: '32px', right: '32px' }"></ox-speed-dial>
<ox-speed-dial [model]="items" type="quarter-circle" direction="up-right" [radius]="130" [style]="{ position: 'absolute', bottom: '32px', left: '32px' }"></ox-speed-dial>
<ox-speed-dial [model]="items" type="quarter-circle" direction="up-left" [radius]="130" [style]="{ position: 'absolute', bottom: '32px', right: '32px' }"></ox-speed-dial>`;

  labelsHtml = `<ox-speed-dial 
  [model]="crudItems" 
  direction="up" 
  [showLabels]="true"
  buttonClass="ox-speed-dial-primary">
</ox-speed-dial>`;

  maskHtml = `<ox-speed-dial 
  [model]="items" 
  type="circle"
  [radius]="110"
  [mask]="true"
  buttonClass="ox-speed-dial-danger">
</ox-speed-dial>`;

  speedDialTs = `items: SpeedDialItem[] = [
  { icon: 'share-2', tooltip: 'Compartir', command: () => this.toast.add(...) },
  { icon: 'upload', tooltip: 'Subir', command: () => this.toast.add(...) },
  { icon: 'trash-2', tooltip: 'Eliminar', command: () => this.toast.add(...) },
  { icon: 'refresh-cw', tooltip: 'Actualizar', command: () => this.toast.add(...) },
  { icon: 'edit-2', tooltip: 'Editar', command: () => this.toast.add(...) }
];`;

  speedDialProps: ApiProperty[] = [
    {
      name: 'model',
      type: 'SpeedDialItem[]',
      default: '[]',
      description: 'Colección de elementos y acciones del SpeedDial.'
    },
    {
      name: 'type',
      type: `'linear' | 'circle' | 'semi-circle' | 'quarter-circle'`,
      default: `'linear'`,
      description: 'Tipo de despliegue geométrico de los botones secundarios.'
    },
    {
      name: 'direction',
      type: `'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right'`,
      default: `'up'`,
      description: 'Dirección de despliegue de las acciones flotantes.'
    },
    {
      name: 'radius',
      type: 'number',
      default: '100',
      description: 'Radio en píxeles para el despliegue radial (circle, semi-circle, quarter-circle).'
    },
    {
      name: 'showLabels',
      type: 'boolean',
      default: 'false',
      description: 'Muestra etiquetas flotantes fijas al lado de cada botón de acción.'
    },
    {
      name: 'mask',
      type: 'boolean',
      default: 'false',
      description: 'Muestra una máscara translúcida de fondo con desenfoque (backdrop blur).'
    },
    {
      name: 'buttonClass',
      type: 'string',
      default: `''`,
      description: 'Clase CSS adicional para el botón FAB principal (ej. ox-speed-dial-orange, ox-speed-dial-success, ox-speed-dial-primary).'
    },
    {
      name: 'style',
      type: 'Record<string, any>',
      default: 'undefined',
      description: 'Estilos inline aplicados directamente al host del SpeedDial.'
    },
    {
      name: 'rotateAnimation',
      type: 'boolean',
      default: 'true',
      description: 'Aplica una rotación suave de 45° al icono del botón principal al abrirse.'
    },
    {
      name: 'hideOnClickOutside',
      type: 'boolean',
      default: 'true',
      description: 'Cierra automáticamente el menú al hacer clic fuera del componente.'
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
    },
    {
      name: 'onClick',
      parameters: 'MouseEvent',
      description: 'Emitido al hacer clic sobre el botón flotante principal.'
    }
  ];
}
