import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateInputComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-date-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, DateInputComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Date Input</h1>
      <p class="ox-description">
        Campo de selección de fecha nativo optimizado con compatibilidad para validación de rangos (min/max), etiquetas flotantes y variantes de estilo.
      </p>

      <!-- 1. BÁSICO -->
      <app-doc-code 
        title="1. Uso Básico y Límites"
        description="Selector de fechas con validación de rango mínimo y máximo."
        [htmlCode]="dateHtml"
        [tsCode]="dateTs">
        <div style="max-width: 400px; width: 100%; display: flex; flex-direction: column; gap: 1rem;">
          <ox-date-input label="Fecha de Nacimiento"></ox-date-input>
          <ox-date-input label="Rango Válido (2024-2026)" min="2024-01-01" max="2026-12-31"></ox-date-input>
        </div>
      </app-doc-code>

      <!-- 2. FLOAT LABELS Y VARIANTES -->
      <app-doc-code 
        title="2. Variantes y Float Labels"
        description="Estilos fieldset, outline y animación de etiqueta flotante."
        [htmlCode]="dateHtml"
        [tsCode]="dateTs">
        <div style="max-width: 400px; width: 100%; display: flex; flex-direction: column; gap: 1.5rem;">
          <ox-date-input 
            label="Default Float" 
            [floatLabel]="true" 
            variant="default">
          </ox-date-input>
          
          <ox-date-input 
            label="Fieldset Float" 
            [floatLabel]="true" 
            variant="fieldset">
          </ox-date-input>

          <ox-date-input 
            label="One Line Float" 
            [floatLabel]="true" 
            variant="oneLine">
          </ox-date-input>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: DateInputComponent"
        [properties]="dateProperties">
      </app-doc-api-table>
    </div>
  `
})
export class DateDemoComponent {
  dateHtml = `<ox-date-input label="Fecha de Nacimiento"></ox-date-input>
<ox-date-input label="Con Límites" min="2024-01-01" max="2026-12-31"></ox-date-input>
<ox-date-input label="Fieldset Float" [floatLabel]="true" variant="fieldset"></ox-date-input>`;

  dateTs = `import { Component } from '@angular/core';
import { DateInputComponent } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [DateInputComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {}`;

  dateProperties: ApiProperty[] = [
    { name: 'label', type: 'string', default: "''", description: 'Etiqueta descriptiva del campo de fecha.' },
    { name: 'min', type: 'string', default: "''", description: 'Fecha mínima permitida en formato YYYY-MM-DD.' },
    { name: 'max', type: 'string', default: "''", description: 'Fecha máxima permitida en formato YYYY-MM-DD.' },
    { name: 'floatLabel', type: 'boolean', default: 'false', description: 'Activa la animación de etiqueta flotante al interactuar.' },
    { name: 'variant', type: "'default' | 'filled' | 'outlined' | 'fieldset' | 'oneLine'", default: "'default'", description: 'Estilo visual del contenedor.' }
  ];
}
