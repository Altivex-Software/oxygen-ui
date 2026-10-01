import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ButtonComponent, ToastComponent, ToastPosition } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-toast-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ToastComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <ox-toast></ox-toast>

      <h1>Toast (Notificaciones Emergentes)</h1>
      <p class="ox-description">Servicio y componente para mensajes de notificación temporales o persistentes en pantalla.</p>

      <!-- 1. SEVERIDADES Y ESTILOS -->
      <app-doc-code
        title="1. Severidades y Variantes"
        description="Notificaciones de tipo Success, Info, Warning y Error con variantes Standard, Filled y Outlined."
        [html]="toastHtml"
        [ts]="toastTs">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <span style="display: block; font-size: 0.8125rem; font-weight: 600; margin-bottom: 0.5rem; color: #64748b;">Standard</span>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <ox-button label="Success" variant="success" (onClick)="show('success', 'Completado', 'La tarea se guardó con éxito')"></ox-button>
              <ox-button label="Info" variant="info" (onClick)="show('info', 'Información', 'Tienes un mensaje nuevo')"></ox-button>
            </div>
          </div>

          <div>
            <span style="display: block; font-size: 0.8125rem; font-weight: 600; margin-bottom: 0.5rem; color: #64748b;">Filled</span>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <ox-button label="Success Filled" variant="success" (onClick)="show('success', 'Completado', 'La tarea se guardó con éxito', 'filled')"></ox-button>
              <ox-button label="Warning Filled" variant="warning" (onClick)="show('warn', 'Aviso', 'Cuidado con esta acción', 'filled')"></ox-button>
              <ox-button label="Error Filled" variant="danger" (onClick)="show('error', 'Error', 'Algo salió mal', 'filled')"></ox-button>
            </div>
          </div>
        </div>
      </app-doc-code>

      <!-- 2. POSICIONES -->
      <app-doc-code
        title="2. Posicionamiento en Pantalla"
        description="Configura la esquina o posición central donde emergen los mensajes."
        [html]="posHtml"
        [ts]="toastTs">
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          <ox-button label="Top Left" variant="secondary" (onClick)="changePos('top-left')"></ox-button>
          <ox-button label="Top Center" variant="secondary" (onClick)="changePos('top-center')"></ox-button>
          <ox-button label="Top Right" variant="secondary" (onClick)="changePos('top-right')"></ox-button>
          <ox-button label="Bottom Left" variant="secondary" (onClick)="changePos('bottom-left')"></ox-button>
          <ox-button label="Bottom Center" variant="secondary" (onClick)="changePos('bottom-center')"></ox-button>
          <ox-button label="Bottom Right" variant="secondary" (onClick)="changePos('bottom-right')"></ox-button>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: ToastService & ToastComponent"
        [properties]="toastProps"
        [events]="toastEvents">
      </app-doc-api-table>
    </div>
  `
})
export class ToastDemoComponent {
  private toastService = inject(ToastService);

  show(severity: any, summary: string, detail: string, variant: 'filled' | 'outlined' | 'standard' = 'standard') {
    this.toastService.add({
      severity,
      summary,
      detail,
      variant
    });
  }

  changePos(pos: ToastPosition) {
    this.toastService.setPosition(pos);
    this.show('info', 'Posición Actualizada', `Toasts ahora en ${pos}`);
  }

  toastHtml = `<ox-toast></ox-toast>
<ox-button label="Guardar" (onClick)="showToast()"></ox-button>`;

  toastTs = `import { Component, inject } from '@angular/core';
import { ToastService, ToastComponent, ButtonComponent } from 'oxygen-ui';

@Component({
  selector: 'app-my-toast',
  standalone: true,
  imports: [ToastComponent, ButtonComponent],
  templateUrl: './my-toast.component.html'
})
export class MyToastComponent {
  private toastService = inject(ToastService);

  showToast() {
    this.toastService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Operación completada con éxito'
    });
  }
}`;

  posHtml = `this.toastService.setPosition('top-right');`;

  toastProps: ApiProperty[] = [
    {
      name: 'severity',
      type: "'success' | 'info' | 'warn' | 'error' | 'secondary'",
      default: "'info'",
      description: 'Nivel semántico y color del mensaje toast.'
    },
    {
      name: 'summary',
      type: 'string',
      default: "''",
      description: 'Título o encabezado breve del mensaje.'
    },
    {
      name: 'detail',
      type: 'string',
      default: "''",
      description: 'Cuerpo o texto descriptivo del mensaje.'
    },
    {
      name: 'life',
      type: 'number',
      default: '3000',
      description: 'Tiempo en milisegundos antes de que el mensaje desaparezca.'
    },
    {
      name: 'sticky',
      type: 'boolean',
      default: 'false',
      description: 'Si es true, el mensaje no desaparece automáticamente hasta que el usuario lo cierre.'
    }
  ];

  toastEvents: ApiEvent[] = [
    {
      name: 'onClose',
      parameters: 'ToastMessage',
      description: 'Invocado al cerrarse una notificación.'
    }
  ];
}