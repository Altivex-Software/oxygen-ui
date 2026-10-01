import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-alert-demo',
  standalone: true,
  imports: [CommonModule, AlertComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Alert (Mensajes de Alerta)</h1>
      <p class="ox-description">Banners contextuales para comunicar mensajes informativos, de éxito, advertencia o error en la interfaz.</p>

      <!-- 1. SEVERIDADES -->
      <app-doc-code
        title="1. Severidades Contextuales"
        description="Alertas de tipo Info, Success, Warn y Error con título y cuerpo."
        [html]="basicHtml"
        [ts]="alertTs">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <ox-alert severity="info" title="Información">
            Este es un mensaje informativo para el usuario.
          </ox-alert>
          <ox-alert severity="success" title="Operación Exitosa">
            ¡La acción se procesó y guardó correctamente!
          </ox-alert>
          <ox-alert severity="warn" title="Advertencia">
            Por favor verifica tus datos antes de continuar.
          </ox-alert>
          <ox-alert severity="error" title="Error">
            Ha ocurrido un problema al conectar con el servidor.
          </ox-alert>
        </div>
      </app-doc-code>

      <!-- 2. VARIANTES Y CLOSABLE -->
      <app-doc-code
        title="2. Variantes de Estilo y Cierre (Closable)"
        description="Estilos: Standard, Filled, Outlined y Glass con botón de descarte."
        [html]="variantsHtml"
        [ts]="alertTs">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <ox-alert variant="filled" severity="info" [closable]="true">
            Variante Filled con fondo sólido y botón de cierre.
          </ox-alert>
          
          <ox-alert variant="outlined" severity="success" [closable]="true">
            Variante Outlined con borde de realce.
          </ox-alert>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: AlertComponent"
        [properties]="alertProps"
        [events]="alertEvents">
      </app-doc-api-table>
    </div>
  `
})
export class AlertDemoComponent {
  basicHtml = `<ox-alert severity="info" title="Información">
  Mensaje informativo para el usuario.
</ox-alert>
<ox-alert severity="success" title="Éxito">
  ¡Operación completada exitosamente!
</ox-alert>`;

  variantsHtml = `<ox-alert variant="filled" severity="info" [closable]="true">
  Alerta rellena con botón de cierre.
</ox-alert>`;

  alertTs = `import { Component } from '@angular/core';
import { AlertComponent } from 'oxygen-ui';

@Component({
  selector: 'app-my-alert',
  standalone: true,
  imports: [AlertComponent],
  templateUrl: './my-alert.component.html'
})
export class MyAlertComponent {}`;

  alertProps: ApiProperty[] = [
    {
      name: 'severity',
      type: "'info' | 'success' | 'warn' | 'error'",
      default: "'info'",
      description: 'Nivel contextual y color de la alerta.'
    },
    {
      name: 'title',
      type: 'string',
      default: "''",
      description: 'Título en negrita en la cabecera de la alerta.'
    },
    {
      name: 'variant',
      type: "'standard' | 'filled' | 'outlined' | 'glass'",
      default: "'standard'",
      description: 'Estilo visual de la superficie de la alerta.'
    },
    {
      name: 'closable',
      type: 'boolean',
      default: 'false',
      description: 'Muestra un botón de cierre (X) para descartar la alerta.'
    }
  ];

  alertEvents: ApiEvent[] = [
    {
      name: 'onClose',
      parameters: 'void',
      description: 'Emitido cuando el usuario hace clic en el botón de descarte.'
    }
  ];
}