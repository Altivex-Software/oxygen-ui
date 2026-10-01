import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteComponent, AutoCompleteCompleteEvent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-autocomplete-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AutoCompleteComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>AutoComplete</h1>
      <p class="ox-description">
        Campo de texto predictivo que consulta y muestra sugerencias coincidentes a medida que el usuario escribe, con soporte para objetos complejos y botón desplegable.
      </p>

      <!-- 1. BÚSQUEDA SIMPLE -->
      <section class="ox-section">
        <h2>Búsqueda Simple (Strings)</h2>
        <div class="ox-card ox-p-4" style="margin-bottom: 1.5rem;">
          <div style="max-width: 400px">
            <ox-autocomplete 
              [(value)]="selectedCountry"
              [suggestions]="filteredCountries"
              (completeMethod)="searchCountry($event)"
              placeholder="Escribe para buscar un país (ej: Ar...)">
            </ox-autocomplete>
          </div>
          <p class="ox-mt-4" style="font-size: 0.875rem; color: #64748b;">
            País seleccionado: <code>{{ selectedCountry | json }}</code>
          </p>
        </div>

        <app-doc-code 
          title="AutoComplete Básico"
          [htmlCode]="basicHtml"
          [tsCode]="basicTs">
        </app-doc-code>
      </section>

      <!-- 2. OBJETOS Y DROPDOWN -->
      <section class="ox-section">
        <h2>Con Botón Dropdown y Objetos Complejos</h2>
        <p>Mapeo de objetos mediante la propiedad <code>field</code> y botón desplegable para ver todas las sugerencias iniciales.</p>

        <div class="ox-card ox-p-4" style="margin-bottom: 1.5rem;">
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
          <p class="ox-mt-4" style="font-size: 0.875rem; color: #64748b;">
            Objeto seleccionado: <code>{{ selectedAdvancedCountry | json }}</code>
          </p>
        </div>

        <app-doc-code 
          title="AutoComplete con Objetos"
          [htmlCode]="advancedHtml"
          [tsCode]="advancedTs">
        </app-doc-code>
      </section>

      <!-- API REFERENCE -->
      <section class="ox-section">
        <h2>API Reference &mdash; &lt;ox-autocomplete&gt;</h2>
        <app-doc-api-table [properties]="autoCompleteProperties" [events]="autoCompleteEvents"></app-doc-api-table>
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

  basicHtml = `<ox-autocomplete 
  [(value)]="selectedCountry"
  [suggestions]="filteredCountries"
  (completeMethod)="searchCountry($event)"
  placeholder="Buscar país...">
</ox-autocomplete>`;

  basicTs = `import { Component } from '@angular/core';
import { AutoCompleteComponent, AutoCompleteCompleteEvent } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [AutoCompleteComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {
  selectedCountry = '';
  countries = ['Argentina', 'Brasil', 'Chile', 'Colombia', 'México'];
  filteredCountries: string[] = [];

  searchCountry(event: AutoCompleteCompleteEvent) {
    this.filteredCountries = this.countries.filter(c => 
      c.toLowerCase().includes(event.query.toLowerCase())
    );
  }
}`;

  advancedHtml = `<ox-autocomplete 
  [(value)]="selectedItem"
  [suggestions]="filteredItems"
  (completeMethod)="search($event)"
  field="name"
  [dropdown]="true"
  placeholder="Buscar...">
</ox-autocomplete>`;

  advancedTs = `import { Component } from '@angular/core';
import { AutoCompleteComponent, AutoCompleteCompleteEvent } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [AutoCompleteComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {
  selectedItem: any;
  items = [{ name: 'Angular', id: 1 }, { name: 'React', id: 2 }];
  filteredItems: any[] = [];

  search(event: AutoCompleteCompleteEvent) {
    this.filteredItems = this.items.filter(i => 
      i.name.toLowerCase().includes(event.query.toLowerCase())
    );
  }
}`;

  autoCompleteProperties: ApiProperty[] = [
    { name: 'suggestions', type: 'any[]', default: '[]', description: 'Array de sugerencias filtradas para mostrar en el desplegable.' },
    { name: 'value', type: 'any', default: 'null', description: 'Valor seleccionado (soporta [(value)]).' },
    { name: 'field', type: 'string', default: "''", description: 'Nombre de la propiedad a mostrar cuando las sugerencias son objetos.' },
    { name: 'dropdown', type: 'boolean', default: 'false', description: 'Muestra un botón a la derecha para desplegar todas las opciones.' },
    { name: 'placeholder', type: 'string', default: "''", description: 'Texto placeholder del input.' },
    { name: 'minLength', type: 'number', default: '1', description: 'Cantidad mínima de caracteres requerida para disparar completeMethod.' }
  ];

  autoCompleteEvents: ApiEvent[] = [
    { name: 'completeMethod', parameters: 'AutoCompleteCompleteEvent', description: 'Se dispara al escribir para que la app filtre el array de sugerencias.' },
    { name: 'onSelect', parameters: 'any', description: 'Se dispara cuando el usuario selecciona una sugerencia.' }
  ];
}
