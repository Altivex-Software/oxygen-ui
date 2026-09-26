import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from '../../../../../oxygen-ui/src/lib/components/dropdown/dropdown.component';

@Component({
  selector: 'app-dropdown-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownComponent],
  template: `
    <div class="ox-page-container">
      <h1>Dropdown</h1>
      <p class="ox-description">Componente para seleccionar una opción de una lista desplegable.</p>

      <section class="ox-section">
        <h2>Básico</h2>
        <ox-dropdown 
          [options]="cities" 
          [(value)]="selectedCity" 
          placeholder="Selecciona una ciudad">
        </ox-dropdown>
        <p class="ox-mt-4">Ciudad seleccionada: <b>{{ selectedCity ? selectedCity.name : 'Ninguna' }}</b></p>
      </section>

      <section class="ox-section">
        <h2>Con Filtro</h2>
        <ox-dropdown 
          [options]="cities" 
          [(value)]="filteredCity" 
          [filter]="true"
          placeholder="Busca una ciudad">
        </ox-dropdown>
        <p class="ox-mt-4">Ciudad seleccionada (filtrada): <b>{{ filteredCity ? filteredCity.name : 'Ninguna' }}</b></p>
      </section>

      <section class="ox-section">
        <h2>Variantes</h2>
        <div class="ox-flex ox-flex-column ox-gap-4">
          <div>
            <h3>Default</h3>
            <ox-dropdown [options]="cities" placeholder="Default"></ox-dropdown>
          </div>
          <div>
            <h3>Filled</h3>
            <ox-dropdown [options]="cities" variant="filled" placeholder="Filled variant"></ox-dropdown>
          </div>
          <div>
            <h3>Outlined</h3>
            <ox-dropdown [options]="cities" variant="outlined" placeholder="Outlined variant"></ox-dropdown>
          </div>
          <div>
            <h3>Fieldset</h3>
            <ox-dropdown [options]="cities" variant="fieldset" label="Ciudad" placeholder="Fieldset variant"></ox-dropdown>
          </div>
          <div>
            <h3>One Line</h3>
            <ox-dropdown [options]="cities" variant="oneLine" placeholder="One Line variant"></ox-dropdown>
          </div>
        </div>
      </section>

      <section class="ox-section">
        <h2>Selección Múltiple</h2>
        <div class="ox-flex ox-flex-column ox-gap-4">
          <ox-dropdown 
            [options]="cities" 
            [multiple]="true" 
            [(ngModel)]="selectedCities" 
            placeholder="Selecciona varias ciudades"
            label="Ciudades">
          </ox-dropdown>
          <p class="ox-mt-4">Ciudades seleccionadas: {{ selectedCitiesLabels() || 'Ninguna' }}</p>
        </div>
      </section>

      <section class="ox-section">
        <h2>Severidades (Colores)</h2>
        <div class="grid grid-cols-2 ox-gap-4">
          <ox-dropdown [options]="cities" severity="success" placeholder="Success"></ox-dropdown>
          <ox-dropdown [options]="cities" severity="danger" placeholder="Danger"></ox-dropdown>
          <ox-dropdown [options]="cities" severity="warning" placeholder="Warning"></ox-dropdown>
          <ox-dropdown [options]="cities" severity="info" placeholder="Info"></ox-dropdown>
        </div>
      </section>

      <section class="ox-section">
        <h2>Tamaños</h2>
        <div class="ox-flex ox-flex-column ox-gap-4">
          <ox-dropdown [options]="cities" size="sm" placeholder="Pequeño (sm)"></ox-dropdown>
          <ox-dropdown [options]="cities" size="md" placeholder="Mediano (md)"></ox-dropdown>
          <ox-dropdown [options]="cities" size="lg" placeholder="Grande (lg)"></ox-dropdown>
        </div>
      </section>
    </div>
  `
})
export class DropdownDemoComponent {
  cities = [
    { label: 'New York', value: { name: 'New York', code: 'NY' } },
    { label: 'Rome', value: { name: 'Rome', code: 'RM' } },
    { label: 'London', value: { name: 'London', code: 'LDN' } },
    { label: 'Istanbul', value: { name: 'Istanbul', code: 'IST' } },
    { label: 'Paris', value: { name: 'Paris', code: 'PRS' } }
  ];
  selectedCity: any = null;
  filteredCity: any = null;
  selectedCities: any[] = [];

  selectedCitiesLabels() {
    return this.selectedCities.map(c => c.name).join(', ');
  }
}