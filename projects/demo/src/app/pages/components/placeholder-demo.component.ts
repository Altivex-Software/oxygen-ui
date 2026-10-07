import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'oxygen-ui';

@Component({
  selector: 'app-placeholder-demo',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="ox-page-container">
      <h1>{{ title }}</h1>
      <p class="ox-description">
        Esta es una página de demostración para el componente <strong>{{ title }}</strong>.
      </p>
      <div class="coming-soon">
        <div class="icon" style="margin-bottom: 1rem;">
          <ox-icon name="alert-triangle" size="3xl" color="warning"></ox-icon>
        </div>
        <p>Estamos trabajando activamente en esta documentación. ¡Pronto verás ejemplos interactivos aquí!</p>
      </div>
    </div>
  `
})
export class PlaceholderDemoComponent {
  title = 'Componente';
}