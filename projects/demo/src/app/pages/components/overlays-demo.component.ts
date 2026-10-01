import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { 
  PopoverComponent, 
  ContextMenuComponent, 
  ConfirmPopupComponent, 
  ButtonComponent, 
  ContextMenuItem,
  BadgeComponent,
  OxygenTemplateDirective,
  TableComponent
} from "oxygen-ui";
import { DocCodeComponent } from "../../shared/doc-code/doc-code.component";
import { DocApiTableComponent, ApiProperty, ApiEvent } from "../../shared/doc-code/doc-api-table.component";

@Component({
  selector: "app-overlays-demo",
  standalone: true,
  imports: [
    CommonModule, 
    PopoverComponent, 
    ContextMenuComponent, 
    ConfirmPopupComponent, 
    ButtonComponent, 
    BadgeComponent,
    OxygenTemplateDirective,
    TableComponent,
    DocCodeComponent,
    DocApiTableComponent
  ],
  template: `
    <div class="ox-page-container">
      <h1>Overlays & Context Menus</h1>
      <p class="ox-description">
        Superposiciones contextuales de alto nivel: <code>ox-popover</code>, <code>ox-confirm-popup</code> y <code>ox-context-menu</code> basados en Angular CDK Overlay.
      </p>

      <!-- 1. POPOVER -->
      <section class="ox-section">
        <h2>1. Popover (OverlayPanel)</h2>
        <p>Contenedor flotante interactivo anclado a un botón o elemento objetivo con directiva <code>oxTarget</code>.</p>

        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-bottom: 1.5rem;">
          <ox-popover #userPopover>
            <ox-button oxTarget variant="primary">👤 Ver Perfil de Usuario</ox-button>

            <div style="display: flex; flex-direction: column; gap: 0.75rem; width: 220px; padding: 0.5rem;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: #2563eb; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                  JD
                </div>
                <div>
                  <h4 style="margin: 0; font-size: 0.9375rem;">Jane Doe</h4>
                  <span style="font-size: 0.75rem; color: #64748b;">jane.doe&#64;example.com</span>
                </div>
              </div>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 0;" />
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.8125rem; color: #475569;">Rol:</span>
                <ox-badge value="Administrador" severity="primary" size="sm"></ox-badge>
              </div>
              <ox-button size="sm" variant="outline-primary" (click)="userPopover.close()">Cerrar Perfil</ox-button>
            </div>
          </ox-popover>
        </div>

        <app-doc-code 
          title="Popover"
          [htmlCode]="popoverHtml"
          [tsCode]="popoverTs">
        </app-doc-code>
      </section>

      <!-- 2. CONFIRM POPUP -->
      <section class="ox-section">
        <h2>2. ConfirmPopup</h2>
        <p>Confirmación compacta en línea posicionada directamente junto al botón de acción destructiva.</p>

        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-bottom: 1.5rem;">
          <ox-confirm-popup 
            message="¿Estás seguro de que deseas eliminar este registro?"
            acceptLabel="Eliminar"
            rejectLabel="Cancelar"
            acceptVariant="danger"
            (onAccept)="onDeleteConfirmed()"
            (onReject)="onDeleteCancelled()">
            <ox-button oxTarget variant="danger">🗑️ Eliminar Elemento</ox-button>
          </ox-confirm-popup>

          @if (lastActionMessage) {
            <span style="font-size: 0.875rem; color: #475569; font-weight: 500; background: #f8fafc; padding: 6px 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
              Estado: {{ lastActionMessage }}
            </span>
          }
        </div>

        <app-doc-code 
          title="ConfirmPopup"
          [htmlCode]="confirmPopupHtml"
          [tsCode]="confirmPopupTs">
        </app-doc-code>
      </section>

      <!-- 3. CONTEXT MENU -->
      <section class="ox-section">
        <h2>3. ContextMenu (Clic Derecho)</h2>
        <p>Menú contextual que reacciona al clic derecho sobre filas de una tabla o cualquier elemento.</p>

        <ox-context-menu #contextMenu [model]="menuItems"></ox-context-menu>

        <ox-table [value]="users" class="ox-mb-4">
          <ng-template oxTemplate="header">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acción de Clic Derecho</th>
            </tr>
          </ng-template>

          <ng-template oxTemplate="body" let-user>
            <tr (contextmenu)="contextMenu.show($event, user)" style="cursor: context-menu;">
              <td class="ox-fw-bold">{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <ox-badge [value]="user.role" [severity]="user.role === 'Admin' ? 'danger' : 'info'" size="sm"></ox-badge>
              </td>
              <td style="color: #94a3b8; font-size: 0.8125rem;">Haz clic derecho aquí 🖱️</td>
            </tr>
          </ng-template>
        </ox-table>

        <app-doc-code 
          title="ContextMenu"
          [htmlCode]="contextMenuHtml"
          [tsCode]="contextMenuTs">
        </app-doc-code>
      </section>

      <!-- API REFERENCE -->
      <section class="ox-section">
        <h2>API Reference &mdash; Overlays</h2>
        <h3>&lt;ox-confirm-popup&gt;</h3>
        <app-doc-api-table [properties]="confirmPopupProperties" [events]="confirmPopupEvents"></app-doc-api-table>
        
        <h3 class="ox-mt-4">&lt;ox-context-menu&gt;</h3>
        <app-doc-api-table [properties]="contextMenuProperties"></app-doc-api-table>
      </section>
    </div>
  `
})
export class OverlaysDemoComponent {
  lastActionMessage = "";

