import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective, ButtonComponent } from 'valence-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [CommonModule, TooltipDirective, ButtonComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="val-page-container">
      <h1>Tooltip</h1>
      <p class="val-description">
        Directiva de ayuda contextual flotante que aparece de forma suave al pasar el cursor o hacer foco en un elemento.
      </p>

      <!-- 1. POSICIONES -->
      <app-doc-code 
        title="1. Posicionamiento del Tooltip"
        description="Soporte para 4 cuadrantes principales: top, bottom, left, right."
        [htmlCode]="tooltipHtml"
        [tsCode]="tooltipTs">
        <div class="val-flex val-flex-wrap val-gap-4 val-align-items-center">
          <val-button label="Arriba" valTooltip="Información en la parte superior" tooltipPosition="top"></val-button>
          <val-button label="Abajo" valTooltip="Información en la parte inferior" tooltipPosition="bottom" severity="secondary"></val-button>
          <val-button label="Izquierda" valTooltip="Información a la izquierda" tooltipPosition="left" severity="info"></val-button>
          <val-button label="Derecha" valTooltip="Información a la derecha" tooltipPosition="right" severity="warn"></val-button>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: TooltipDirective"
        [properties]="tooltipProperties">
      </app-doc-api-table>
    </div>
  `
})
export class TooltipDemoComponent {
  tooltipHtml = `<val-button label="Arriba" valTooltip="Mensaje en top" tooltipPosition="top"></val-button>
<val-button label="Abajo" valTooltip="Mensaje en bottom" tooltipPosition="bottom"></val-button>
<val-button label="Izquierda" valTooltip="Mensaje a la izquierda" tooltipPosition="left"></val-button>
<val-button label="Derecha" valTooltip="Mensaje a la derecha" tooltipPosition="right"></val-button>`;

  tooltipTs = `import { Component } from '@angular/core';
import { TooltipDirective, ButtonComponent } from 'valence-ui';

@Component({
  standalone: true,
  imports: [TooltipDirective, ButtonComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {}`;

  tooltipProperties: ApiProperty[] = [
    { name: 'valTooltip', type: 'string', default: "''", description: 'Texto o mensaje a mostrar en el tooltip flotante.' },
    { name: 'tooltipPosition', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Posición relativa con respecto al elemento disparador.' },
    { name: 'tooltipDisabled', type: 'boolean', default: 'false', description: 'Desactiva la aparición del tooltip.' }
  ];
}