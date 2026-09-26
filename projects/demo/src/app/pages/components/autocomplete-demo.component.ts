import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteComponent, AutoCompleteCompleteEvent } from 'oxygen-ui';

@Component({
  selector: 'app-autocomplete-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AutoCompleteComponent],
  template: `
    <div class="ox-page-container">
      <h1>AutoComplete</h1>
      <p class="ox-description">Un campo de texto predictivo que muestra sugerencias a medida que el usuario escribe.</p>

      <section class="ox-section">
        <h2>Búsqueda Simple</h2>
        <div class="ox-card ox-p-4">
          <div style="max-width: 400px">
            <ox-autocomplete 
              [(value)]="selectedCountry"
              [suggestions]="filteredCountries"
              (completeMethod)="searchCountry($event)"
              placeholder="Escribe para buscar un país (ej: Ar...)">
            </ox-autocomplete>
          </div>
          <p class="ox-mt-4">País seleccionado: {{ selectedCountry | json }}</p>
        </div>
      </section>

      <section class="ox-section">
        <h2>Con Botón Dropdown y Objetos Complejos</h2>
        <div class="ox-card ox-p-4">
          <div style="max-width: 400px">
            <ox-autocomplete 
              [(value)]="selectedAdvancedCountry"
              [suggestions]="filteredAdvancedCountries"
              (completeMethod)="searchAdvancedCountry($event)"
              field="name"
              [dropdown]="true"
              placeholder="Buscar país...">
            </ox-autocomplete>
          </div>
          <p class="ox-mt-4">Objeto seleccionado: {{ selectedAdvancedCountry | json }}</p>
        </div>
      </section>

      <section class="ox-section">
        <h2>Variantes y Tamaños</h2>
        <div class="ox-card ox-p-4">
          <div class="ox-flex ox-flex-column ox-gap-4" style="max-width: 400px">
            <ox-autocomplete [suggestions]="filteredCountries" (completeMethod)="searchCountry($event)" placeholder="Pequeño (sm)" size="sm"></ox-autocomplete>
            <ox-autocomplete [suggestions]="filteredCountries" (completeMethod)="searchCountry($event)" placeholder="Fieldset Style" variant="fieldset" label="País Destino"></ox-autocomplete>
            <ox-autocomplete [suggestions]="filteredCountries" (completeMethod)="searchCountry($event)" placeholder="One Line + Success" variant="oneLine" severity="success"></ox-autocomplete>
            <ox-autocomplete [suggestions]="filteredCountries" (completeMethod)="searchCountry($event)" placeholder="Filled + Danger" variant="filled" severity="danger" [dropdown]="true"></ox-autocomplete>
          </div>
        </div>
      </section>
    </div>
  `
})
export class AutoCompleteDemoComponent {
  selectedCountry: string = '';
  countries: string[] = ['Argentina', 'Australia', 'Brasil', 'Canadá', 'Chile', 'Colombia', 'España', 'Estados Unidos', 'México', 'Perú', 'Uruguay'];
  filteredCountries: string[] = [];

  selectedAdvancedCountry: any;
  advancedCountries: any[] = [
    { name: 'Argentina', code: 'AR' },
    { name: 'Australia', code: 'AU' },
    { name: 'Brasil', code: 'BR' },
    { name: 'Canadá', code: 'CA' },
    { name: 'Chile', code: 'CL' },
    { name: 'España', code: 'ES' },
    { name: 'México', code: 'MX' }
  ];
  filteredAdvancedCountries: any[] = [];

  searchCountry(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.filteredCountries = this.countries.filter(c => c.toLowerCase().includes(query));
  }

  searchAdvancedCountry(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.filteredAdvancedCountries = this.advancedCountries.filter(c => c.name.toLowerCase().includes(query));
  }
}
