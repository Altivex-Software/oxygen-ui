import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-input-mask-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, InputMaskComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>InputMask</h1>
      <p class="ox-description">
        Campo de entrada estructurado que restringe y aplica automáticamente una máscara o plantilla a la entrada del usuario (teléfonos, fechas, identificadores).
      </p>

      <!-- 1. CASOS DE USO -->
      <app-doc-code 
        title="1. Patrones de Máscara Comunes"
        description="Formatos preestablecidos para teléfonos, fechas y matrículas."
        [htmlCode]="maskHtml"
        [tsCode]="maskTs">
        <div class="ox-flex ox-flex-column ox-gap-4" style="max-width: 400px; width: 100%;">
          
          <!-- Teléfono -->
          <div class="ox-flex ox-flex-column">
            <label class="ox-mb-2" style="font-weight: 600; font-size: 0.875rem;">Teléfono: (999) 999-9999</label>
            <ox-input-mask 
              mask="(999) 999-9999" 
              [(value)]="phone" 
              placeholder="(999) 999-9999">
            </ox-input-mask>
            <small class="ox-text-surface-500 ox-mt-1" style="color: #64748b; font-size: 0.75rem; margin-top: 4px;">Valor raw: {{ phone || 'Vacío' }}</small>
          </div>

          <!-- Fecha -->
          <div class="ox-flex ox-flex-column">
            <label class="ox-mb-2" style="font-weight: 600; font-size: 0.875rem;">Fecha: 99/99/9999</label>
            <ox-input-mask 
              mask="99/99/9999" 
              [(value)]="date" 
              placeholder="dd/mm/yyyy"
              slotChar="*">
            </ox-input-mask>
            <small class="ox-text-surface-500 ox-mt-1" style="color: #64748b; font-size: 0.75rem; margin-top: 4px;">Valor raw: {{ date || 'Vacío' }}</small>
          </div>

          <!-- Matrícula -->
          <div class="ox-flex ox-flex-column">
            <label class="ox-mb-2" style="font-weight: 600; font-size: 0.875rem;">Matrícula (Letras y Números): a-9999-aa</label>
            <ox-input-mask 
              mask="a-9999-aa" 
              [(value)]="plate" 
              placeholder="a-9999-aa">
            </ox-input-mask>
            <small class="ox-text-surface-500 ox-mt-1" style="color: #64748b; font-size: 0.75rem; margin-top: 4px;">Valor raw: {{ plate || 'Vacío' }}</small>
          </div>

        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: InputMaskComponent"
        [properties]="inputMaskProperties" 
        [events]="inputMaskEvents">
      </app-doc-api-table>
    </div>
  `
})
export class InputMaskDemoComponent {
  phone = '';
  date = '';
  plate = '';

  maskHtml = `<ox-input-mask 
  mask="(999) 999-9999" 
  [(value)]="phone" 
  placeholder="(999) 999-9999">
</ox-input-mask>

<ox-input-mask 
  mask="99/99/9999" 
  [(value)]="date" 
  slotChar="*">
</ox-input-mask>`;

  maskTs = `import { Component } from '@angular/core';
import { InputMaskComponent } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [InputMaskComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {
  phone = '';
  date = '';
}`;

  inputMaskProperties: ApiProperty[] = [
    { name: 'mask', type: 'string', default: "''", description: 'Patrón de formato (9 para dígito, a para letra, * para alfanumérico).' },
    { name: 'value', type: 'string', default: "''", description: 'Valor del input (soporta [(value)]).' },
    { name: 'placeholder', type: 'string', default: "''", description: 'Texto sugerido cuando el input está vacío.' },
    { name: 'slotChar', type: 'string', default: "'_'", description: 'Carácter placeholder que representa posiciones no rellenadas.' },
    { name: 'autoClear', type: 'boolean', default: 'true', description: 'Limpia el input si el usuario no completó toda la máscara.' }
  ];

  inputMaskEvents: ApiEvent[] = [
    { name: 'valueChange', parameters: 'string', description: 'Se emite al modificarse el valor con la máscara aplicada.' },
    { name: 'onComplete', parameters: 'string', description: 'Se dispara cuando el usuario completa todos los slots de la máscara.' }
  ];
}