  users = [
    { id: 1, name: "Alex Morgan", email: "alex@example.com", role: "Admin" },
    { id: 2, name: "Sarah Connor", email: "sarah@example.com", role: "User" },
    { id: 3, name: "John Wick", email: "john@example.com", role: "Admin" }
  ];

  menuItems: ContextMenuItem[] = [
    { label: "Ver Perfil", icon: "👤", command: (e) => this.action("Viendo perfil de " + e.data?.name) },
    { label: "Editar Registro", icon: "✏️", command: (e) => this.action("Editando a " + e.data?.name) },
    { separator: true },
    { label: "Eliminar Usuario", icon: "🗑️", danger: true, command: (e) => this.action("Eliminado " + e.data?.name) }
  ];

  onDeleteConfirmed() {
    this.lastActionMessage = "¡Elemento eliminado con éxito! ✅";
  }

  onDeleteCancelled() {
    this.lastActionMessage = "Eliminación cancelada ❌";
  }

  action(msg: string) {
    this.lastActionMessage = msg;
  }

  popoverHtml = `<ox-popover #userPopover>
  <ox-button oxTarget variant="primary">Ver Perfil</ox-button>

  <div class="user-card">
    <h4>Jane Doe</h4>
    <p>jane.doe@example.com</p>
    <ox-button size="sm" (click)="userPopover.close()">Cerrar</ox-button>
  </div>
</ox-popover>`;

  popoverTs = `import { Component } from '@angular/core';
import { PopoverComponent, ButtonComponent } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [PopoverComponent, ButtonComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {}`;

  confirmPopupHtml = `<ox-confirm-popup 
  message="¿Estás seguro de eliminar este registro?"
  acceptLabel="Eliminar"
  rejectLabel="Cancelar"
  acceptVariant="danger"
  (onAccept)="onDeleteConfirmed()"
  (onReject)="onDeleteCancelled()">
  <ox-button oxTarget variant="danger">Eliminar</ox-button>
</ox-confirm-popup>`;

  confirmPopupTs = `import { Component } from '@angular/core';
import { ConfirmPopupComponent, ButtonComponent } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [ConfirmPopupComponent, ButtonComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {
  onDeleteConfirmed() {
    console.log('Confirmado');
  }
  onDeleteCancelled() {
    console.log('Cancelado');
  }
}`;

  contextMenuHtml = `<ox-context-menu #contextMenu [model]="menuItems"></ox-context-menu>

<tr (contextmenu)="contextMenu.show($event, user)">
  <td>{{ user.name }}</td>
</tr>`;

  contextMenuTs = `import { Component } from '@angular/core';
import { ContextMenuComponent, ContextMenuItem } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [ContextMenuComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {
  menuItems: ContextMenuItem[] = [
    { label: 'Ver Perfil', icon: '👤', command: (e) => console.log(e.data) },
    { separator: true },
    { label: 'Eliminar', icon: '🗑️', danger: true, command: (e) => console.log('Eliminar', e.data) }
  ];
}`;

  confirmPopupProperties: ApiProperty[] = [
    { name: 'message', type: 'string', default: "''", description: 'Texto del mensaje de confirmación.' },
    { name: 'acceptLabel', type: 'string', default: "'Aceptar'", description: 'Texto del botón afirmativo.' },
    { name: 'rejectLabel', type: 'string', default: "'Cancelar'", description: 'Texto del botón negativo.' },
    { name: 'acceptVariant', type: 'string', default: "'primary'", description: 'Variante visual del botón afirmativo.' }
  ];

  confirmPopupEvents: ApiEvent[] = [
    { name: 'onAccept', parameters: 'void', description: 'Se dispara cuando el usuario presiona el botón afirmativo.' },
    { name: 'onReject', parameters: 'void', description: 'Se dispara cuando el usuario cancela o cierra la superposición.' }
  ];

  contextMenuProperties: ApiProperty[] = [
    { name: 'model', type: 'ContextMenuItem[]', default: '[]', description: 'Estructura de árbol de opciones con labels, icons y commands.' }
  ];
}
