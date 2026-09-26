import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioGroupComponent } from 'oxygen-ui';

@Component({
  selector: 'app-radio-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, RadioGroupComponent],
  template: `
    <div class="ox-page-container">
      <h1>Radio Button</h1>
      <p class="ox-description">Grupo de opciones de selección única.</p>

      <section class="ox-section">
        <h2>Horizontal (Default)</h2>
        <ox-radio-group [options]="options" [(ngModel)]="selectedValue"></ox-radio-group>
        <p class="ox-mt-4">Seleccionado: {{ selectedValue }}</p>
      </section>

      <section class="ox-section">
        <h2>Vertical</h2>
        <ox-radio-group [options]="options" [(ngModel)]="selectedValueVertical" [vertical]="true"></ox-radio-group>
      </section>
    </div>
  `
})
export class RadioDemoComponent {
  options = [
    { label: 'Opción 1', value: 1 },
    { label: 'Opción 2', value: 2 },
    { label: 'Opción 3 (Deshabilitada)', value: 3, disabled: true }
  ];
  selectedValue = 1;
  selectedValueVertical = 2;
}
