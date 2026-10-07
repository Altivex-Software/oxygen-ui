import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent, ButtonComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-toolbar-demo',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, ButtonComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Toolbar (Barra de Herramientas)</h1>
      <p class="ox-description">Agrupa y organiza controles y botones de acción horizontalmente con secciones izquierda y derecha.</p>

      <!-- 1. BÁSICO -->
      <app-doc-code
        title="1. Barra Estándar con Secciones Izquierda y Derecha"
        description="Agrupación de botones principales y acciones de exportación."
        [html]="basicHtml"
        [ts]="toolbarTs">
        <ox-toolbar>
          <div left style="display: flex; gap: 0.5rem;">
            <ox-button variant="success" icon="plus">Nuevo</ox-button>
            <ox-button variant="secondary" icon="folder">Abrir</ox-button>
            <ox-button variant="danger" icon="trash-2">Eliminar</ox-button>
          </div>
          
          <div right>
            <ox-button variant="outline-primary" icon="download">Exportar</ox-button>
          </div>
        </ox-toolbar>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: ToolbarComponent"
        [properties]="toolbarProps">
      </app-doc-api-table>
    </div>
  `
})
export class ToolbarDemoComponent {
  basicHtml = `<ox-toolbar>
  <div left>
    <ox-button variant="success">Nuevo</ox-button>
    <ox-button variant="secondary">Abrir</ox-button>
  </div>
  <div right>
    <ox-button variant="outline-primary">Exportar</ox-button>
  </div>
</ox-toolbar>`;

  toolbarTs = `import { Component } from '@angular/core';
import { ToolbarComponent, ButtonComponent } from 'oxygen-ui';

@Component({
  selector: 'app-my-toolbar',
  standalone: true,
  imports: [ToolbarComponent, ButtonComponent],
  templateUrl: './my-toolbar.component.html'
})
export class MyToolbarComponent {}`;

  toolbarProps: ApiProperty[] = [
    {
      name: 'color',
      type: "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'transparent'",
      default: "'transparent'",
      description: 'Color de fondo o realce de la barra de herramientas.'
    }
  ];
}