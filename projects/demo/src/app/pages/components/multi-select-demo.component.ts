import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectComponent, MultiSelectOption } from 'oxygen-ui';

@Component({
  selector: 'app-multi-select-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, MultiSelectComponent],
  template: `
    <div class="ox-page-container">
      <h1>MultiSelect</h1>
      <p class="ox-description">Permite seleccionar múltiples opciones de una lista usando chips visuales.</p>

      <section class="ox-section">
        <h2>Uso Básico</h2>
        <div class="ox-card ox-p-4">
          <div style="max-width: 400px">
            <ox-multi-select 
              [options]="cities" 
              [(value)]="selectedCities"
              placeholder="Seleccione ciudades">
            </ox-multi-select>
          </div>
          <p class="ox-mt-4">Valor seleccionado: {{ selectedCities | json }}</p>
        </div>
      </section>

      <section class="ox-section">
        <h2>Con Filtro</h2>
        <div class="ox-card ox-p-4">
          <div style="max-width: 400px">
            <ox-multi-select 
              [options]="frameworks" 
              [(value)]="selectedFrameworks"
              [filter]="true"
              filterPlaceholder="Buscar framework..."
              placeholder="Frameworks favoritos">
            </ox-multi-select>
          </div>
        </div>
      </section>

      <section class="ox-section">
        <h2>Variantes (Estilos)</h2>
        <div class="ox-card ox-p-4">
          <div class="ox-flex ox-flex-column ox-gap-4" style="max-width: 400px">
            <ox-multi-select [options]="cities" placeholder="Default"></ox-multi-select>
            <ox-multi-select [options]="cities" placeholder="Filled" variant="filled"></ox-multi-select>
            <ox-multi-select [options]="cities" placeholder="Outlined" variant="outlined"></ox-multi-select>
            <ox-multi-select [options]="cities" label="Fieldset Style" variant="fieldset"></ox-multi-select>
            <ox-multi-select [options]="cities" placeholder="One Line" variant="oneLine"></ox-multi-select>
          </div>
        </div>
      </section>

      <section class="ox-section">
        <h2>Severidades (Colores)</h2>
        <div class="ox-card ox-p-4">
          <div class="ox-flex ox-flex-column ox-gap-4" style="max-width: 400px">
            <ox-multi-select [options]="cities" placeholder="Primary" severity="primary"></ox-multi-select>
            <ox-multi-select [options]="cities" placeholder="Success" severity="success"></ox-multi-select>
            <ox-multi-select [options]="cities" placeholder="Danger" severity="danger"></ox-multi-select>
          </div>
        </div>
      </section>
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
}
