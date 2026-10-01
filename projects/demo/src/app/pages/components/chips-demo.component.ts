import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChipsComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-chips-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ChipsComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Chips / Tags</h1>
      <p class="ox-description">
        Componente para ingresar múltiples valores como etiquetas, ideal para tags, correos, palabras clave o filtros.
      </p>

      <!-- 1. BÁSICO -->
      <app-doc-code
        title="1. Uso Básico"
        description="Escribe texto y presiona Enter o coma para agregar un chip. Usa Backspace para remover el último."
        [html]="basicHtml"
        [ts]="basicTs">
        <div style="max-width: 480px;">
          <ox-chips 
            [(ngModel)]="skills" 
            placeholder="Escribe tecnologías (ej: Angular, TypeScript, SCSS)">
          </ox-chips>

          <div style="margin-top: 0.75rem; font-size: 0.875rem; color: #475569;">
            <strong>Valores actuales:</strong> {{ skills | json }}
          </div>
        </div>
      </app-doc-code>

      <!-- 2. LÍMITE Y DUPLICADOS -->
      <app-doc-code
        title="2. Límite Máximo (Max 4) y Sin Duplicados"
        description="Restringe la cantidad máxima de chips y previene entradas duplicadas automáticamente."
        [html]="limitHtml"
        [ts]="limitTs">
        <div style="max-width: 480px;">
          <ox-chips 
            [(ngModel)]="categories" 
            [max]="4"
            [allowDuplicate]="false"
            placeholder="Máximo 4 categorías...">
          </ox-chips>

          <div style="margin-top: 0.75rem; font-size: 0.875rem; color: #475569;">
            <strong>Chips ({{ categories.length }}/4):</strong> {{ categories | json }}
          </div>
        </div>
      </app-doc-code>

      <!-- 3. DESHABILITADO -->
      <app-doc-code
        title="3. Estado Deshabilitado"
        description="Chips en modo sólo lectura cuando el formulario está bloqueado."
        [html]="disabledHtml"
        [ts]="disabledTs">
        <div style="max-width: 480px;">
          <ox-chips 
            [ngModel]="['Read Only', 'Protected Tag', 'System Tag']" 
            [disabled]="true">
          </ox-chips>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: ChipsComponent"
        [properties]="chipsProps"
        [events]="chipsEvents">
      </app-doc-api-table>
    </div>
  `
})
export class ChipsDemoComponent {
  skills = ['Angular', 'TypeScript', 'RxJS'];
  categories = ['Frontend', 'UI Design'];

  basicHtml = `<ox-chips 
  [(ngModel)]="skills" 
  placeholder="Escribe tecnologías (ej: Angular, TypeScript)">
</ox-chips>`;

  basicTs = `skills = ['Angular', 'TypeScript', 'RxJS'];`;

  limitHtml = `<ox-chips 
  [(ngModel)]="categories" 
  [max]="4"
  [allowDuplicate]="false"
  placeholder="Máximo 4 categorías...">
</ox-chips>`;

  limitTs = `categories = ['Frontend', 'UI Design'];`;

  disabledHtml = `<ox-chips 
  [ngModel]="['Read Only', 'Protected Tag']" 
  [disabled]="true">
</ox-chips>`;

  disabledTs = `// Componente en modo solo lectura con disabled=true`;

  chipsProps: ApiProperty[] = [
    {
      name: 'placeholder',
      type: 'string',
      default: "'Add tags...'",
      description: 'Texto de ayuda cuando no hay etiquetas ingresadas.'
    },
    {
      name: 'max',
      type: 'number | null',
      default: 'null',
      description: 'Cantidad máxima de chips permitidos.'
    },
    {
      name: 'allowDuplicate',
      type: 'boolean',
      default: 'false',
      description: 'Permite o bloquea valores repetidos en la lista.'
    },
    {
      name: 'separator',
      type: 'string',
      default: "','",
      description: 'Carácter delimitador para crear un nuevo chip (además de Enter).'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Bloquea la entrada de texto y remoción de chips.'
    }
  ];

  chipsEvents: ApiEvent[] = [
    {
      name: 'chipAdded',
      parameters: 'string',
      description: 'Emitido cuando se agrega exitosamente un chip.'
    },
    {
      name: 'chipRemoved',
      parameters: '{ chip: string, index: number }',
      description: 'Emitido cuando se elimina un chip existente.'
    },
    {
      name: 'chipClicked',
      parameters: '{ chip: string, index: number }',
      description: 'Emitido al hacer clic sobre una etiqueta.'
    }
  ];
}
