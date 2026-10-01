import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  CardComponent, 
  ButtonComponent, 
  OxCardBackDirective 
} from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-card-demo',
  standalone: true,
  imports: [
    CommonModule, 
    CardComponent, 
    ButtonComponent, 
    OxCardBackDirective,
    DocCodeComponent,
    DocApiTableComponent
  ],
  template: `
    <div class="ox-page-container">
      <h1>Card (Contenedor Flexible)</h1>
      <p class="ox-description">
        Contenedor flexible y extensible con múltiples variantes de elevación, efectos hover interactivos y soporte para tarjetas reversibles (*flippable*).
      </p>

      <!-- 1. BÁSICO -->
      <app-doc-code
        title="1. Tarjeta Básica"
        description="Contenedor estándar con bordes redondeados y sombra suave."
        [html]="basicHtml"
        [ts]="cardTs">
        <div class="demo-row">
          <ox-card style="width: 350px">
            <div style="padding: 1.5rem">
              <h3 style="margin-top: 0">Título de la Tarjeta</h3>
              <p style="color: #64748b; margin-bottom: 1.5rem">
                Este es el contenido de una tarjeta básica. Puedes colocar cualquier componente o estructura HTML adentro.
              </p>
              <ox-button size="sm">Acción</ox-button>
            </div>
          </ox-card>
        </div>
      </app-doc-code>

      <!-- 2. INTERACTIVA -->
      <app-doc-code
        title="2. Efectos Hover & Elevación"
        description="Propiedades liftOnHover y sombras configurables."
        [html]="hoverHtml"
        [ts]="cardTs">
        <div class="demo-row">
          <ox-card [hoverable]="true" [liftOnHover]="true" style="width: 300px">
            <div style="padding: 1.5rem">
              <h3 style="margin-top: 0">Tarjeta Interactiva</h3>
              <p style="color: #64748b">Pasa el cursor por encima para ver la animación de elevación.</p>
            </div>
          </ox-card>
          
          <ox-card boxShadow="lg" style="width: 300px">
            <div style="padding: 1.5rem">
              <h3 style="margin-top: 0">Sombra Elevada</h3>
              <p style="color: #64748b">Esta tarjeta cuenta con mayor profundidad visual.</p>
            </div>
          </ox-card>
        </div>
      </app-doc-code>

      <!-- 3. FLIPPABLE -->
      <app-doc-code
        title="3. Tarjeta Giratoria (Flippable)"
        description="Permite voltear la tarjeta con una animación 3D suave."
        [html]="flipHtml"
        [ts]="cardTs">
        <div class="demo-row">
          <ox-card [(flipped)]="isFlipped" style="width: 300px; height: 180px">
            <div style="padding: 1.5rem">
              <h3 style="margin-top: 0">Frente</h3>
              <p style="color: #64748b; margin-bottom: 1rem">Haz clic para ver el reverso.</p>
              <ox-button size="sm" (onClick)="isFlipped = !isFlipped">Girar</ox-button>
            </div>
            <div oxCardBack style="padding: 1.5rem; background: #f8fafc; height: 100%; border-radius: 8px;">
              <h3 style="margin-top: 0">Reverso</h3>
              <p style="color: #64748b; margin-bottom: 1rem">Contenido posterior.</p>
              <ox-button size="sm" variant="secondary" (onClick)="isFlipped = !isFlipped">Volver</ox-button>
            </div>
          </ox-card>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: CardComponent"
        [properties]="cardProps">
      </app-doc-api-table>
    </div>
  `,
  styles: [`
    .demo-row {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      align-items: center;
    }
  `]
})
export class CardDemoComponent {
  isFlipped = false;

  basicHtml = `<ox-card style="width: 350px">
  <div style="padding: 1.5rem">
    <h3>Card Title</h3>
    <p>Card content goes here.</p>
    <ox-button size="sm">Action</ox-button>
  </div>
</ox-card>`;

  hoverHtml = `<ox-card [hoverable]="true" [liftOnHover]="true" style="width: 300px">
  <div style="padding: 1.5rem">
    <h3>Interactive Card</h3>
  </div>
</ox-card>`;

  flipHtml = `<ox-card [flippable]="true" [(flipped)]="isFlipped" style="width: 300px; height: 180px">
  <div style="padding: 1.5rem">
    <h3>Frente</h3>
    <ox-button size="sm" (onClick)="isFlipped = !isFlipped">Girar</ox-button>
  </div>
  <div oxCardBack style="padding: 1.5rem">
    <h3>Reverso</h3>
    <ox-button size="sm" (onClick)="isFlipped = !isFlipped">Volver</ox-button>
  </div>
</ox-card>`;

  cardTs = `import { Component } from '@angular/core';
import { CardComponent, OxCardBackDirective, ButtonComponent } from 'oxygen-ui';

@Component({
  selector: 'app-my-card',
  standalone: true,
  imports: [CardComponent, OxCardBackDirective, ButtonComponent],
  templateUrl: './my-card.component.html'
})
export class MyCardComponent {
  isFlipped = false;
}`;

  cardProps: ApiProperty[] = [
    {
      name: 'hoverable',
      type: 'boolean',
      default: 'false',
      description: 'Añade transiciones y realce visual al pasar el cursor.'
    },
    {
      name: 'liftOnHover',
      type: 'boolean',
      default: 'false',
      description: 'Eleva la tarjeta verticalmente en el eje Y al hacer hover.'
    },
    {
      name: 'boxShadow',
      type: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
      default: "'sm'",
      description: 'Nivel de sombra y profundidad.'
    },
    {
      name: 'flippable',
      type: 'boolean',
      default: 'false',
      description: 'Habilita el comportamiento 3D de giro frente/reverso.'
    },
    {
      name: 'flipped',
      type: 'boolean',
      default: 'false',
      description: 'Estado actual de giro de la tarjeta (two-way binding).'
    }
  ];
}