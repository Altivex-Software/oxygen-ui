import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OtpComponent } from 'valence-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-otp-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, OtpComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="val-page-container">
      <h1>OTP (One-Time Password)</h1>
      <p class="val-description">Entrada estructurada de dígitos de verificación por SMS o correo con salto automático de foco.</p>

      <!-- 1. BÁSICO (6 DÍGITOS) -->
      <app-doc-code
        title="1. Verificación Estándar (6 Dígitos)"
        description="Entrada de 6 dígitos con auto-enfoque y pegado rápido."
        [html]="basicHtml"
        [ts]="otpTs">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
          <val-otp [(ngModel)]="otpValue"></val-otp>
          <p style="font-size: 0.875rem; color: #475569;">Código ingresado: <b>{{ otpValue || 'Vacío' }}</b></p>
        </div>
      </app-doc-code>

      <!-- 2. PERSONALIZADO (4 DÍGITOS) -->
      <app-doc-code
        title="2. Longitud Personalizada (4 Dígitos / PIN)"
        description="Configuración de longitud mediante la propiedad [length]='4'."
        [html]="fourHtml"
        [ts]="otpTs">
        <div style="display: flex; justify-content: center;">
          <val-otp [length]="4" [(ngModel)]="otpValue4"></val-otp>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: OtpComponent"
        [properties]="otpProps"
        [events]="otpEvents">
      </app-doc-api-table>
    </div>
  `
})
export class OtpDemoComponent {
  otpValue = '';
  otpValue4 = '';

  basicHtml = `<val-otp [(ngModel)]="otpValue"></val-otp>`;
  fourHtml = `<val-otp [length]="4" [(ngModel)]="otpValue4"></val-otp>`;

  otpTs = `import { Component } from '@angular/core';
import { OtpComponent } from 'valence-ui';

@Component({
  selector: 'app-my-otp',
  standalone: true,
  imports: [OtpComponent],
  templateUrl: './my-otp.component.html'
})
export class MyOtpComponent {
  otpValue = '';
}`;

  otpProps: ApiProperty[] = [
    {
      name: 'length',
      type: 'number',
      default: '6',
      description: 'Cantidad de casillas para dígitos del código.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Deshabilita la entrada de caracteres.'
    },
    {
      name: 'mask',
      type: 'boolean',
      default: 'false',
      description: 'Oculta los números ingresados como contraseña (*).'
    }
  ];

  otpEvents: ApiEvent[] = [
    {
      name: 'onComplete',
      parameters: '{ value: string }',
      description: 'Emitido automáticamente cuando todos los dígitos han sido completados.'
    }
  ];
}
