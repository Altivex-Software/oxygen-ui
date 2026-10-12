import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordComponent } from 'valence-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-password-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, PasswordComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="val-page-container">
      <h1>Password (Campo de Contraseña)</h1>
      <p class="val-description">Campo seguro con botón toggle integrado para alternar visibilidad (mostrar/ocultar contraseña).</p>

      <!-- 1. BÁSICO -->
      <app-doc-code
        title="1. Uso Básico"
        description="Campo de contraseña con botón para alternar texto claro y cifrado."
        [html]="basicHtml"
        [ts]="passTs">
        <div style="max-width: 360px;">
          <val-password 
            label="Contraseña" 
            placeholder="Ingresa tu clave"
            [(ngModel)]="pass1">
          </val-password>
          <p style="margin-top: 0.5rem; font-size: 0.8125rem; color: #64748b;">Valor actual: {{ pass1 }}</p>
        </div>
      </app-doc-code>

      <!-- 2. VARIANTES -->
      <app-doc-code
        title="2. Variantes de Diseño"
        description="Estilos: Estándar, Fieldset y One Line con Float Label."
        [html]="variantsHtml"
        [ts]="passTs">
        <div class="demo-grid">
          <val-password label="Estándar" variant="default" [(ngModel)]="v1"></val-password>
          <val-password label="Fieldset" variant="fieldset" [floatLabel]="true" [(ngModel)]="v2"></val-password>
          <val-password label="One Line" variant="oneLine" [floatLabel]="true" [(ngModel)]="v3"></val-password>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: PasswordComponent"
        [properties]="passProps">
      </app-doc-api-table>
    </div>
  `,
  styles: [`
    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
    }
  `]
})
export class PasswordDemoComponent {
  pass1 = '';
  v1 = '';
  v2 = '';
  v3 = '';

  basicHtml = `<val-password 
  label="Contraseña" 
  placeholder="Ingresa tu clave"
  [(ngModel)]="password">
</val-password>`;

  variantsHtml = `<val-password label="Fieldset" variant="fieldset" [floatLabel]="true"></val-password>
<val-password label="One Line" variant="oneLine" [floatLabel]="true"></val-password>`;

  passTs = `import { Component } from '@angular/core';
import { PasswordComponent } from 'valence-ui';

@Component({
  selector: 'app-my-password',
  standalone: true,
  imports: [PasswordComponent],
  templateUrl: './my-password.component.html'
})
export class MyPasswordComponent {
  password = '';
}`;

  passProps: ApiProperty[] = [
    {
      name: 'label',
      type: 'string',
      default: "''",
      description: 'Etiqueta del campo.'
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "''",
      description: 'Texto de ayuda inicial.'
    },
    {
      name: 'toggleMask',
      type: 'boolean',
      default: 'true',
      description: 'Muestra el icono para alternar entre mostrar y ocultar caracteres.'
    },
    {
      name: 'floatLabel',
      type: 'boolean',
      default: 'false',
      description: 'Habilita etiqueta flotante.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Deshabilita la edición del campo.'
    }
  ];
}
