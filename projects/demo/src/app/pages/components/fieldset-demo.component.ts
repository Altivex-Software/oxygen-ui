import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsetComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-fieldset-demo',
  standalone: true,
  imports: [CommonModule, FieldsetComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Fieldset</h1>
      <p class="ox-description">Componente agrupador de campos con leyenda integrada y soporte para alternancia colapsable.</p>

      <!-- 1. BÁSICO -->
      <app-doc-code
        title="1. Fieldset Básico"
        description="Agrupador estático con leyenda superior."
        [html]="basicHtml"
        [ts]="fieldsetTs">
        <ox-fieldset legend="Datos de Contacto">
          <p style="margin: 0; color: #475569;">
            Agrupación estándar para organizar entradas relacionadas dentro de un formulario.
          </p>
        </ox-fieldset>
      </app-doc-code>

      <!-- 2. TOGGLEABLE -->
      <app-doc-code
        title="2. Fieldset Colapsable (Toggleable)"
        description="Permite al usuario contraer o expandir la sección haciendo clic en la leyenda."
        [html]="toggleHtml"
        [ts]="fieldsetTs">
        <ox-fieldset legend="Ajustes Avanzados" [toggleable]="true">
          <p style="margin: 0; color: #475569;">
            Esta sección puede colapsarse para mantener limpia la interfaz principal.
          </p>
        </ox-fieldset>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: FieldsetComponent"
        [properties]="fieldsetProps"
        [events]="fieldsetEvents">
      </app-doc-api-table>
    </div>
  `
})
export class FieldsetDemoComponent {
  basicHtml = `<ox-fieldset legend="Datos de Contacto">
  <p>Contenido agrupado del formulario.</p>
</ox-fieldset>`;

  toggleHtml = `<ox-fieldset legend="Ajustes Avanzados" [toggleable]="true">
  <p>Contenido colapsable del fieldset.</p>
</ox-fieldset>`;

  fieldsetTs = `import { Component } from '@angular/core';
import { FieldsetComponent } from 'oxygen-ui';

@Component({
  selector: 'app-my-fieldset',
  standalone: true,
  imports: [FieldsetComponent],
  templateUrl: './my-fieldset.component.html'
})
export class MyFieldsetComponent {}`;

  fieldsetProps: ApiProperty[] = [
    {
      name: 'legend',
      type: 'string',
      default: "''",
      description: 'Texto de la leyenda del fieldset.'
    },
    {
      name: 'toggleable',
      type: 'boolean',
      default: 'false',
      description: 'Permite contraer o expandir el contenido al hacer clic.'
    },
    {
      name: 'collapsed',
      type: 'boolean',
      default: 'false',
      description: 'Estado actual de colapso del fieldset.'
    }
  ];

  fieldsetEvents: ApiEvent[] = [
    {
      name: 'collapsedChange',
      parameters: 'boolean',
      description: 'Emitido cuando el usuario colapsa o expande el fieldset.'
    }
  ];
}
