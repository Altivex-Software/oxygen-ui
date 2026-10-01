import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Button</h1>
      <p class="ox-description">
        El componente Button se utiliza para disparar acciones o eventos con soporte de múltiples variantes, tamaños, iconos y estados de carga.
      </p>

      <!-- 1. BÁSICO -->
      <app-doc-code 
        title="1. Variantes de Color Sólido (Filled)" 
        description="Botones con fondo sólido para acciones primarias, secundarias y contextuales."
        [html]="basicHtml"
        [ts]="basicTs">
        <div class="demo-row">
          <ox-button>Primary</ox-button>
          <ox-button variant="secondary">Secondary</ox-button>
          <ox-button variant="success">Success</ox-button>
          <ox-button variant="info">Info</ox-button>
          <ox-button variant="warning">Warning</ox-button>
          <ox-button variant="danger">Danger</ox-button>
        </div>
      </app-doc-code>

      <!-- 2. OUTLINED -->
      <app-doc-code 
        title="2. Variantes Outlined" 
        description="Botones con borde definido y fondo transparente para acciones secundarias."
        [html]="outlinedHtml"
        [ts]="basicTs">
        <div class="demo-row">
          <ox-button variant="outline-primary">Primary</ox-button>
          <ox-button variant="outline-secondary">Secondary</ox-button>
          <ox-button variant="outline-success">Success</ox-button>
          <ox-button variant="outline-warning">Warning</ox-button>
          <ox-button variant="outline-danger">Danger</ox-button>
          <ox-button variant="outline-info">Info</ox-button>
        </div>
      </app-doc-code>

      <!-- 3. GHOST -->
      <app-doc-code 
        title="3. Variantes Ghost / Text" 
        description="Botones minimalistas sin borde para barras de herramientas o listas."
        [html]="ghostHtml"
        [ts]="basicTs">
        <div class="demo-row">
          <ox-button variant="ghost-primary">Primary</ox-button>
          <ox-button variant="ghost-secondary">Secondary</ox-button>
          <ox-button variant="ghost-success">Success</ox-button>
          <ox-button variant="ghost-warning">Warning</ox-button>
          <ox-button variant="ghost-danger">Danger</ox-button>
          <ox-button variant="ghost-info">Info</ox-button>
        </div>
      </app-doc-code>

      <!-- 4. TAMAÑOS -->
      <app-doc-code 
        title="4. Tamaños Disponibles" 
        description="Opciones de escala compacta, mediana y amplia."
        [html]="sizesHtml"
        [ts]="basicTs">
        <div class="demo-row ox-align-items-center">
          <ox-button size="sm">Small (sm)</ox-button>
          <ox-button size="md">Medium (md)</ox-button>
          <ox-button size="lg">Large (lg)</ox-button>
        </div>
      </app-doc-code>

      <!-- API DOCUMENTATION -->
      <app-doc-api-table 
        title="API Reference: ButtonComponent"
        [properties]="buttonProps"
        [events]="buttonEvents">
      </app-doc-api-table>
    </div>
  `,
  styles: [`
    .demo-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      align-items: center;
    }
  `]
})
export class ButtonDemoComponent {
  basicHtml = `<ox-button>Primary</ox-button>
<ox-button variant="secondary">Secondary</ox-button>
<ox-button variant="success">Success</ox-button>
<ox-button variant="info">Info</ox-button>
<ox-button variant="warning">Warning</ox-button>
<ox-button variant="danger">Danger</ox-button>`;

  outlinedHtml = `<ox-button variant="outline-primary">Primary</ox-button>
<ox-button variant="outline-secondary">Secondary</ox-button>
<ox-button variant="outline-success">Success</ox-button>
<ox-button variant="outline-warning">Warning</ox-button>
<ox-button variant="outline-danger">Danger</ox-button>
<ox-button variant="outline-info">Info</ox-button>`;

  ghostHtml = `<ox-button variant="ghost-primary">Primary</ox-button>
<ox-button variant="ghost-secondary">Secondary</ox-button>
<ox-button variant="ghost-success">Success</ox-button>
<ox-button variant="ghost-warning">Warning</ox-button>
<ox-button variant="ghost-danger">Danger</ox-button>
<ox-button variant="ghost-info">Info</ox-button>`;

  sizesHtml = `<ox-button size="sm">Small</ox-button>
<ox-button size="md">Medium</ox-button>
<ox-button size="lg">Large</ox-button>`;

  basicTs = `import { Component } from '@angular/core';
import { ButtonComponent } from 'oxygen-ui';

@Component({
  selector: 'app-my-button-demo',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './my-button-demo.component.html'
})
export class MyButtonDemoComponent {}`;

  buttonProps: ApiProperty[] = [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'outline-*' | 'ghost-*'",
      default: "'primary'",
      description: 'Estilo visual y color de realce del botón.'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Tamaño y espaciado del botón.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Deshabilita la interacción y atenúa visualmente el botón.'
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: 'Muestra un indicador spinner animado y previene clics.'
    },
    {
      name: 'icon',
      type: 'string',
      default: 'null',
      description: 'Icono o texto que acompaña la etiqueta del botón.'
    }
  ];

  buttonEvents: ApiEvent[] = [
    {
      name: 'onClick',
      parameters: 'MouseEvent',
      description: 'Emitido cuando el usuario hace clic sobre el botón si no está deshabilitado.'
    }
  ];
}