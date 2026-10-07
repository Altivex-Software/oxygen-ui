import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  DialogComponent, 
  ButtonComponent, 
  DynamicDialogService, 
  DynamicDialogConfig, 
  DynamicDialogRef,
  InputComponent,
  ToastService,
  ToastComponent,
  IconComponent
} from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

/**
 * Custom Component opened dynamically by DynamicDialogService
 */
@Component({
  selector: 'app-user-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, InputComponent],
  template: `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Este componente fue montado 100% dinámicamente desde TypeScript pasando datos mediante inyección de dependencias.
      </p>

      <div>
        <label style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.35rem; color: #1e293b;">
          Nombre Completo
        </label>
        <ox-input [(ngModel)]="name" placeholder="Ej: Sebastian Gomez"></ox-input>
      </div>

      <div>
        <label style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.35rem; color: #1e293b;">
          Cargo / Rol
        </label>
        <ox-input [(ngModel)]="role" placeholder="Ej: Lead Software Architect"></ox-input>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1rem; border-top: 1px solid #f1f5f9; padding-top: 1rem;">
        <ox-button label="Cancelar" severity="secondary" (onClick)="cancel()"></ox-button>
        <ox-button label="Guardar y Retornar" severity="primary" (onClick)="save()"></ox-button>
      </div>
    </div>
  `
})
export class UserFormModalComponent {
  config = inject(DynamicDialogConfig);
  dialogRef = inject(DynamicDialogRef);

  name = this.config.data?.name || '';
  role = this.config.data?.role || '';

  save(): void {
    this.dialogRef.close({
      saved: true,
      name: this.name,
      role: this.role
    });
  }

  cancel(): void {
    this.dialogRef.close({ saved: false });
  }
}

