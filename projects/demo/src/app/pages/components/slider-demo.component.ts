import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from 'oxygen-ui';

@Component({
  selector: 'app-slider-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, SliderComponent],
  template: `
    <div class="ox-page-container">
      <h1>Slider</h1>
      <p class="ox-description">Control deslizante para valores numéricos.</p>

      <section class="ox-section">
        <h2>Básico</h2>
        <ox-slider [(ngModel)]="value"></ox-slider>
        <p class="ox-mt-4">Valor: {{ value }}</p>
      </section>

      <section class="ox-section">
        <h2>Rango personalizado (0-10)</h2>
        <ox-slider [min]="0" [max]="10" [step]="0.5" [(ngModel)]="valueStep"></ox-slider>
        <p class="ox-mt-4">Valor: {{ valueStep }}</p>
      </section>
    </div>
  `
})
export class SliderDemoComponent {
  value = 50;
  valueStep = 5;
}
