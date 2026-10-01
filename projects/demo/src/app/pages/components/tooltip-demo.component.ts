import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective, ButtonComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [CommonModule, TooltipDirective, ButtonComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Tooltip</h1>
      <p class="ox-description">
        Directiva de ayuda contextual flotante que aparece de forma suave al pasar el cursor o hacer foco en un elemento.
      </p>

      <!-- 1. POSICIONES -->
      <section class="ox-section">
        <h2>Posicionamiento del Tooltip</h2>
        <p>Soporte para 4 cuadrantes principales: <code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code>.</p>

        <div class="ox-card ox-p-4" style="margin-bottom: 1.5rem;">
          <div class="ox-flex ox-flex-wrap ox-gap-4 ox-align-items-center">
            <ox-button label="Arriba" oxTooltip="Información en la parte superior" tooltipPosition="top"></ox-button>
            <ox-button label="Abajo" oxTooltip="Información en la parte inferior" tooltipPosition="bottom" severity="secondary"></ox-button>
            <ox-button label="Izquierda" oxTooltip="Información a la izquierda" tooltipPosition="left" severity="info"></ox-button>
            <ox-button label="Derecha" oxTooltip="Información a la derecha" tooltipPosition="right" severity="warn"></ox-button>
          </div>
        </div>

        <app-doc-code 
          title="Tooltip Directiva"
          [htmlCode]="tooltipHtml"
          [tsCode]="tooltipTs">
        </app-doc-code>
      </section>

      <!-- API REFERENCE -->
      <section class="ox-section">
        <h2>API Reference &mdash; [oxTooltip] Directive</h2>
        <app-doc-api-table [properties]="tooltipProperties"></app-doc-api-table>
      </section>
    </div>
  `
})
export class TooltipDemoComponent {
  tooltipHtml = `<ox-button label="Arriba" oxTooltip="Mensaje en top" tooltipPosition="top"></ox-button>
<ox-button label="Abajo" oxTooltip="Mensaje en bottom" tooltipPosition="bottom"></ox-button>
<ox-button label="Izquierda" oxTooltip="Mensaje a la izquierda" tooltipPosition="left"></ox-button>
<ox-button label="Derecha" oxTooltip="Mensaje a la derecha" tooltipPosition="right"></ox-button>`;

  tooltipTs = `import { Component } from '@angular/core';
import { TooltipDirective, ButtonComponent } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [TooltipDirective, ButtonComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {}`;

  tooltipProperties: ApiProperty[] = [
    { name: 'oxTooltip', type: 'string', default: "''", description: 'Texto o mensaje a mostrar en el tooltip flotante.' },
    { name: 'tooltipPosition', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Posición relativa con respecto al elemento disparador.' },
    { name: 'tooltipDisabled', type: 'boolean', default: 'false', description: 'Desactiva la aparición del tooltip.' }
  ];
}