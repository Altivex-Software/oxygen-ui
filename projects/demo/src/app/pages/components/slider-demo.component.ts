import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-slider-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, SliderComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Slider (Control Deslizante)</h1>
      <p class="ox-description">Control deslizante para selección intuitiva de valores o rangos numéricos.</p>

      <!-- 1. BÁSICO -->
      <app-doc-code
        title="1. Uso Básico (0 a 100)"
        description="Control deslizante estándar con vinculación ngModel."
        [html]="basicHtml"
        [ts]="sliderTs">
        <div style="max-width: 400px;">
          <ox-slider [(ngModel)]="value"></ox-slider>
          <p style="margin-top: 0.75rem; font-size: 0.875rem; color: #475569;">
            Valor actual: <b>{{ value }}%</b>
          </p>
        </div>
      </app-doc-code>

      <!-- 2. PASO PERSONALIZADO -->
      <app-doc-code
        title="2. Rango con Pasos (Step: 0.5)"
        description="Configuración de [min], [max] y [step]."
        [html]="stepHtml"
        [ts]="sliderTs">
        <div style="max-width: 400px;">
          <ox-slider [min]="0" [max]="10" [step]="0.5" [(ngModel)]="valueStep"></ox-slider>
          <p style="margin-top: 0.75rem; font-size: 0.875rem; color: #475569;">
            Valor con paso 0.5: <b>{{ valueStep }}</b>
          </p>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: SliderComponent"
        [properties]="sliderProps"
        [events]="sliderEvents">
      </app-doc-api-table>
    </div>
  `
})
export class SliderDemoComponent {
  value = 50;
  valueStep = 5;

  basicHtml = `<ox-slider [(ngModel)]="value"></ox-slider>`;
  stepHtml = `<ox-slider [min]="0" [max]="10" [step]="0.5" [(ngModel)]="valueStep"></ox-slider>`;

  sliderTs = `import { Component } from '@angular/core';
import { SliderComponent } from 'oxygen-ui';

@Component({
  selector: 'app-my-slider',
  standalone: true,
  imports: [SliderComponent],
  templateUrl: './my-slider.component.html'
})
export class MySliderComponent {
  value = 50;
}`;

  sliderProps: ApiProperty[] = [
    {
      name: 'min',
      type: 'number',
      default: '0',
      description: 'Valor mínimo permitido.'
    },
    {
      name: 'max',
      type: 'number',
      default: '100',
      description: 'Valor máximo permitido.'
    },
    {
      name: 'step',
      type: 'number',
      default: '1',
      description: 'Incremento de avance en cada desplazamiento.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Deshabilita la interacción con el control.'
    }
  ];

  sliderEvents: ApiEvent[] = [
    {
      name: 'onChange',
      parameters: '{ value: number }',
      description: 'Emitido cuando el valor finaliza su cambio.'
    }
  ];
}
