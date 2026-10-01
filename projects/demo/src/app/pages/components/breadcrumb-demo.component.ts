import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-breadcrumb-demo',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Breadcrumb</h1>
      <p class="ox-description">
        Componente de navegación contextual que muestra la jerarquía y ubicación actual de la página dentro de la aplicación.
      </p>

      <!-- 1. BÁSICO -->
      <app-doc-code 
        title="1. Uso Básico"
        description="Ruta de navegación estándar."
        [htmlCode]="basicHtml"
        [tsCode]="basicTs">
        <div style="width: 100%;">
          <ox-breadcrumb [items]="items"></ox-breadcrumb>
        </div>
      </app-doc-code>

      <!-- 2. SEPARADOR PERSONALIZADO -->
      <app-doc-code 
        title="2. Separador Personalizado"
        description="Modificación del glifo o carácter separador."
        [htmlCode]="customSepHtml"
        [tsCode]="basicTs">
        <div style="width: 100%;">
          <ox-breadcrumb [items]="items" separator=">"></ox-breadcrumb>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: BreadcrumbComponent"
        [properties]="breadcrumbProperties">
      </app-doc-api-table>
    </div>
  `
})
export class BreadcrumbDemoComponent {
  items = [
    { label: 'Inicio', url: '/' },
    { label: 'Componentes' },
    { label: 'Navegación' },
    { label: 'Breadcrumb', current: true }
  ];

  basicHtml = `<ox-breadcrumb [items]="items"></ox-breadcrumb>`;

  customSepHtml = `<ox-breadcrumb [items]="items" separator=">"></ox-breadcrumb>`;

  basicTs = `import { Component } from '@angular/core';
import { BreadcrumbComponent } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {
  items = [
    { label: 'Inicio', url: '/' },
    { label: 'Componentes' },
    { label: 'Breadcrumb', current: true }
  ];
}`;

  breadcrumbProperties: ApiProperty[] = [
    { name: 'items', type: 'any[]', default: '[]', description: 'Arreglo de elementos que conforman la ruta (label, url, current).' },
    { name: 'separator', type: 'string', default: "'/'", description: 'Carácter o separador visual entre los elementos.' }
  ];
}