import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-knob-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, KnobComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Knob (Selector Circular)</h1>
      <p class="ox-description">Control circular táctil y giratorio para ajustar valores numéricos con dial interactivo.</p>

      <!-- 1. BÁSICO -->
      <app-doc-code
        title="1. Uso Básico y Unidades"
        description="Dial circular con etiqueta de unidad (°C) y vinculación ngModel."
        [html]="basicHtml"
        [ts]="knobTs">
        <div style="display: flex; flex-direction: column; align-items: center;">
          <ox-knob [(ngModel)]="value" label="Temperatura" unit="°C"></ox-knob>
          <p style="margin-top: 0.75rem; font-size: 0.875rem; color: #475569;">Valor actual: <b>{{ value }}°C</b></p>
        </div>
      </app-doc-code>

      <!-- 2. VARIANTES -->
      <app-doc-code
        title="2. Variantes Visuales y Colores"
        description="Estilos: Default, Flat y Outline con colores de trazo personalizados."
        [html]="variantsHtml"
        [ts]="knobTs">
        <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
          <ox-knob 
            [(ngModel)]="value3" 
            valueColor="#8b5cf6" 
            rangeColor="#ddd6fe" 
            label="Violeta"
            [strokeWidth]="12">
          </ox-knob>
          <ox-knob 
            [(ngModel)]="value3" 
            valueColor="#f43f5e" 
            rangeColor="#fff1f2" 
            variant="flat"
            label="Rosa Flat"
            [strokeWidth]="6">
          </ox-knob>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: KnobComponent"
        [properties]="knobProps"
        [events]="knobEvents">
      </app-doc-api-table>
    </div>
  `
})
export class KnobDemoComponent {
  value = 24;
  value3 = 65;

  basicHtml = `<ox-knob 
  [(ngModel)]="value" 
  label="Temperatura" 
  unit="°C">
</ox-knob>`;

  variantsHtml = `<ox-knob 
  [(ngModel)]="value" 
  valueColor="#8b5cf6" 
  rangeColor="#ddd6fe" 
  label="Violeta"
  [strokeWidth]="12">
</ox-knob>`;

  knobTs = `import { Component } from '@angular/core';
import { KnobComponent } from 'oxygen-ui';

@Component({
  selector: 'app-my-knob',
  standalone: true,
  imports: [KnobComponent],
  templateUrl: './my-knob.component.html'
})
export class MyKnobComponent {
  value = 24;
}`;

  knobProps: ApiProperty[] = [
    {
      name: 'min',
      type: 'number',
      default: '0',
      description: 'Valor mínimo del dial.'
    },
    {
      name: 'max',
      type: 'number',
      default: '100',
      description: 'Valor máximo del dial.'
    },
    {
      name: 'step',
      type: 'number',
      default: '1',
      description: 'Paso de incremento numérico.'
    },
    {
      name: 'unit',
      type: 'string',
      default: "''",
      description: 'Texto de la unidad mostrada junto al número (ej: °C, %, W).'
    },
    {
      name: 'valueColor',
      type: 'string',
      default: "'var(--primary-color)'",
      description: 'Color del arco de progreso activo.'
    }
  ];

  knobEvents: ApiEvent[] = [
    {
      name: 'onChange',
      parameters: 'number',
      description: 'Emitido cuando el valor del dial cambia.'
    }
  ];
}
