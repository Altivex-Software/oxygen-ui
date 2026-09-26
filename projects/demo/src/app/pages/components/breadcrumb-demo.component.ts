import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from 'oxygen-ui';

@Component({
  selector: 'app-breadcrumb-demo',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  template: `
    <div class="ox-page-container">
      <h1>Breadcrumb</h1>
      <p class="ox-description">Componente de navegación que muestra la jerarquía de la página actual.</p>

      <section class="ox-section">
        <h2>Básico</h2>
        <div class="ox-card ox-p-4">
          <ox-breadcrumb [items]="items"></ox-breadcrumb>
        </div>
      </section>

      <section class="ox-section">
        <h2>Separador Personalizado</h2>
        <div class="ox-card ox-p-4">
          <ox-breadcrumb [items]="items" separator=">"></ox-breadcrumb>
        </div>
      </section>
    </div>
  `
})
export class BreadcrumbDemoComponent {
  items = [
    { label: 'Inicio', url: '/' },
    { label: 'Componentes' },
    { label: 'Navegación' },
    { label: 'Breadcrumb', current: true }
  ];
}