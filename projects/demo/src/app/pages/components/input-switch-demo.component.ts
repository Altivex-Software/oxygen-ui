import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputSwitchComponent } from 'oxygen-ui';

@Component({
  selector: 'app-input-switch-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, InputSwitchComponent],
  template: `
    <div class="ox-page-container">
      <h1>Input Switch</h1>
      <p class="ox-description">Interruptor binario para estados activado/desactivado.</p>

      <section class="ox-section">
        <h2>Básico</h2>
        <div class="ox-flex ox-align-items-center ox-gap-4">
          <ox-input-switch [(ngModel)]="checked"></ox-input-switch>
          <span>{{ checked ? 'Activado' : 'Desactivado' }}</span>
        </div>
      </section>

      <section class="ox-section">
        <h2>Colores</h2>
        <div class="ox-flex ox-flex-column ox-gap-4">
          <div class="ox-flex ox-align-items-center ox-gap-2">
            <ox-input-switch color="primary" [(ngModel)]="checked1"></ox-input-switch>
            <span>Primario</span>
          </div>
          <div class="ox-flex ox-align-items-center ox-gap-2">
            <ox-input-switch color="success" [(ngModel)]="checked2"></ox-input-switch>
            <span>Éxito</span>
          </div>
          <div class="ox-flex ox-align-items-center ox-gap-2">
            <ox-input-switch color="danger" [(ngModel)]="checked3"></ox-input-switch>
            <span>Peligro</span>
          </div>
        </div>
      </section>

      <section class="ox-section">
        <h2>Estados</h2>
        <div class="ox-flex ox-flex-column ox-gap-4">
          <div class="ox-flex ox-align-items-center ox-gap-2">
            <ox-input-switch [disabled]="true" [ngModel]="true"></ox-input-switch>
            <span>Deshabilitado activado</span>
          </div>
          <div class="ox-flex ox-align-items-center ox-gap-2">
            <ox-input-switch [disabled]="true" [ngModel]="false"></ox-input-switch>
            <span>Deshabilitado desactivado</span>
          </div>
        </div>
      </section>
    </div>
  `
})
export class InputSwitchDemoComponent {
  checked = true;
  checked1 = true;
  checked2 = true;
  checked3 = true;
}
