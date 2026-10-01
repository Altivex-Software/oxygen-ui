import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectComponent, MultiSelectOption } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-multi-select-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, MultiSelectComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>MultiSelect</h1>
      <p class="ox-description">
        Selector múltiple avanzado con búsqueda en vivo, chips visuales y soporte para estilos y severidades.
      </p>

      <!-- 1. BÁSICO -->
      <app-doc-code 
        title="1. Uso Básico"
        description="Selección múltiple con contador y etiquetas."
        [htmlCode]="basicHtml"
        [tsCode]="basicTs">
        <div style="max-width: 400px; width: 100%;">
          <ox-multi-select 
            [options]="cities" 
            [(value)]="selectedCities"
            placeholder="Seleccione ciudades">
          </ox-multi-select>
          <p class="ox-mt-4" style="font-size: 0.875rem; color: #64748b; margin-top: 0.75rem;">
            Valor seleccionado: <code>{{ selectedCities | json }}</code>
          </p>
        </div>
      </app-doc-code>

      <!-- 2. CON FILTRO -->
      <app-doc-code 
        title="2. Con Filtro de Búsqueda"
        description="Búsqueda en tiempo real dentro del panel desplegable para datasets medianos y grandes."
        [htmlCode]="filterHtml"
        [tsCode]="filterTs">
        <div style="max-width: 400px; width: 100%;">
          <ox-multi-select 
            [options]="frameworks" 
            [(value)]="selectedFrameworks"
            [filter]="true"
            filterPlaceholder="Buscar framework..."
            placeholder="Frameworks favoritos">
          </ox-multi-select>
        </div>
      </app-doc-code>

      <!-- 3. VARIANTES Y SEVERIDADES -->
      <app-doc-code
        title="3. Variantes de Estilo y Severidades"
        description="Variantes visuales y estados de color."
        [htmlCode]="filterHtml"
        [tsCode]="filterTs">
        <div class="ox-flex ox-flex-column ox-gap-4" style="max-width: 400px; width: 100%;">
          <ox-multi-select [options]="cities" placeholder="Default"></ox-multi-select>
          <ox-multi-select [options]="cities" placeholder="Filled" variant="filled"></ox-multi-select>
          <ox-multi-select [options]="cities" placeholder="Outlined" variant="outlined"></ox-multi-select>
          <ox-multi-select [options]="cities" placeholder="Success Color" severity="success"></ox-multi-select>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: MultiSelectComponent"
        [properties]="multiSelectProperties" 
        [events]="multiSelectEvents">
      </app-doc-api-table>
    </div>
  `
})
export class MultiSelectDemoComponent {
  cities: MultiSelectOption[] = [
    { label: 'Nueva York', value: 'NY' },
    { label: 'Roma', value: 'RM' },
    { label: 'Londres', value: 'LDN' },
    { label: 'Estambul', value: 'IST' },
    { label: 'París', value: 'PRS' }
  ];
  selectedCities = ['NY', 'RM'];

  frameworks: MultiSelectOption[] = [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Qwik', value: 'qwik' },
    { label: 'Solid', value: 'solid' }
  ];
  selectedFrameworks = ['angular'];

  basicHtml = `<ox-multi-select 
  [options]="cities" 
  [(value)]="selectedCities"
  placeholder="Seleccione ciudades">
</ox-multi-select>`;

  basicTs = `import { Component } from '@angular/core';
import { MultiSelectComponent, MultiSelectOption } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [MultiSelectComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {
  cities: MultiSelectOption[] = [
    { label: 'Nueva York', value: 'NY' },
    { label: 'Roma', value: 'RM' },
    { label: 'Londres', value: 'LDN' }
  ];
  selectedCities = ['NY'];
}`;

  filterHtml = `<ox-multi-select 
  [options]="frameworks" 
  [(value)]="selectedFrameworks"
  [filter]="true"
  filterPlaceholder="Buscar..."
  placeholder="Seleccione opciones">
</ox-multi-select>`;

  filterTs = `import { Component } from '@angular/core';
import { MultiSelectComponent, MultiSelectOption } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [MultiSelectComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {
  frameworks: MultiSelectOption[] = [
    { label: 'Angular', value: 'angular' },
    { label: 'TypeScript', value: 'ts' }
  ];
  selectedFrameworks = ['angular'];
}`;

  multiSelectProperties: ApiProperty[] = [
    { name: 'options', type: 'MultiSelectOption[]', default: '[]', description: 'Array de opciones disponibles con label y value.' },
    { name: 'value', type: 'any[]', default: '[]', description: 'Valores seleccionados (soporta [(value)]).' },
    { name: 'placeholder', type: 'string', default: "''", description: 'Texto que se muestra cuando no hay elementos seleccionados.' },
    { name: 'filter', type: 'boolean', default: 'false', description: 'Habilita el input de búsqueda dentro del menú desplegable.' },
    { name: 'filterPlaceholder', type: 'string', default: "'Buscar...'", description: 'Placeholder del buscador interno.' },
    { name: 'variant', type: "'default' | 'filled' | 'outlined' | 'fieldset' | 'oneLine'", default: "'default'", description: 'Estilo visual del contenedor.' },
    { name: 'severity', type: 'string', default: "'primary'", description: 'Tono cromático del componente.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita el selector.' }
  ];

  multiSelectEvents: ApiEvent[] = [
    { name: 'valueChange', parameters: 'any[]', description: 'Se emite al cambiar la lista de elementos seleccionados.' },
    { name: 'onChange', parameters: '{ originalEvent: Event, value: any[] }', description: 'Se dispara tras cualquier selección o deselección.' }
  ];
}
