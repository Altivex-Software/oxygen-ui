import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-checkbox-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Checkbox (Casilla de Verificación)</h1>
      <p class="ox-description">Componente de selección binaria para opciones individuales o múltiples.</p>

      <!-- 1. BÁSICO -->
      <app-doc-code
        title="1. Uso Básico y Estados"
        description="Casilla de verificación con two-way binding mediante [(checked)]."
        [html]="basicHtml"
        [ts]="checkboxTs">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <ox-checkbox label="Acepto los términos y condiciones" [(checked)]="terms"></ox-checkbox>
          <ox-checkbox label="Recibir boletín semanal (Deshabilitado)" [(checked)]="news" [disabled]="true"></ox-checkbox>
          <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #475569;">
            Estado términos: <b>{{ terms ? 'Aceptado' : 'Pendiente' }}</b>
          </p>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: CheckboxComponent"
        [properties]="checkboxProps"
        [events]="checkboxEvents">
      </app-doc-api-table>
    </div>
  `
})
export class CheckboxDemoComponent {
  terms = false;
  news = true;

  basicHtml = `<ox-checkbox 
  label="Acepto los términos y condiciones" 
  [(checked)]="terms">
</ox-checkbox>`;

  checkboxTs = `import { Component } from '@angular/core';
import { CheckboxComponent } from 'oxygen-ui';

@Component({
  selector: 'app-my-checkbox',
  standalone: true,
  imports: [CheckboxComponent],
  templateUrl: './my-checkbox.component.html'
})
export class MyCheckboxComponent {
  terms = false;
}`;

  checkboxProps: ApiProperty[] = [
    {
      name: 'label',
      type: 'string',
      default: "''",
      description: 'Texto de la etiqueta al lado de la casilla.'
    },
    {
      name: 'checked',
      type: 'boolean',
      default: 'false',
      description: 'Estado marcado/desmarcado de la casilla (two-way binding).'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Deshabilita la interacción con el control.'
    }
  ];

  checkboxEvents: ApiEvent[] = [
    {
      name: 'checkedChange',
      parameters: 'boolean',
      description: 'Emitido cuando el estado de la casilla cambia.'
    }
  ];
}