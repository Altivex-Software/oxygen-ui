import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from 'oxygen-ui';

@Component({
  selector: 'app-rating-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, RatingComponent],
  template: `
    <div class="ox-page-container">
      <h1>Rating</h1>
      <p class="ox-description">Sistema de puntuación por estrellas.</p>

      <section class="ox-section">
        <h2>Básico</h2>
        <ox-rating [(ngModel)]="value"></ox-rating>
        <p class="ox-mt-4">Puntuación: {{ value }} / 5</p>
      </section>

      <section class="ox-section">
        <h2>Personalizado (10 estrellas)</h2>
        <ox-rating [max]="10" [(ngModel)]="value10"></ox-rating>
      </section>

      <section class="ox-section">
        <h2>Deshabilitado</h2>
        <ox-rating [disabled]="true" [ngModel]="3"></ox-rating>
      </section>
    </div>
  `
})
export class RatingDemoComponent {
  value = 3;
  value10 = 7;
}
