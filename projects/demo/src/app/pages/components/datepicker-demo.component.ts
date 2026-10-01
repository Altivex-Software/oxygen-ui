import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-datepicker-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePickerComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>DatePicker (Selector de Fecha)</h1>
      <p class="ox-description">Selector de fecha avanzado con calendario visual desplegable, formatos personalizables y etiquetas flotantes.</p>

      <!-- 1. BÁSICO -->
      <app-doc-code
        title="1. Uso Básico"
        description="Selector de fecha con apertura de calendario interactivo."
        [html]="basicHtml"
        [ts]="datePickerTs">
        <div class="demo-grid">
          <ox-date-picker label="Seleccionar Fecha"></ox-date-picker>
          <ox-date-picker label="Con Placeholder" placeholder="DD/MM/YYYY"></ox-date-picker>
        </div>
      </app-doc-code>

      <!-- 2. FLOAT LABEL & VARIANTES -->
      <app-doc-code
        title="2. Float Labels y Variantes"
        description="Estilos Standard, Fieldset y One Line con etiqueta flotante."
        [html]="variantsHtml"
        [ts]="datePickerTs">
        <div class="demo-grid">
          <ox-date-picker label="Default Float" [floatLabel]="true" variant="default"></ox-date-picker>
          <ox-date-picker label="Fieldset Float" [floatLabel]="true" variant="fieldset"></ox-date-picker>
        </div>
      </app-doc-code>

      <!-- 3. FORMATOS -->
      <app-doc-code
        title="3. Formatos de Fecha Personalizados"
        description="Formatos ISO (YYYY-MM-DD) o tradicionales (DD/MM/YYYY)."
        [html]="formatHtml"
        [ts]="datePickerTs">
        <div class="demo-grid">
          <ox-date-picker label="Formato ISO" format="YYYY-MM-DD" placeholder="YYYY-MM-DD"></ox-date-picker>
          <ox-date-picker label="Formato Estándar" format="DD/MM/YYYY" placeholder="DD/MM/YYYY"></ox-date-picker>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: DatePickerComponent"
        [properties]="datePickerProps"
        [events]="datePickerEvents">
      </app-doc-api-table>
    </div>
  `,
  styles: [`
    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
    }
  `]
})
export class DatePickerDemoComponent {
  basicHtml = `<ox-date-picker label="Fecha de Nacimiento"></ox-date-picker>`;
  variantsHtml = `<ox-date-picker label="Fieldset" [floatLabel]="true" variant="fieldset"></ox-date-picker>`;
  formatHtml = `<ox-date-picker format="YYYY-MM-DD" placeholder="YYYY-MM-DD"></ox-date-picker>`;

  datePickerTs = `import { Component } from '@angular/core';
import { DatePickerComponent } from 'oxygen-ui';

@Component({
  selector: 'app-my-datepicker',
  standalone: true,
  imports: [DatePickerComponent],
  templateUrl: './my-datepicker.component.html'
})
export class MyDatePickerComponent {}`;

  datePickerProps: ApiProperty[] = [
    {
      name: 'label',
      type: 'string',
      default: "''",
      description: 'Etiqueta del selector de fecha.'
    },
    {
      name: 'format',
      type: 'string',
      default: "'DD/MM/YYYY'",
      description: 'Patrón de formateo de la fecha (ej: YYYY-MM-DD).'
    },
    {
      name: 'variant',
      type: "'default' | 'fieldset' | 'oneLine'",
      default: "'default'",
      description: 'Variante de diseño visual.'
    },
    {
      name: 'floatLabel',
      type: 'boolean',
      default: 'false',
      description: 'Habilita etiqueta flotante dinámica.'
    }
  ];

  datePickerEvents: ApiEvent[] = [
    {
      name: 'onSelect',
      parameters: 'Date',
      description: 'Emitido cuando el usuario selecciona una fecha en el calendario.'
    }
  ];
}
