import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectButtonComponent, ToggleButtonComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-select-button-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectButtonComponent, ToggleButtonComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>SelectButton & ToggleButton</h1>
      <p class="ox-description">
        Controles de selección estilizados en botones interactivos para selecciones individuales, múltiples o interruptores booleanos.
      </p>

      <!-- 1. SELECT BUTTON SIMPLE -->
      <app-doc-code
        title="1. SelectButton (Selección Única)"
        description="Alternativa moderna a los radio buttons tradicionales con soporte de iconos."
        [html]="singleHtml"
        [ts]="selectTs">
        <div style="max-width: 600px;">
          <ox-select-button 
            [options]="paymentOptions" 
            [(ngModel)]="selectedPayment"
            optionLabel="label"
            optionValue="value">
          </ox-select-button>

          <div style="margin-top: 1rem; font-size: 0.875rem; color: #475569;">
            <strong>Método seleccionado:</strong> {{ selectedPayment || 'Ninguno' }}
          </div>
        </div>
      </app-doc-code>

      <!-- 2. SELECT BUTTON MÚLTIPLE CON ICONOS -->
      <app-doc-code
        title="2. SelectButton (Selección Múltiple)"
        description="Permite seleccionar múltiples opciones al mismo tiempo con la directiva [multiple]='true'."
        [html]="multiHtml"
        [ts]="selectTs">
        <div style="max-width: 600px;">
          <ox-select-button 
            [options]="alignOptions" 
            [(ngModel)]="selectedAlignments"
            [multiple]="true">
          </ox-select-button>

          <div style="margin-top: 1rem; font-size: 0.875rem; color: #475569;">
            <strong>Alineaciones activas:</strong> {{ selectedAlignments | json }}
          </div>
        </div>
      </app-doc-code>

      <!-- 3. TOGGLE BUTTON -->
      <app-doc-code
        title="3. ToggleButton (Interruptor Booleano)"
        description="Botón de dos estados con icono y etiqueta configurables para On y Off."
        [html]="toggleHtml"
        [ts]="selectTs">
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center;">
          <div>
            <ox-toggle-button 
              [(ngModel)]="isNotificationsEnabled"
              onLabel="Notificaciones ON" 
              offLabel="Notificaciones OFF"
              onIcon="bell"
              offIcon="bell-off">
            </ox-toggle-button>
            <div style="margin-top: 0.5rem; font-size: 0.8125rem; color: #64748b;">
              Estado: {{ isNotificationsEnabled }}
            </div>
          </div>

          <div>
            <ox-toggle-button 
              [(ngModel)]="isFavorite"
              onLabel="Favorito" 
              offLabel="Añadir a Favoritos"
              onIcon="heart"
              offIcon="heart">
            </ox-toggle-button>
            <div style="margin-top: 0.5rem; font-size: 0.8125rem; color: #64748b;">
              Estado: {{ isFavorite }}
            </div>
          </div>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: SelectButton & ToggleButton"
        [properties]="selectProps"
        [events]="selectEvents">
      </app-doc-api-table>
    </div>
  `
})
export class SelectButtonDemoComponent {
  selectedPayment = 'credit_card';
  paymentOptions = [
    { label: 'Tarjeta de Crédito', value: 'credit_card', icon: 'credit-card' },
    { label: 'PayPal', value: 'paypal', icon: 'dollar-sign' },
    { label: 'Transferencia', value: 'transfer', icon: 'briefcase' }
  ];

  selectedAlignments = ['left', 'bold'];
  alignOptions = [
    { label: 'Izquierda', value: 'left', icon: 'align-left' },
    { label: 'Centro', value: 'center', icon: 'align-center' },
    { label: 'Derecha', value: 'right', icon: 'align-right' },
    { label: 'Negrita', value: 'bold', icon: 'bold' }
  ];

  isNotificationsEnabled = true;
  isFavorite = false;

  singleHtml = `<ox-select-button 
  [options]="paymentOptions" 
  [(ngModel)]="selectedPayment"
  optionLabel="label"
  optionValue="value">
</ox-select-button>`;

  multiHtml = `<ox-select-button 
  [options]="alignOptions" 
  [(ngModel)]="selectedAlignments"
  [multiple]="true">
</ox-select-button>`;

  toggleHtml = `<ox-toggle-button 
  [(ngModel)]="isNotificationsEnabled"
  onLabel="Notificaciones ON" 
  offLabel="Notificaciones OFF"
  onIcon="bell"
  offIcon="bell-off">
</ox-toggle-button>`;

  selectTs = `paymentOptions = [
  { label: 'Tarjeta de Crédito', value: 'credit_card', icon: 'credit-card' },
  { label: 'PayPal', value: 'paypal', icon: 'dollar-sign' }
];
selectedPayment = 'credit_card';`;

  selectProps: ApiProperty[] = [
    {
      name: 'options',
      type: 'SelectButtonOption[] | any[]',
      default: '[]',
      description: 'Arreglo de opciones a renderizar en el grupo de botones.'
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Habilita la selección de múltiples valores simultáneos.'
    },
    {
      name: 'unselectable',
      type: 'boolean',
      default: 'true',
      description: 'Permite deseleccionar la opción activa al hacer clic nuevamente.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Deshabilita todos los botones del control.'
    }
  ];

  selectEvents: ApiEvent[] = [
    {
      name: 'selectionChange',
      parameters: 'any',
      description: 'Emitido cuando la selección del componente cambia.'
    }
  ];
}
