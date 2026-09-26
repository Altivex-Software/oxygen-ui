import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateInputComponent } from 'oxygen-ui';

@Component({
  selector: 'app-date-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, DateInputComponent],
  template: `
    <div class="ox-page-container">
      <h1>Date Input</h1>
      <p class="ox-description">Selector de fecha estándar con soporte para min/max.</p>

      <section class="ox-section">
        <h2>Básico</h2>
        <ox-date-input label="Fecha de Nacimiento"></ox-date-input>
      </section>

      <section class="ox-section">
        <h2>Límites</h2>
        <div class="demo-grid">
          <ox-date-input label="Mínimo 2024-01-01" min="2024-01-01"></ox-date-input>
          <ox-date-input label="Máximo 2024-12-31" max="2024-12-31"></ox-date-input>
        </div>
      </section>

      <section class="ox-section">
        <h2>Float Labels</h2>
        <div class="demo-grid">
          <ox-date-input 
            label="Default Float" 
            [floatLabel]="true" 
            variant="default">
          </ox-date-input>
          
          <ox-date-input 
            label="Fieldset Float" 
            [floatLabel]="true" 
            variant="fieldset">
          </ox-date-input>

          <ox-date-input 
            label="One Line Float" 
            [floatLabel]="true" 
            variant="oneLine">
          </ox-date-input>
        </div>
      </section>
    </div>
  `
})
export class DateDemoComponent {}
