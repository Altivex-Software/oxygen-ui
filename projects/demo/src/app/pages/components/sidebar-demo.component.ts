import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent, ButtonComponent } from 'oxygen-ui';

@Component({
  selector: 'app-sidebar-demo',
  standalone: true,
  imports: [CommonModule, SidebarComponent, ButtonComponent],
  template: `
    <div class="ox-page-container">
      <h1>Sidebar</h1>
      <p class="ox-description">Un panel superpuesto que aparece desde los bordes de la pantalla.</p>

      <section class="ox-section">
        <h2>Posiciones</h2>
        <div class="ox-flex ox-gap-2">
          <ox-button label="Izquierda" (onClick)="left = true"></ox-button>
          <ox-button label="Derecha" severity="secondary" (onClick)="right = true"></ox-button>
          <ox-button label="Arriba" severity="info" (onClick)="top = true"></ox-button>
          <ox-button label="Abajo" severity="warn" (onClick)="bottom = true"></ox-button>
        </div>

        <ox-sidebar [(visible)]="left" position="left" header="Menú Principal">
          <ul class="sidebar-list">
            <li>Inicio</li>
            <li>Productos</li>
            <li>Contacto</li>
          </ul>
        </ox-sidebar>

        <ox-sidebar [(visible)]="right" position="right" header="Notificaciones">
          <p>No tienes notificaciones pendientes.</p>
        </ox-sidebar>

        <ox-sidebar [(visible)]="top" position="top" header="Banner Superior">
          <p class="ox-p-4">Contenido que aparece desde arriba.</p>
        </ox-sidebar>

        <ox-sidebar [(visible)]="bottom" position="bottom" header="Panel Inferior">
          <p class="ox-p-4">Contenido que aparece desde abajo.</p>
        </ox-sidebar>
      </section>
    </div>
  `
})
export class SidebarDemoComponent {
  left = false;
  right = false;
  top = false;
  bottom = false;
}