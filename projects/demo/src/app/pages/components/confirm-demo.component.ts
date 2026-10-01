import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, OxConfirmService, ToastService } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-confirm-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>ConfirmDialog & ConfirmService</h1>
      <p class="ox-description">
        Servicio global programático para lanzar modales de confirmación asíncronos desde TypeScript sin declarar modales repetitivos en cada template HTML.
      </p>

      <!-- 1. USO BÁSICO -->
      <section class="ox-section">
        <h2>Uso del Servicio Global de Confirmación</h2>
        <div class="ox-card ox-p-4" style="margin-bottom: 1.5rem;">
          <p class="ox-mb-4" style="color: #64748b; font-size: 0.875rem;">
            Presiona los botones para disparar confirmaciones reactivas gestionadas por el servicio singleton <code>OxConfirmService</code>.
          </p>
          
          <div class="ox-flex ox-gap-4">
            <ox-button label="Borrar Registro" severity="danger" (onClick)="confirmDelete()"></ox-button>
            <ox-button label="Guardar Cambios" severity="success" (onClick)="confirmSave()"></ox-button>
          </div>
        </div>

        <app-doc-code 
          title="ConfirmService"
          [htmlCode]="confirmHtml"
          [tsCode]="confirmTs">
        </app-doc-code>
      </section>

      <!-- API REFERENCE -->
      <section class="ox-section">
        <h2>API Reference &mdash; OxConfirmService</h2>
        <app-doc-api-table [properties]="confirmProperties"></app-doc-api-table>
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

  confirmHtml = `<ox-button label="Borrar Registro" severity="danger" (onClick)="confirmDelete()"></ox-button>
<ox-button label="Guardar Cambios" severity="success" (onClick)="confirmSave()"></ox-button>`;

  confirmTs = `import { Component, inject } from '@angular/core';
import { OxConfirmService, ToastService } from 'oxygen-ui';

@Component({
  standalone: true,
  templateUrl: './my-component.html'
})
export class MyComponent {
  private confirmService = inject(OxConfirmService);
  private toastService = inject(ToastService);

  confirmDelete() {
    this.confirmService.ask({
      header: 'Confirmar Eliminación',
      message: '¿Está seguro de eliminar este registro permanente?',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.toastService.add({ severity: 'success', summary: 'Eliminado', detail: 'Registro eliminado' });
      },
      reject: () => {
        this.toastService.add({ severity: 'info', summary: 'Cancelado', detail: 'Operación cancelada' });
      }
    });
  }
}`;

  confirmProperties: ApiProperty[] = [
    { name: 'header', type: 'string', default: "''", description: 'Título principal que aparece en el modal de confirmación.' },
    { name: 'message', type: 'string', default: "''", description: 'Texto descriptivo o advertencia para el usuario.' },
    { name: 'icon', type: 'string', default: "''", description: 'Icono o emoji que acompaña el mensaje.' },
    { name: 'acceptLabel', type: 'string', default: "'Aceptar'", description: 'Texto del botón afirmativo de acción.' },
    { name: 'rejectLabel', type: 'string', default: "'Cancelar'", description: 'Texto del botón de cancelación.' },
    { name: 'accept', type: '() => void', default: 'undefined', description: 'Callback ejecutado cuando el usuario confirma.' },
    { name: 'reject', type: '() => void', default: 'undefined', description: 'Callback ejecutado cuando el usuario rechaza.' }
  ];
}
