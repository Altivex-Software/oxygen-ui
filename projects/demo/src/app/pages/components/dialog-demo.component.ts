import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent, ButtonComponent } from 'oxygen-ui';

@Component({
  selector: 'app-dialog-demo',
  standalone: true,
  imports: [CommonModule, DialogComponent, ButtonComponent],
  template: `
    <div class="ox-page-container">
      <h1>Dialog</h1>
      <p class="ox-description">Ventanas modales para interacción o visualización de contenido importante.</p>

      <section class="ox-section">
        <h2>Básico</h2>
        <ox-button label="Abrir Modal" (onClick)="visible = true"></ox-button>

        <ox-dialog 
          header="Título del Diálogo" 
          [(visible)]="visible"
          [width]="'500px'"
          [hasFooter]="true">
          <p>Este es el contenido interno del diálogo. Puedes poner cualquier componente aquí.</p>
          
          <ng-template oxFooter>
            <div class="ox-flex ox-justify-content-end ox-gap-2">
              <ox-button label="Cancelar" severity="secondary" (onClick)="visible = false"></ox-button>
              <ox-button label="Confirmar" (onClick)="visible = false"></ox-button>
            </div>
          </ng-template>
        </ox-dialog>
      </section>
    </div>
  `
})
export class DialogDemoComponent {
  visible = false;
}