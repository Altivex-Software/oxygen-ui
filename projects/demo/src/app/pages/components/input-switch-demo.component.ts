import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputSwitchComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-input-switch-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, InputSwitchComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Input Switch (Interruptor)</h1>
      <p class="ox-description">Interruptor binario para alternar estados activado/desactivado con animación suave.</p>

      <!-- 1. BÁSICO -->
      <app-doc-code
        title="1. Uso Básico"
        description="Interruptor de alternancia vinculado mediante ngModel."
        [html]="basicHtml"
        [ts]="switchTs">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <ox-input-switch [(ngModel)]="checked"></ox-input-switch>
          <span style="font-size: 0.875rem; font-weight: 500; color: #334155;">{{ checked ? 'Activado' : 'Desactivado' }}</span>
        </div>
      </app-doc-code>

      <!-- 2. COLORES -->
      <app-doc-code
        title="2. Variantes de Color"
        description="Colores primario, éxito y peligro."
        [html]="colorsHtml"
        [ts]="switchTs">
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <ox-input-switch color="primary" [(ngModel)]="checked1"></ox-input-switch>
            <span style="font-size: 0.875rem;">Primario</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <ox-input-switch color="success" [(ngModel)]="checked2"></ox-input-switch>
            <span style="font-size: 0.875rem;">Éxito</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <ox-input-switch color="danger" [(ngModel)]="checked3"></ox-input-switch>
            <span style="font-size: 0.875rem;">Peligro</span>
          </div>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: InputSwitchComponent"
        [properties]="switchProps"
        [events]="switchEvents">
      </app-doc-api-table>
    </div>
  `
})
export class InputSwitchDemoComponent {
  checked = true;
  checked1 = true;
  checked2 = true;
  checked3 = true;

  basicHtml = `<ox-input-switch [(ngModel)]="checked"></ox-input-switch>`;
  colorsHtml = `<ox-input-switch color="success" [(ngModel)]="checked"></ox-input-switch>`;

  switchTs = `import { Component } from '@angular/core';
import { InputSwitchComponent } from 'oxygen-ui';

@Component({
  selector: 'app-my-switch',
  standalone: true,
  imports: [InputSwitchComponent],
  templateUrl: './my-switch.component.html'
})
export class MySwitchComponent {
  checked = true;
}`;

  switchProps: ApiProperty[] = [
    {
      name: 'color',
      type: "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'",
      default: "'primary'",
      description: 'Color del interruptor cuando está activado.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Deshabilita la alternancia del interruptor.'
    }
  ];

  switchEvents: ApiEvent[] = [
    {
      name: 'onChange',
      parameters: 'OxygenChangeEvent',
      description: 'Emitido cuando el estado del switch cambia.'
    }
  ];
}
