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
      icon: 'pi pi-fw pi-file',
      items: [
        { label: 'Nuevo', icon: 'pi pi-fw pi-plus' },
        { label: 'Abrir', icon: 'pi pi-fw pi-folder-open' },
        { separator: true },
        { label: 'Exportar', icon: 'pi pi-fw pi-upload' }
      ]
    },
    {
      label: 'Editar',
      icon: 'pi pi-fw pi-pencil',
      items: [
        { label: 'Deshacer', icon: 'pi pi-fw pi-undo' },
        { label: 'Rehacer', icon: 'pi pi-fw pi-refresh' }
      ]
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-fw pi-user',
      items: [
        { label: 'Nuevo Usuario', icon: 'pi pi-fw pi-user-plus' },
        { label: 'Lista de Usuarios', icon: 'pi pi-fw pi-users' }
      ]
    },
    {
      label: 'Salir',
      icon: 'pi pi-fw pi-power-off'
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
