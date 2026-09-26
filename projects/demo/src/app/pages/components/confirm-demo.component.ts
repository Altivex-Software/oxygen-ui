import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, OxConfirmService, ToastService } from 'oxygen-ui';

@Component({
  selector: 'app-confirm-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="ox-page-container">
      <h1>ConfirmDialog & ConfirmService</h1>
      <p class="ox-description">Lanza modales de confirmación programáticamente desde el código TypeScript sin ensuciar tu HTML.</p>

      <section class="ox-section">
        <h2>Uso Básico</h2>
        <div class="ox-card ox-p-4">
          <p class="ox-mb-4">Prueba los botones abajo para disparar confirmaciones globales. Solo hay un <code>&lt;ox-confirm-dialog&gt;</code> en toda la aplicación (en app.component.html).</p>
          
          <div class="ox-flex ox-gap-4">
            <ox-button label="Borrar Registro" severity="danger" (onClick)="confirmDelete()"></ox-button>
            <ox-button label="Guardar Cambios" severity="success" (onClick)="confirmSave()"></ox-button>
          </div>
        </div>
      </section>
    </div>
  `
})
export class ConfirmDemoComponent {
  constructor(
    private confirmService: OxConfirmService,
    private toastService: ToastService
  ) {}

  confirmDelete() {
    this.confirmService.ask({
      header: 'Confirmar Eliminación',
      message: '¿Está seguro que desea eliminar este registro? Esta acción no se puede deshacer.',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.toastService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'El registro ha sido eliminado con éxito.'
        });
      },
      reject: () => {
        this.toastService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'No se eliminó ningún registro.'
        });
      }
    });
  }

  confirmSave() {
    this.confirmService.ask({
      header: 'Guardar Cambios',
      message: 'Hay campos que no han sido validados. ¿Desea forzar el guardado de todas formas?',
      acceptLabel: 'Forzar Guardado',
      rejectLabel: 'Volver a revisar',
      accept: () => {
        this.toastService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Se guardaron los cambios forzosamente.'
        });
      }
    });
  }
}
