import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective, ButtonComponent } from 'oxygen-ui';

@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [CommonModule, TooltipDirective, ButtonComponent],
  template: `
    <div class="ox-page-container">
      <h1>Tooltip</h1>
      <p class="ox-description">Información contextual que aparece al pasar el ratón por encima de un elemento.</p>

      <section class="ox-section">
        <h2>Posiciones</h2>
        <div class="ox-flex ox-flex-wrap ox-gap-4">
          <ox-button label="Arriba" oxTooltip="Mensaje superior" tooltipPosition="top"></ox-button>
          <ox-button label="Abajo" oxTooltip="Mensaje inferior" tooltipPosition="bottom" severity="secondary"></ox-button>
          <ox-button label="Izquierda" oxTooltip="Mensaje izquierdo" tooltipPosition="left" severity="info"></ox-button>
          <ox-button label="Derecha" oxTooltip="Mensaje derecho" tooltipPosition="right" severity="warn"></ox-button>
        </div>
      </section>
    </div>
  `
})
export class TooltipDemoComponent {}