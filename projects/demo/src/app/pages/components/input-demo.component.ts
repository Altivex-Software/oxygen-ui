import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-input-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Input (Campo de Texto)</h1>
      <p class="ox-description">Campos de entrada de texto versátiles con soporte para etiquetas flotantes, validación y múltiples variantes de diseño.</p>

      <!-- 1. BÁSICO -->
      <app-doc-code
        title="1. Uso Básico y Etiquetas"
        description="Campos de entrada con placeholder y etiquetas superiores."
        [html]="basicHtml"
        [ts]="inputTs">
        <div class="demo-grid">
          <ox-input label="Nombre de usuario" placeholder="Ej. juanito123"></ox-input>
          <ox-input label="Correo Electrónico" placeholder="tu@email.com"></ox-input>
        </div>
      </app-doc-code>

      <!-- 2. ESTADOS -->
      <app-doc-code
        title="2. Estados de Validación y Ayuda"
        description="Modo deshabilitado, mensajes de error y pistas de ayuda."
        [html]="statesHtml"
        [ts]="inputTs">
        <div class="demo-grid">
          <ox-input label="Deshabilitado" [disabled]="true" [ngModel]="'No puedes tocar esto'"></ox-input>
          <ox-input label="Con error" error="El correo no es válido" [ngModel]="'correo@ejemplo'"></ox-input>
          <ox-input label="Ayuda" hint="Ingresa tu correo institucional"></ox-input>
        </div>
      </app-doc-code>

      <!-- 3. FLOAT LABEL & VARIANTES -->
      <app-doc-code
        title="3. Float Label y Variantes de Diseño"
        description="Etiquetas flotantes con estilos Standard, Fieldset y One Line."
        [html]="variantsHtml"
        [ts]="inputTs">
        <div class="demo-grid">
          <ox-input label="Variante Estándar" [floatLabel]="true" variant="default" placeholder=" "></ox-input>
          <ox-input label="Variante Fieldset" [floatLabel]="true" variant="fieldset"></ox-input>
          <ox-input label="Variante One Line" [floatLabel]="true" variant="oneLine" placeholder=" "></ox-input>
        </div>
      </app-doc-code>

      <!-- 4. TAMAÑOS -->
      <app-doc-code
        title="4. Tamaños"
        description="Escalas compacta (sm), estándar (md) y amplia (lg)."
        [html]="sizesHtml"
        [ts]="inputTs">
        <div class="demo-grid">
          <ox-input label="Pequeño" size="sm" placeholder="Input pequeño"></ox-input>
          <ox-input label="Mediano" size="md" placeholder="Input mediano"></ox-input>
          <ox-input label="Grande" size="lg" placeholder="Input grande"></ox-input>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: InputComponent"
        [properties]="inputProps">
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
export class InputDemoComponent {
  basicHtml = `<ox-input label="Nombre de usuario" placeholder="Ej. juanito123"></ox-input>
<ox-input label="Correo Electrónico" placeholder="tu@email.com"></ox-input>`;

  statesHtml = `<ox-input label="Deshabilitado" [disabled]="true" [ngModel]="'Solo lectura'"></ox-input>
<ox-input label="Con error" error="Correo inválido"></ox-input>
<ox-input label="Ayuda" hint="Ingresa tu correo"></ox-input>`;

  variantsHtml = `<ox-input label="Estándar" [floatLabel]="true" variant="default"></ox-input>
<ox-input label="Fieldset" [floatLabel]="true" variant="fieldset"></ox-input>
<ox-input label="One Line" [floatLabel]="true" variant="oneLine"></ox-input>`;

  sizesHtml = `<ox-input size="sm" placeholder="Small"></ox-input>
<ox-input size="md" placeholder="Medium"></ox-input>
<ox-input size="lg" placeholder="Large"></ox-input>`;

  inputTs = `import { Component } from '@angular/core';
import { InputComponent } from 'oxygen-ui';

@Component({
  selector: 'app-my-input',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './my-input.component.html'
})
export class MyInputComponent {}`;

  inputProps: ApiProperty[] = [
    {
      name: 'label',
      type: 'string',
      default: "''",
      description: 'Etiqueta superior o flotante del input.'
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "''",
      description: 'Texto de ayuda mostrado cuando el campo está vacío.'
    },
    {
      name: 'variant',
      type: "'default' | 'fieldset' | 'oneLine'",
      default: "'default'",
      description: 'Estilo visual del campo.'
    },
    {
      name: 'floatLabel',
      type: 'boolean',
      default: 'false',
      description: 'Desplaza la etiqueta hacia arriba al recibir foco o tener valor.'
    },
    {
      name: 'error',
      type: 'string',
      default: "''",
      description: 'Mensaje de error y resaltado rojo de validación.'
    },
    {
      name: 'hint',
      type: 'string',
      default: "''",
      description: 'Mensaje informativo o de ayuda inferior.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Deshabilita la edición del input.'
    }
  ];
}