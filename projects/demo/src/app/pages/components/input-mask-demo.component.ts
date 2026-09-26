import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'oxygen-ui';

@Component({
  selector: 'app-input-mask-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, InputMaskComponent],
  template: `
    <div class="ox-page-container">
      <h1>InputMask</h1>
      <p class="ox-description">Permite dar formato a los datos ingresados por el usuario según un patrón definido.</p>

      <section class="ox-section">
        <h2>Casos de Uso Comunes</h2>
        <div class="ox-card ox-p-4">
          <div class="ox-flex ox-flex-column ox-gap-4" style="max-width: 400px">
            
            <!-- Teléfono -->
            <div class="ox-flex ox-flex-column">
              <label class="ox-mb-2">Teléfono: (999) 999-9999</label>
              <ox-input-mask 
                mask="(999) 999-9999" 
                [(value)]="phone" 
                placeholder="(999) 999-9999">
              </ox-input-mask>
              <small class="ox-text-surface-500 ox-mt-1">Valor en bruto: {{ phone || 'Vacío' }}</small>
            </div>

            <!-- Fecha -->
            <div class="ox-flex ox-flex-column">
              <label class="ox-mb-2">Fecha: 99/99/9999</label>
              <ox-input-mask 
                mask="99/99/9999" 
                [(value)]="date" 
                placeholder="dd/mm/yyyy"
                slotChar="*">
              </ox-input-mask>
              <small class="ox-text-surface-500 ox-mt-1">Valor en bruto: {{ date || 'Vacío' }}</small>
            </div>

            <!-- Matrícula -->
            <div class="ox-flex ox-flex-column">
              <label class="ox-mb-2">Matrícula (Letras y Números): a-9999-aa</label>
              <ox-input-mask 
                mask="a-9999-aa" 
                [(value)]="plate" 
                placeholder="a-9999-aa">
              </ox-input-mask>
              <small class="ox-text-surface-500 ox-mt-1">Valor en bruto: {{ plate || 'Vacío' }}</small>
            </div>

          </div>
        </div>
      </section>

      <section class="ox-section">
        <h2>Variantes (Estilos)</h2>
        <div class="ox-card ox-p-4">
          <div class="ox-flex ox-flex-column ox-gap-4" style="max-width: 400px">
            <ox-input-mask mask="99-999999" placeholder="Default"></ox-input-mask>
            <ox-input-mask mask="99-999999" placeholder="Filled" variant="filled"></ox-input-mask>
            <ox-input-mask mask="99-999999" placeholder="Outlined" variant="outlined"></ox-input-mask>
            <ox-input-mask mask="99-999999" label="Documento" variant="fieldset"></ox-input-mask>
            <ox-input-mask mask="99-999999" placeholder="One Line" variant="oneLine"></ox-input-mask>
            <ox-input-mask mask="(999) 999-9999" placeholder="Danger + sm" variant="filled" severity="danger" size="sm"></ox-input-mask>
          </div>
        </div>
      </section>
    </div>
  `
})
export class InputMaskDemoComponent {
  phone = '';
  date = '';
  plate = '';
}
