import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OtpComponent } from 'oxygen-ui';

@Component({
  selector: 'app-otp-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, OtpComponent],
  template: `
    <div class="ox-page-container">
      <h1>OTP</h1>
      <p class="ox-description">Campo de verificación de un solo uso.</p>

      <section class="ox-section">
        <h2>Básico (6 dígitos)</h2>
        <div class="ox-flex ox-justify-content-center">
          <ox-otp [(ngModel)]="otpValue"></ox-otp>
        </div>
        <p class="ox-text-center ox-mt-4">Código: {{ otpValue }}</p>
      </section>

      <section class="ox-section">
        <h2>Personalizado (4 dígitos)</h2>
        <div class="ox-flex ox-justify-content-center">
          <ox-otp [length]="4" [(ngModel)]="otpValue4"></ox-otp>
        </div>
      </section>
    </div>
  `
})
export class OtpDemoComponent {
  otpValue = '';
  otpValue4 = '';
}
