import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'oxygen-ui';

@Component({
  selector: 'app-knob-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, KnobComponent],
  template: `
    <div class="ox-page-container">
      <h1>Knob</h1>
      <p class="ox-description">Control circular interactivo para valores numéricos.</p>

      <section class="ox-section">
        <h2>Básico</h2>
        <div class="ox-flex ox-flex-column ox-align-items-center">
          <ox-knob [(ngModel)]="value" label="Temperatura" unit="°C"></ox-knob>
          <p class="ox-mt-4">Valor actual: {{ value }}°C</p>
        </div>
      </section>

      <section class="ox-section">
        <h2>Variantes</h2>
        <div class="knob-grid">
          <div class="knob-demo-item">
            <ox-knob [(ngModel)]="value2" [max]="200" unit="W" label="Default" variant="default"></ox-knob>
          </div>
          <div class="knob-demo-item">
            <ox-knob [(ngModel)]="value2" [max]="200" unit="W" label="Flat" variant="flat"></ox-knob>
          </div>
          <div class="knob-demo-item">
            <ox-knob [(ngModel)]="value2" [max]="200" unit="W" label="Outline" variant="outline"></ox-knob>
          </div>
        </div>
      </section>

      <section class="ox-section">
        <h2>Colores y Estilos</h2>
        <div class="knob-grid">
          <div class="knob-demo-item">
            <ox-knob 
              [(ngModel)]="value3" 
              valueColor="#8b5cf6" 
              rangeColor="#ddd6fe" 
              label="Violeta"
              [strokeWidth]="12">
            </ox-knob>
          </div>
          <div class="knob-demo-item">
            <ox-knob 
              [(ngModel)]="value3" 
              valueColor="#f43f5e" 
              rangeColor="#fff1f2" 
              variant="flat"
              label="Rosa Flat"
              [strokeWidth]="4">
            </ox-knob>
          </div>
          <div class="knob-demo-item">
            <ox-knob 
              [(ngModel)]="value3" 
              valueColor="#f59e0b" 
              rangeColor="#fef3c7" 
              variant="outline"
              label="Ámbar"
              [strokeWidth]="10">
            </ox-knob>
          </div>
        </div>
      </section>
    </div>
  `
})
export class KnobDemoComponent {
  value = 24;
  value2 = 100;
  value3 = 65;
}
