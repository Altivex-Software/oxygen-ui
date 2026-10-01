import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownComponent, DropdownOption } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-dropdown-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Dropdown (Selector Desplegable)</h1>
      <p class="ox-description">Componente para seleccionar una opción de una lista desplegable con soporte de búsqueda, variantes y plantillas.</p>

      <!-- 1. BÁSICO -->
      <app-doc-code
        title="1. Uso Básico y Selección"
        description="Selecciona un objeto o valor primitivo desde el menú emergente."
        [html]="basicHtml"
        [ts]="basicTs">
        <div style="max-width: 320px;">
          <ox-dropdown 
            [options]="cities" 
            [(value)]="selectedCity" 
            placeholder="Selecciona una ciudad">
          </ox-dropdown>
          <p style="margin-top: 0.75rem; font-size: 0.875rem; color: #475569;">
            Ciudad seleccionada: <b>{{ selectedCity || 'Ninguna' }}</b>
          </p>
        </div>
      </app-doc-code>

      <!-- 2. CON BÚSQUEDA / FILTRO -->
      <app-doc-code
        title="2. Con Filtro de Búsqueda"
        description="Permite al usuario filtrar las opciones escribiendo directamente en la barra de búsqueda del overlay."
        [html]="filterHtml"
        [ts]="basicTs">
        <div style="max-width: 320px;">
          <ox-dropdown 
            [options]="cities" 
            [(value)]="filteredCity" 
            [filter]="true"
            placeholder="Busca una ciudad">
          </ox-dropdown>
          <p style="margin-top: 0.75rem; font-size: 0.875rem; color: #475569;">
            Ciudad filtrada: <b>{{ filteredCity || 'Ninguna' }}</b>
          </p>
        </div>
      </app-doc-code>

      <!-- 3. VARIANTES DE DISEÑO -->
      <app-doc-code
        title="3. Variantes Visuales"
        description="Estilos: Standard, Filled, Outlined, Fieldset con label flotante y One Line."
        [html]="variantsHtml"
        [ts]="basicTs">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;">
          <div>
            <span style="display: block; font-size: 0.8125rem; font-weight: 600; margin-bottom: 0.35rem; color: #64748b;">Default</span>
            <ox-dropdown [options]="cities" placeholder="Default"></ox-dropdown>
          </div>
          <div>
            <span style="display: block; font-size: 0.8125rem; font-weight: 600; margin-bottom: 0.35rem; color: #64748b;">Filled</span>
            <ox-dropdown [options]="cities" variant="filled" placeholder="Filled variant"></ox-dropdown>
          </div>
          <div>
            <span style="display: block; font-size: 0.8125rem; font-weight: 600; margin-bottom: 0.35rem; color: #64748b;">Fieldset</span>
            <ox-dropdown [options]="cities" variant="fieldset" label="Ciudad" placeholder="Fieldset variant"></ox-dropdown>
          </div>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: DropdownComponent"
        [properties]="dropdownProps"
        [events]="dropdownEvents">
      </app-doc-api-table>
    </div>
  `
})
export class DropdownDemoComponent {
  selectedCity: any = null;
  filteredCity: any = null;

  cities: DropdownOption[] = [
    { label: 'New York', value: 'NY' },
    { label: 'Rome', value: 'RM' },
    { label: 'London', value: 'LDN' },
    { label: 'Istanbul', value: 'IST' },
    { label: 'Paris', value: 'PRS' },
    { label: 'Bogotá', value: 'BOG' },
    { label: 'Buenos Aires', value: 'BUE' },
    { label: 'Madrid', value: 'MAD' }
  ];

  basicHtml = `<ox-dropdown 
  [options]="cities" 
  [(value)]="selectedCity" 
  placeholder="Selecciona una ciudad">
</ox-dropdown>`;

  filterHtml = `<ox-dropdown 
  [options]="cities" 
  [(value)]="filteredCity" 
  [filter]="true"
  placeholder="Busca una ciudad">
</ox-dropdown>`;

  variantsHtml = `<ox-dropdown [options]="cities" variant="filled"></ox-dropdown>
<ox-dropdown [options]="cities" variant="fieldset" label="Ciudad"></ox-dropdown>`;

  basicTs = `cities = [
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' }
];
selectedCity = null;`;

  dropdownProps: ApiProperty[] = [
    {
      name: 'options',
      type: 'any[]',
      default: '[]',
      description: 'Colección de opciones a mostrar en el menú desplegable.'
    },
    {
      name: 'optionLabel',
      type: 'string',
      default: "'name' | 'label'",
      description: 'Campo del objeto que se usará como etiqueta visible.'
    },
    {
      name: 'filter',
      type: 'boolean',
      default: 'false',
      description: 'Muestra un input de búsqueda dentro del overlay para filtrar opciones.'
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "'Select an option'",
      description: 'Texto mostrado cuando ningún valor ha sido seleccionado.'
    },
    {
      name: 'variant',
      type: "'default' | 'filled' | 'outlined' | 'fieldset' | 'oneLine'",
      default: "'default'",
      description: 'Estilo de presentación del campo selector.'
    }
  ];

  dropdownEvents: ApiEvent[] = [
    {
      name: 'onChange',
      parameters: 'OxygenChangeEvent',
      description: 'Emitido cuando el valor seleccionado cambia.'
    },
    {
      name: 'onShow',
      parameters: 'void',
      description: 'Emitido cuando el menú desplegable se abre.'
    },
    {
      name: 'onHide',
      parameters: 'void',
      description: 'Emitido cuando el menú desplegable se cierra.'
    }
  ];
}