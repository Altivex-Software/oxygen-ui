import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent, ButtonComponent } from 'valence-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-toolbar-demo',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, ButtonComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="val-page-container">
      <h1>Toolbar (Barra de Herramientas)</h1>
      <p class="val-description">Agrupa y organiza controles y botones de acción horizontalmente con secciones izquierda y derecha.</p>

      <!-- 1. BÁSICO -->
      <app-doc-code
        title="1. Barra Estándar con Secciones Izquierda y Derecha"
        description="Agrupación de botones principales y acciones de exportación."
        [html]="basicHtml"
        [ts]="toolbarTs">
        <val-toolbar>
          <div left style="display: flex; gap: 0.5rem;">
            <val-button variant="success" icon="plus">Nuevo</val-button>
            <val-button variant="secondary" icon="folder">Abrir</val-button>
            <val-button variant="danger" icon="trash-2">Eliminar</val-button>
          </div>
          
          <div right>
            <val-button variant="outline-primary" icon="download">Exportar</val-button>
          </div>
        </val-toolbar>
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
  basicHtml = `<val-toolbar>
  <div left>
    <val-button variant="success">Nuevo</val-button>
    <val-button variant="secondary">Abrir</val-button>
  </div>
  <div right>
    <val-button variant="outline-primary">Exportar</val-button>
  </div>
</val-toolbar>`;

  toolbarTs = `import { Component } from '@angular/core';
import { ToolbarComponent, ButtonComponent } from 'valence-ui';

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