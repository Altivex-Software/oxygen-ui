import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent, InputSwitchComponent } from 'oxygen-ui';

@Component({
  selector: 'app-checkbox-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxComponent, InputSwitchComponent],
  template: `
    <div class="ox-page-container">
      <h1>Checkbox & Switch</h1>
      <p class="ox-description">Componentes de selección binaria para opciones y estados de encendido/apagado.</p>

      <section class="ox-section">
        <h2>Checkbox</h2>
        <div class="ox-flex ox-flex-column ox-gap-4">
          <ox-checkbox label="Acepto los términos y condiciones" [(checked)]="terms"></ox-checkbox>
          <ox-checkbox label="Recibir newsletter" [(checked)]="news" [disabled]="true"></ox-checkbox>
        </div>
        <p class="ox-mt-4">Estado términos: <b>{{ terms ? 'Aceptado' : 'Pendiente' }}</b></p>
      </section>

      <section class="ox-section">
        <h2>Input Switch</h2>
        <div class="ox-flex ox-flex-column ox-gap-6">
          <div class="switch-container">
            <span>Modo Oscuro</span>
            <ox-input-switch [(checked)]="darkMode"></ox-input-switch>
          </div>
          <div class="switch-container">
            <span>Notificaciones Push</span>
            <ox-input-switch [(checked)]="notifications"></ox-input-switch>
          </div>
        </div>
      </section>
    </div>
  `
})
export class CheckboxDemoComponent {
  terms = false;
  news = true;
  darkMode = false;
  notifications = true;
}