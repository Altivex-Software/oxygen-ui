import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent, StepComponent } from 'oxygen-ui';

@Component({
  selector: 'app-stepper-demo',
  standalone: true,
  imports: [CommonModule, StepperComponent, StepComponent],
  template: `
    <div class="ox-page-container">
      <h1>Stepper</h1>
      <p class="ox-description">Guía a los usuarios a través de una serie de pasos para completar un proceso.</p>

      <section class="ox-section">
        <h2>Flujo de Registro</h2>
        <ox-stepper [headerNavigation]="true">
          <ox-step label="Cuenta">
            <div class="ox-p-4 ox-border rounded">
              <h3>Datos de Usuario</h3>
              <p>Por favor, ingresa tu correo y contraseña.</p>
            </div>
          </ox-step>
          <ox-step label="Perfil">
            <div class="ox-p-4 ox-border rounded">
              <h3>Tu Perfil</h3>
              <p>Sube una foto y cuéntanos sobre ti.</p>
            </div>
          </ox-step>
          <ox-step label="Finalizar">
            <div class="ox-p-4 ox-border rounded ox-text-center">
              <i class="pi pi-verified text-5xl text-green-500"></i>
              <h3>¡Todo listo!</h3>
              <p>Tu cuenta ha sido creada exitosamente.</p>
            </div>
          </ox-step>
        </ox-stepper>
      </section>
    </div>
  `
})
export class StepperDemoComponent {}