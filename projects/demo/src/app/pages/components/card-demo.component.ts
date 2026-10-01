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
            <h3 style="margin-top: 0; font-size: 1.125rem;">Título de la Tarjeta</h3>
            <p style="color: #64748b; margin-bottom: 1.25rem; font-size: 0.875rem; line-height: 1.5;">
              Este es el contenido de una tarjeta básica. Puedes colocar cualquier componente o estructura HTML adentro.
            </p>
            <ox-button size="sm" label="Acción"></ox-button>
          </ox-card>
        </div>
      </app-doc-code>

      <!-- 2. INTERACTIVA Y ELEVACIÓN -->
      <app-doc-code
        title="2. Efectos Hover & Elevación"
        description="Propiedades liftOnHover y sombras configurables."
        [html]="hoverHtml"
        [ts]="cardTs">
        <div class="demo-row">
          <ox-card [hoverable]="true" [liftOnHover]="true" style="width: 300px">
            <h3 style="margin-top: 0; font-size: 1.125rem;">Tarjeta Interactiva</h3>
            <p style="color: #64748b; font-size: 0.875rem;">Pasa el cursor por encima para ver la animación de elevación.</p>
          </ox-card>
          
          <ox-card boxShadow="lg" style="width: 300px">
            <h3 style="margin-top: 0; font-size: 1.125rem;">Sombra Elevada</h3>
            <p style="color: #64748b; font-size: 0.875rem;">Esta tarjeta cuenta con mayor profundidad visual con sombra de nivel lg.</p>
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
          <ox-card [(flipped)]="isFlipped" style="width: 320px; height: 190px">
            <div>
              <h3 style="margin-top: 0; font-size: 1.125rem;">Frente</h3>
              <p style="color: #64748b; margin-bottom: 1rem; font-size: 0.875rem;">Haz clic para ver el reverso de la tarjeta.</p>
              <ox-button size="sm" label="Girar 🔄" (onClick)="isFlipped = !isFlipped"></ox-button>
            </div>
            <div oxCardBack style="padding: 1.5rem; background: #ffffff; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="margin-top: 0; font-size: 1.125rem; color: #1e293b;">Reverso</h3>
                <p style="color: #64748b; font-size: 0.875rem;">Contenido posterior con soporte 3D.</p>
              </div>
              <div>
                <ox-button size="sm" severity="secondary" label="Volver al Frente" (onClick)="isFlipped = !isFlipped"></ox-button>
              </div>
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
  <h3>Título de la Tarjeta</h3>
  <p>Este es el contenido de una tarjeta básica.</p>
  <ox-button size="sm" label="Acción"></ox-button>
</ox-card>`;

  hoverHtml = `<ox-card [hoverable]="true" [liftOnHover]="true" style="width: 300px">
  <h3>Tarjeta Interactiva</h3>
  <p>Pasa el cursor por encima para ver la animación.</p>
</ox-card>

<ox-card boxShadow="lg" style="width: 300px">
  <h3>Sombra Elevada</h3>
  <p>Mayor profundidad visual.</p>
</ox-card>`;

  flipHtml = `<ox-card [(flipped)]="isFlipped" style="width: 320px; height: 190px">
  <div>
    <h3>Frente</h3>
    <ox-button size="sm" label="Girar" (onClick)="isFlipped = !isFlipped"></ox-button>
  </div>
  <div oxCardBack>
    <h3>Reverso</h3>
    <ox-button size="sm" severity="secondary" label="Volver" (onClick)="isFlipped = !isFlipped"></ox-button>
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
      name: 'bordered',
      type: 'boolean',
      default: 'true',
      description: 'Muestra u oculta el borde sutil de la tarjeta.'
    },
    {
      name: 'flipped',
      type: 'boolean',
      default: 'false',
      description: 'Estado actual de giro de la tarjeta (two-way binding).'
    }
  ];
}