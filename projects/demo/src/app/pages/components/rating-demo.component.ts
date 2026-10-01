import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-rating-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, RatingComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Rating (Calificación por Estrellas)</h1>
      <p class="ox-description">Sistema de puntuación visual interactivo con soporte para escalas personalizadas y cancelación.</p>

      <!-- 1. BÁSICO -->
      <app-doc-code
        title="1. Puntuación Estándar (5 estrellas)"
        description="Selección de calificación vinculada mediante [(ngModel)]."
        [html]="basicHtml"
        [ts]="ratingTs">
        <div>
          <ox-rating [(ngModel)]="value"></ox-rating>
          <p style="margin-top: 0.75rem; font-size: 0.875rem; color: #475569;">
            Puntuación actual: <b>{{ value }} / 5</b>
          </p>
        </div>
      </app-doc-code>

      <!-- 2. ESCALA PERSONALIZADA -->
      <app-doc-code
        title="2. Escala Ampliada (10 estrellas)"
        description="Configuración de límite máximo mediante la propiedad [max]='10'."
        [html]="maxHtml"
        [ts]="ratingTs">
        <ox-rating [max]="10" [(ngModel)]="value10"></ox-rating>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: RatingComponent"
        [properties]="ratingProps"
        [events]="ratingEvents">
      </app-doc-api-table>
    </div>
  `
})
export class RatingDemoComponent {
  value = 3;
  value10 = 7;

  basicHtml = `<ox-rating [(ngModel)]="value"></ox-rating>`;
  maxHtml = `<ox-rating [max]="10" [(ngModel)]="value10"></ox-rating>`;

  ratingTs = `import { Component } from '@angular/core';
import { RatingComponent } from 'oxygen-ui';

@Component({
  selector: 'app-my-rating',
  standalone: true,
  imports: [RatingComponent],
  templateUrl: './my-rating.component.html'
})
export class MyRatingComponent {
  value = 3;
}`;

  ratingProps: ApiProperty[] = [
    {
      name: 'max',
      type: 'number',
      default: '5',
      description: 'Número total de estrellas o unidades de puntuación.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Modo solo lectura sin interacción.'
    },
    {
      name: 'cancel',
      type: 'boolean',
      default: 'true',
      description: 'Muestra botón de reinicio para limpiar la puntuación.'
    }
  ];

  ratingEvents: ApiEvent[] = [
    {
      name: 'onRate',
      parameters: '{ value: number }',
      description: 'Emitido cuando el usuario selecciona una nueva calificación.'
    }
  ];
}
