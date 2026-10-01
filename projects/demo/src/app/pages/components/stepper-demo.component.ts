import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent, StepComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-stepper-demo',
  standalone: true,
  imports: [CommonModule, StepperComponent, StepComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Stepper</h1>
      <p class="ox-description">
        Guía a los usuarios paso a paso a través de flujos lineales de procesos, asistentes (wizards) o registros.
      </p>

      <!-- 1. BÁSICO -->
      <app-doc-code 
        title="1. Flujo Asistente (Wizard)"
        description="Paso a paso interactivo con soporte de navegación en encabezados."
        [htmlCode]="stepperHtml"
        [tsCode]="stepperTs">
        <div style="width: 100%;">
          <ox-stepper [headerNavigation]="true">
            <ox-step label="Cuenta">
              <div style="padding: 1.5rem; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 1rem;">
                <h3 style="margin-top: 0;">Paso 1: Datos de Usuario</h3>
                <p style="color: #64748b; font-size: 0.875rem;">Ingresa tu correo y define tus credenciales de acceso.</p>
              </div>
            </ox-step>
            <ox-step label="Perfil">
              <div style="padding: 1.5rem; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 1rem;">
                <h3 style="margin-top: 0;">Paso 2: Información Personal</h3>
                <p style="color: #64748b; font-size: 0.875rem;">Completa tus datos profesionales y preferencias de cuenta.</p>
              </div>
            </ox-step>
            <ox-step label="Finalizar">
              <div style="padding: 1.5rem; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 1rem; text-align: center;">
                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🎉</div>
                <h3 style="margin-top: 0;">¡Todo listo!</h3>
                <p style="color: #64748b; font-size: 0.875rem;">Tu proceso de configuración se ha completado con éxito.</p>
              </div>
            </ox-step>
          </ox-stepper>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: StepperComponent"
        [properties]="stepperProperties">
      </app-doc-api-table>
    </div>
  `
})
export class StepperDemoComponent {
  stepperHtml = `<ox-stepper [headerNavigation]="true">
  <ox-step label="Cuenta">
    <p>Contenido del paso 1.</p>
  </ox-step>
  <ox-step label="Perfil">
    <p>Contenido del paso 2.</p>
  </ox-step>
  <ox-step label="Confirmación">
    <p>Contenido del paso 3.</p>
  </ox-step>
</ox-stepper>`;

  stepperTs = `import { Component } from '@angular/core';
import { StepperComponent, StepComponent } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [StepperComponent, StepComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {}`;

  stepperProperties: ApiProperty[] = [
    { name: 'activeStep', type: 'number', default: '0', description: 'Índice del paso activo (0-indexed).' },
    { name: 'headerNavigation', type: 'boolean', default: 'false', description: 'Permite hacer clic directamente en los encabezados de los pasos para navegar.' },
    { name: 'linear', type: 'boolean', default: 'false', description: 'Obliga a completar los pasos en orden secuencial.' }
  ];
}