import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'oxygen-ui';

@Component({
  selector: 'app-datepicker-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePickerComponent],
  template: `
    <div class="ox-page-container">
      <h1>DatePicker</h1>
      <p class="ox-description">Un selector de fecha avanzado y personalizado con control total sobre el diseño, formato y comportamiento.</p>

      <section class="ox-section">
        <h2>Básico</h2>
        <div class="demo-grid">
          <ox-date-picker label="Seleccionar Fecha"></ox-date-picker>
          <ox-date-picker label="Con Placeholder" placeholder="DD/MM/YYYY"></ox-date-picker>
        </div>
      </section>

      <section class="ox-section">
        <h2>Float Labels & Variantes</h2>
        <p class="demo-subsection-desc">Soporta las mismas variantes de etiquetas flotantes que el resto de inputs de la librería.</p>
        <div class="demo-grid">
          <ox-date-picker 
            label="Default Float" 
            [floatLabel]="true" 
            variant="default">
          </ox-date-picker>
          
          <ox-date-picker 
            label="Fieldset Float" 
            [floatLabel]="true" 
            variant="fieldset">
          </ox-date-picker>

          <ox-date-picker 
            label="One Line Float" 
            [floatLabel]="true" 
            variant="oneLine">
          </ox-date-picker>
        </div>
      </section>

      <section class="ox-section">
        <h2>Formatos Personalizados</h2>
        <p class="demo-subsection-desc">Puedes definir el formato de visualización usando tokens como DD, MM y YYYY.</p>
        <div class="demo-grid">
          <ox-date-picker 
            label="ISO Format" 
            format="YYYY-MM-DD"
            placeholder="YYYY-MM-DD">
          </ox-date-picker>
          
          <ox-date-picker 
            label="Custom Format" 
            format="DD / MM / YYYY"
            placeholder="DD / MM / YYYY">
          </ox-date-picker>
        </div>
      </section>

      <section class="ox-section">
        <h2>Estados</h2>
        <div class="demo-grid">
          <ox-date-picker label="Deshabilitado" [disabled]="true"></ox-date-picker>
          <ox-date-picker label="Con Error" error="La fecha es obligatoria"></ox-date-picker>
        </div>
      </section>
    </div>
  `
})
export class DatePickerDemoComponent {}
