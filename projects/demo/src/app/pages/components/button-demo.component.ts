import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'valence-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="val-page-container">
      <h1>Button</h1>
      <p class="val-description">
        El componente Button se utiliza para disparar acciones o eventos con soporte de múltiples variantes, tamaños, iconos y estados de carga.
      </p>

      <!-- 1. BÁSICO -->
      <app-doc-code 
        title="1. Variantes de Color Sólido (Filled)" 
        description="Botones con fondo sólido para acciones primarias, secundarias y contextuales."
        [html]="basicHtml"
        [ts]="basicTs">
        <div class="demo-row">
          <val-button>Primary</val-button>
          <val-button variant="secondary">Secondary</val-button>
          <val-button variant="success">Success</val-button>
          <val-button variant="info">Info</val-button>
          <val-button variant="warning">Warning</val-button>
          <val-button variant="danger">Danger</val-button>
        </div>
      </app-doc-code>

      <!-- 2. OUTLINED -->
      <app-doc-code 
        title="2. Variantes Outlined" 
        description="Botones con borde definido y fondo transparente para acciones secundarias."
        [html]="outlinedHtml"
        [ts]="basicTs">
        <div class="demo-row">
          <val-button variant="outline-primary">Primary</val-button>
          <val-button variant="outline-secondary">Secondary</val-button>
          <val-button variant="outline-success">Success</val-button>
          <val-button variant="outline-warning">Warning</val-button>
          <val-button variant="outline-danger">Danger</val-button>
          <val-button variant="outline-info">Info</val-button>
        </div>
      </app-doc-code>

      <!-- 3. GHOST -->
      <app-doc-code 
        title="3. Variantes Ghost / Text" 
        description="Botones minimalistas sin borde para barras de herramientas o listas."
        [html]="ghostHtml"
        [ts]="basicTs">
        <div class="demo-row">
          <val-button variant="ghost-primary">Primary</val-button>
          <val-button variant="ghost-secondary">Secondary</val-button>
          <val-button variant="ghost-success">Success</val-button>
          <val-button variant="ghost-warning">Warning</val-button>
          <val-button variant="ghost-danger">Danger</val-button>
          <val-button variant="ghost-info">Info</val-button>
        </div>
      </app-doc-code>

      <!-- 4. TAMAÑOS -->
      <app-doc-code 
        title="4. Tamaños Disponibles" 
        description="Opciones de escala compacta, mediana y amplia."
        [html]="sizesHtml"
        [ts]="basicTs">
        <div class="demo-row val-align-items-center">
          <val-button size="sm">Small (sm)</val-button>
          <val-button size="md">Medium (md)</val-button>
          <val-button size="lg">Large (lg)</val-button>
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
  basicHtml = `<val-button>Primary</val-button>
<val-button variant="secondary">Secondary</val-button>
<val-button variant="success">Success</val-button>
<val-button variant="info">Info</val-button>
<val-button variant="warning">Warning</val-button>
<val-button variant="danger">Danger</val-button>`;

  outlinedHtml = `<val-button variant="outline-primary">Primary</val-button>
<val-button variant="outline-secondary">Secondary</val-button>
<val-button variant="outline-success">Success</val-button>
<val-button variant="outline-warning">Warning</val-button>
<val-button variant="outline-danger">Danger</val-button>
<val-button variant="outline-info">Info</val-button>`;

  ghostHtml = `<val-button variant="ghost-primary">Primary</val-button>
<val-button variant="ghost-secondary">Secondary</val-button>
<val-button variant="ghost-success">Success</val-button>
<val-button variant="ghost-warning">Warning</val-button>
<val-button variant="ghost-danger">Danger</val-button>
<val-button variant="ghost-info">Info</val-button>`;

  sizesHtml = `<val-button size="sm">Small</val-button>
<val-button size="md">Medium</val-button>
<val-button size="lg">Large</val-button>`;

  basicTs = `import { Component } from '@angular/core';
import { ButtonComponent } from 'valence-ui';

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