@Component({
  selector: 'app-dialog-demo',
  standalone: true,
  imports: [CommonModule, DialogComponent, ButtonComponent, ToastComponent, IconComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <ox-toast></ox-toast>

      <h1>Dialog & DynamicDialog</h1>
      <p class="ox-description">
        Ventanas modales altamente configurables, disponibles tanto de forma declarativa (&lt;ox-dialog&gt;) como programática mediante DynamicDialogService.
      </p>

      <!-- 1. MODAL DECLARATIVO -->
      <section class="ox-section">
        <h2>1. Modal Declarativo en Template</h2>
        <p>Controlado mediante enlace bidireccional <code>[(visible)]="visible"</code> con soporte de backdrop, animaciones y footer.</p>

        <div style="margin-bottom: 1.5rem;">
          <ox-button label="Abrir Modal Declarativo" (onClick)="visible = true"></ox-button>
        </div>

        <ox-dialog 
          header="Título del Diálogo Declarativo" 
          [(visible)]="visible"
          [width]="'500px'"
          [hasFooter]="true">
          <p>Este es el contenido interno del diálogo declarativo con soporte para cualquier elemento HTML o componentes anidados.</p>
          
          <ng-template oxFooter>
            <div class="ox-flex ox-justify-content-end ox-gap-2">
              <ox-button label="Cancelar" severity="secondary" (onClick)="visible = false"></ox-button>
              <ox-button label="Confirmar" (onClick)="visible = false"></ox-button>
            </div>
          </ng-template>
        </ox-dialog>

        <app-doc-code 
          title="Modal Declarativo"
          [htmlCode]="declarativeHtml"
          [tsCode]="declarativeTs">
        </app-doc-code>
      </section>

      <!-- 2. DYNAMIC DIALOG SERVICE -->
      <section class="ox-section">
        <h2>2. DynamicDialogService (Invocación Programática)</h2>
        <p>Abre cualquier componente bajo demanda, inyecta configuración/datos tipados y recibe el valor retornado al cerrar mediante Observable.</p>

        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-bottom: 1.5rem;">
          <ox-button 
            label="Abrir Modal Dinámico con Datos" 
            icon="zap"
            (onClick)="openDynamicDialog()">
          </ox-button>

          @if (returnedUser) {
            <div style="font-size: 0.875rem; color: #059669; font-weight: 500; background: #ecfdf5; padding: 6px 12px; border-radius: 6px; border: 1px solid #a7f3d0; display: inline-flex; align-items: center; gap: 6px;">
              <ox-icon name="check-circle" size="sm" color="success"></ox-icon>
              Resultado recibido: {{ returnedUser | json }}
            </div>
          }
        </div>

        <app-doc-code 
          title="DynamicDialogService"
          [htmlCode]="dynamicHtml"
          [tsCode]="dynamicTs">
        </app-doc-code>
      </section>

      <!-- API REFERENCE -->
      <section class="ox-section">
        <h2>API Reference &mdash; &lt;ox-dialog&gt;</h2>
        <app-doc-api-table [properties]="dialogProperties" [events]="dialogEvents"></app-doc-api-table>
      </section>
    </div>
  `
})
export class DialogDemoComponent {
  private dialogService = inject(DynamicDialogService);
  private toastService = inject(ToastService);

  visible = false;
  returnedUser: any = null;

  openDynamicDialog(): void {
    const ref = this.dialogService.open(UserFormModalComponent, {
      header: 'Editar Información del Usuario',
      width: '520px',
      maximizable: true,
      data: {
        name: 'Sebastian Gómez',
        role: 'Full Stack Engineer'
      }
    });

    ref.onClose.subscribe((result) => {
      if (result && result.saved) {
        this.returnedUser = result;
        this.toastService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: `Usuario actualizado: ${result.name}`
        });
      } else {
        this.toastService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'No se guardaron cambios'
        });
      }
    });
  }

  declarativeHtml = `<ox-button label="Abrir Modal" (onClick)="visible = true"></ox-button>

<ox-dialog 
  header="Título del Diálogo" 
  [(visible)]="visible"
  [width]="'500px'"
  [hasFooter]="true">
  <p>Contenido del diálogo declarativo.</p>
  
  <ng-template oxFooter>
    <div class="ox-flex ox-justify-content-end ox-gap-2">
      <ox-button label="Cancelar" severity="secondary" (onClick)="visible = false"></ox-button>
      <ox-button label="Confirmar" (onClick)="visible = false"></ox-button>
    </div>
  </ng-template>
</ox-dialog>`;

  declarativeTs = `import { Component } from '@angular/core';
import { DialogComponent, ButtonComponent } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [DialogComponent, ButtonComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {
  visible = false;
}`;

  dynamicHtml = `<ox-button label="Abrir Modal Dinámico" (onClick)="openDynamicDialog()"></ox-button>`;

  dynamicTs = `import { Component, inject } from '@angular/core';
import { DynamicDialogService } from 'oxygen-ui';
import { UserFormModalComponent } from './user-form-modal.component';

@Component({
  standalone: true,
  templateUrl: './my-component.html'
})
export class MyComponent {
  private dialogService = inject(DynamicDialogService);

  openDynamicDialog(): void {
    const ref = this.dialogService.open(UserFormModalComponent, {
      header: 'Editar Usuario',
      width: '500px',
      data: { name: 'Sebastian' }
    });

    ref.onClose.subscribe(result => {
      console.log('Resultado del modal:', result);
    });
  }
}`;

  dialogProperties: ApiProperty[] = [
    { name: 'visible', type: 'boolean', default: 'false', description: 'Visibilidad del diálogo (soporta two-way binding [(visible)]).' },
    { name: 'header', type: 'string', default: "''", description: 'Texto del encabezado del modal.' },
    { name: 'width', type: 'string', default: "'500px'", description: 'Ancho personalizado del modal (ej: 500px, 80vw).' },
    { name: 'hasFooter', type: 'boolean', default: 'false', description: 'Indica si se proyecta el footer personalizado.' },
    { name: 'closable', type: 'boolean', default: 'true', description: 'Muestra u oculta el botón de cierre (X).' },
    { name: 'dismissableMask', type: 'boolean', default: 'true', description: 'Cierra el diálogo al hacer clic en el backdrop oscurecido.' }
  ];

  dialogEvents: ApiEvent[] = [
    { name: 'visibleChange', parameters: 'boolean', description: 'Se emite cuando el diálogo cambia su visibilidad (abrir/cerrar).' },
    { name: 'onShow', parameters: 'void', description: 'Se emite al completarse la apertura del diálogo.' },
    { name: 'onHide', parameters: 'void', description: 'Se emite cuando el diálogo se cierra.' }
  ];
}