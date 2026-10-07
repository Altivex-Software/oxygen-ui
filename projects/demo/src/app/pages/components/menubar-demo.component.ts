import { Component } from '@angular/core';
import { MenubarComponent, MenuItem } from 'oxygen-ui';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-menubar-demo',
  standalone: true,
  imports: [CommonModule, MenubarComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Menubar</h1>
      <p class="ox-description">
        Barra de navegación horizontal multinivel con soporte para submenús desplegables anidados, iconos y plantillas de contenido final.
      </p>

      <!-- 1. BÁSICO -->
      <app-doc-code 
        title="1. Menú de Navegación Horizontal"
        description="Barra completa con menús multinivel, iconos y acciones."
        [htmlCode]="menubarHtml"
        [tsCode]="menubarTs">
        <div style="width: 100%; min-height: 140px;">
          <ox-menubar [model]="items"></ox-menubar>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: MenubarComponent"
        [properties]="menubarProperties">
      </app-doc-api-table>
    </div>
  `
})
export class MenubarDemoComponent {
  items: MenuItem[] = [
    {
      label: 'Archivo',
      icon: 'file',
      items: [
        { label: 'Nuevo', icon: 'plus' },
        { label: 'Abrir', icon: 'folder' },
        { separator: true },
        { label: 'Exportar', icon: 'upload' }
      ]
    },
    {
      label: 'Editar',
      icon: 'pencil',
      items: [
        { label: 'Deshacer', icon: 'rotate-ccw' },
        { label: 'Rehacer', icon: 'refresh' }
      ]
    },
    {
      label: 'Usuarios',
      icon: 'user',
      items: [
        { label: 'Nuevo Usuario', icon: 'user-plus' },
        { label: 'Lista de Usuarios', icon: 'users' }
      ]
    },
    {
      label: 'Salir',
      icon: 'power'
    }
  ];

  menubarHtml = `<ox-menubar [model]="items"></ox-menubar>`;

  menubarTs = `import { Component } from '@angular/core';
import { MenubarComponent, MenuItem } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [MenubarComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {
  items: MenuItem[] = [
    {
      label: 'Archivo',
      items: [
        { label: 'Nuevo' },
        { separator: true },
        { label: 'Salir' }
      ]
    }
  ];
}`;

  menubarProperties: ApiProperty[] = [
    { name: 'model', type: 'MenuItem[]', default: '[]', description: 'Arreglo jerárquico de elementos de menú (labels, iconos, submenús y comandos).' },
    { name: 'styleClass', type: 'string', default: "''", description: 'Clase CSS personalizada para el contenedor de la barra de menú.' }
  ];
}
