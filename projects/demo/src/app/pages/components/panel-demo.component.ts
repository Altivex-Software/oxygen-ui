import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent, FieldsetComponent, DividerComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-panel-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PanelComponent, 
    FieldsetComponent, 
    DividerComponent,
    DocCodeComponent,
    DocApiTableComponent
  ],
  template: `
    <div class="ox-page-container">
      <h1>Panel & Containers</h1>
      <p class="ox-description">Contenedores estructurados para organizar el contenido de la aplicación con soporte para colapso, variantes y divisiones.</p>

      <!-- 1. PANEL -->
      <app-doc-code
        title="1. Panel Colapsable"
        description="Panel con cabecera y botón de alternancia para expandir o contraer contenido."
        [html]="panelHtml"
        [ts]="panelTs">
        <ox-panel header="Ajustes de Cuenta" [toggleable]="true">
          <p style="margin: 0; color: #475569;">
            Los paneles pueden tener cabecera y ser colapsables para ahorrar espacio en interfaces con mucha información.
          </p>
        </ox-panel>
      </app-doc-code>

      <!-- 2. FIELDSET -->
      <app-doc-code
        title="2. Fieldset"
        description="Ideal para agrupar campos relacionados en formularios con leyenda interactiva."
        [html]="fieldsetHtml"
        [ts]="panelTs">
        <ox-fieldset legend="Información Personal" [toggleable]="true">
          <p style="margin: 0; color: #475569;">
            El fieldset permite estructurar visualmente bloques lógicos dentro de formularios extensos.
          </p>
        </ox-fieldset>
      </app-doc-code>

      <!-- 3. DIVIDER -->
      <app-doc-code
        title="3. Divider"
        description="Separador visual horizontal con alineación de texto central o lateral."
        [html]="dividerHtml"
        [ts]="panelTs">
        <div>
          <p style="margin: 0; color: #475569;">Sección Superior de la Información</p>
          <ox-divider align="center">O CONTINÚA CON</ox-divider>
          <p style="margin: 0; color: #475569;">Sección Inferior de la Información</p>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: PanelComponent"
        [properties]="panelProps"
        [events]="panelEvents">
      </app-doc-api-table>
    </div>
  `
})
export class PanelDemoComponent {
  panelHtml = `<ox-panel header="Ajustes de Cuenta" [toggleable]="true">
  <p>Contenido del panel colapsable.</p>
</ox-panel>`;

  fieldsetHtml = `<ox-fieldset legend="Información Personal" [toggleable]="true">
  <p>Agrupador de campos de formulario.</p>
</ox-fieldset>`;

  dividerHtml = `<p>Texto superior</p>
<ox-divider align="center">CONCEPTO</ox-divider>
<p>Texto inferior</p>`;

  panelTs = `import { Component } from '@angular/core';
import { PanelComponent, FieldsetComponent, DividerComponent } from 'oxygen-ui';

@Component({
  selector: 'app-my-panel-demo',
  standalone: true,
  imports: [PanelComponent, FieldsetComponent, DividerComponent],
  templateUrl: './my-panel-demo.component.html'
})
export class MyPanelDemoComponent {}`;

  panelProps: ApiProperty[] = [
    {
      name: 'header',
      type: 'string',
      default: "''",
      description: 'Título o encabezado que se muestra en la barra superior del panel.'
    },
    {
      name: 'toggleable',
      type: 'boolean',
      default: 'false',
      description: 'Permite colapsar o expandir el contenido del panel haciendo clic en el icono.'
    },
    {
      name: 'collapsed',
      type: 'boolean',
      default: 'false',
      description: 'Define si el panel inicia en estado colapsado (two-way binding).'
    },
    {
      name: 'variant',
      type: "'outlined' | 'flat' | 'seamless'",
      default: "'outlined'",
      description: 'Estilo visual del contenedor y los bordes del panel.'
    },
    {
      name: 'boxShadow',
      type: "'none' | 'sm' | 'md' | 'lg'",
      default: "'none'",
      description: 'Sombra perimetral del panel.'
    }
  ];

  panelEvents: ApiEvent[] = [
    {
      name: 'collapsedChange',
      parameters: 'boolean',
      description: 'Emitido cuando el usuario colapsa o expande el panel.'
    }
  ];
}